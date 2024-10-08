import { useCallback, useState, useMemo, useRef } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "@/features/editor/hooks/useAutoResize";
import { useClipboard } from "@/features/editor/hooks/useClipboard";
import {
  BuildEditorProps,
  Editor,
  EditorHookProps,
} from "@/features/editor/types";

import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  FONT_ALIGNMENT,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_STYLE,
  FONT_WEIGHT,
  INVERTED_TRIANGLE_OPTIONS,
  JSON_KEYS_HISTORY,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/features/editor/constants";
import { useCanvasEvents } from "@/features/editor/hooks/useCanvasEvents";
import {
  createFilter,
  downloadFile,
  downloadFileSvg,
  isTextType,
  transformTextElementsOnSave,
} from "@/features/editor/utils";
import { useHistory } from "@/features/editor/hooks/useHistory";
import { useHotKeys } from "@/features/editor/hooks/useHotkeys";
import { useWindowEvents } from "@/features/editor/hooks/useWindowEvents";
import { uuid } from "uuidv4";
import { useLoadState } from "@/features/editor/hooks/useLoadState";

interface InitProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

const buildEditor = ({
  save,
  undo,
  redo,
  canUndo,
  canRedo,
  autoZoom,
  copy,
  paste,
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  setStrokeWidth,
  strokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
}: BuildEditorProps): Editor => {
  const generateSaveOptions = () => {
    const workspace = getWorkspace() as fabric.Rect;
    return {
      width: workspace.width ?? canvas.getWidth(),
      height: workspace.height ?? canvas.getHeight(),
      left: workspace.left ?? 0,
      top: workspace.top ?? 0,
    };
  };

  const saveAsPng = () => {
    const options = generateSaveOptions();

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);

    downloadFile(dataUrl, "png");
    autoZoom();
  };

  const saveAsJpg = () => {
    const options = generateSaveOptions();

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);

    downloadFile(dataUrl, "jpg");
    autoZoom();
  };

  const saveAsSvg = () => {
    const options = generateSaveOptions();

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    // Optionally, clip to workspace if needed (Fabric.js doesn't have clipTo by default)
    const svgData = canvas.toSVG({
      viewBox: {
        x: options.left,
        y: options.top,
        width: options.width,
        height: options.height,
      },
      width: options.width,
      height: options.height,
    });

    downloadFileSvg(svgData, `${uuid()}.svg`);

    autoZoom();
  };

  const saveAsJson = async () => {
    const dataUrl = canvas.toJSON(JSON_KEYS_HISTORY);
    await transformTextElementsOnSave(dataUrl.objects);
    const fileStringOptions = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, "\t")
    )}`;
    downloadFile(fileStringOptions, "json");
  };

  const loadAsJson = (json: string) => {
    const data = JSON.parse(json);
    canvas.loadFromJSON(data, () => {
      autoZoom();
      //canvas.renderAll();
    });
  };
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    if (!workspace) return;
    const center = workspace?.getCenterPoint();
    if (!center) return;
    // @ts-ignore
    canvas?._centerObject(object, center);
  };

  const addToWorkspace = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    saveAsPng,
    saveAsJpg,
    saveAsSvg,
    saveAsJson,
    loadAsJson,
    onUndo: () => undo(),
    onRedo: () => redo(),
    canUndo: () => canUndo(),
    canRedo: () => canRedo(),
    onCopy: () => copy(),
    onPaste: () => paste(),
    getWorkSpace: () => getWorkspace(),
    autoZoom: () => autoZoom(),
    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += 0.05;
      const center = canvas.getCenter();
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio > 0.8 ? 0.8 : zoomRatio
      );
    },
    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= 0.05;
      const center = canvas.getCenter();
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio < 0.2 ? 0.2 : zoomRatio
      );
    },
    changeSize: (size: { width: number; height: number }) => {
      const workspace = getWorkspace();
      workspace?.set(size);
      //canvas.renderAll();
      autoZoom();
      save();
    },
    changeBackground: (value: string) => {
      const workspace = getWorkspace();
      workspace?.set({ fill: value });
      canvas.renderAll();
      save();
    },
    enableDrawMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.isDrawingMode = true;
    },
    disableDrawMode: () => {
      canvas.isDrawingMode = false;
    },
    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          const imageObject = object as fabric.Image;

          const effect = createFilter(value);
          imageObject.filters = effect ? [effect] : [];

          imageObject.applyFilters();
          canvas.renderAll();
        }
      });
    },
    addImage: (value: string) => {
      fabric.Image.fromURL(
        value,
        (image) => {
          const workspace = getWorkspace();
          image.scaleToWidth(500);
          image.scaleToHeight(500);

          addToWorkspace(image);
        },
        {
          crossOrigin: "anonymous",
        }
      );
      canvas.renderAll();
    },
    deleteElement: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.remove(object);
        canvas.discardActiveObject();
        canvas.renderAll();
      });
    },
    addText: (text, options) => {
      const object = new fabric.Textbox(text, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToWorkspace(object);
    },
    changeFontLineThrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // using _set() instead of set to avoid TS errors
          object._set("linethrough", value);
        }
      });
      canvas.renderAll();
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // using _set() instead of set to avoid TS errors
          object._set("underline", value);
        }
      });
      canvas.renderAll();
    },
    changeTextAlignment: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // using _set() instead of set to avoid TS errors
          object._set("textAlign", value);
        }
      });
      canvas.renderAll();
    },
    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // using _set() instead of set to avoid TS errors
          object._set("fontStyle", value);
        }
      });
      canvas.renderAll();
    },
    changeFontSize(value: number) {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object._set("fontSize", value);
        }
      });

      canvas.renderAll();
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // using _set() instead of set to avoid TS errors
          object._set("fontFamily", value);
        }
      });
      canvas.renderAll();
    },
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // using _set() instead of set to avoid TS errors
          object._set("fontWeight", value);
        }
      });
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        object.bringForward();
      });
      canvas.renderAll();
      // this to fix overflow of workspace
      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        object.sendBackwards();
      });

      canvas.renderAll();
      // this to fix overflow of workspace
      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.freeDrawingBrush.width = value;

      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.freeDrawingBrush.strokeDashArray = value;
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // REMINDER: TEXT types do not have stroke
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }
        object.set({ stroke: value });
      });

      canvas.freeDrawingBrush.color = value;
      canvas.renderAll();
    },

    addCircle: () => {
      const canvasObject = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToWorkspace(canvasObject);
    },
    addSoftRectangle() {
      const canvasObject = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 25,
        ry: 25,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToWorkspace(canvasObject);
    },
    addRectangle() {
      const canvasObject = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToWorkspace(canvasObject);
    },
    addTriangle() {
      const canvasObject = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToWorkspace(canvasObject);
    },
    addInvertedTriangle() {
      const WIDTH = INVERTED_TRIANGLE_OPTIONS.width;
      const HEIGHT = INVERTED_TRIANGLE_OPTIONS.height;

      const canvasObject = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...INVERTED_TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );

      addToWorkspace(canvasObject);
    },
    addDiamond() {
      const WIDTH = DIAMOND_OPTIONS.width;
      const HEIGHT = DIAMOND_OPTIONS.height;
      const canvasObject = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );

      addToWorkspace(canvasObject);
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fillColor;
      const value = selectedObject.get("fill") || fillColor;
      /**
       * We do this because currently gradients & patters are not supported
       */
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeColor;
      const value = selectedObject.get("stroke") || strokeColor;
      return value;
    },
    getActiveStrokeWidth: () => {
      // TODO: check if the value reached zero to make item visible or not
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeWidth;
      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeDashArray;
      const value = selectedObject.get("strokeDashArray") || STROKE_DASH_ARRAY;
      return value;
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 1;
      const value = selectedObject.get("opacity") || 1;
      return value;
    },
    /* getActiveImageFilters: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return [];
      // @ts-ignore
      // This is fault TS error due to library
      let value = []
      if(selectedObject.type === "image"){
        // @ts-ignore
        value = selectedObject.filters || [];
        console.log(value);
      }
      return value;
    }, */
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fontFamily;
      // @ts-ignore
      // This is fault TS error due to library
      const value = selectedObject.get("fontFamily") || fontFamily;
      return value as string;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_WEIGHT;
      // @ts-ignore
      // This is fault TS error due to library
      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;
      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_STYLE;
      // @ts-ignore
      // This is fault TS error due to library
      const value = selectedObject.get("fontStyle") || FONT_STYLE;
      return value;
    },
    getActiveLineThrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;
      // @ts-ignore
      // This is fault TS error due to library
      const value = selectedObject.get("linethrough") || false;
      return value;
    },
    getActiveUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;
      // @ts-ignore
      // This is fault TS error due to library
      const value = selectedObject.get("underline") || false;
      return value;
    },
    getActiveTextAlignment: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_ALIGNMENT;
      // @ts-ignore
      // This is fault TS error due to library
      const value = selectedObject.get("textAlign") || FONT_ALIGNMENT;
      return value;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_SIZE;
      // @ts-ignore
      // This is fault TS error due to library
      const value: number = selectedObject.get("fontSize") || FONT_SIZE;
      return value;
    },
    canvas,
    selectedObjects,
  };
};
export const useEditor = ({
  clearSelectionCallback,
  saveCallback,
  defaultState,
  defaultHeight,
  defaultWidth,
}: EditorHookProps) => {
  console.log("default width", defaultWidth);
  console.log("default height", defaultHeight);
  
  // to avoid conflicting and triggering re-rendering that will lead to lose current progress
  const initialState = useRef(defaultState);
  const initialHeight = useRef(defaultHeight);
  const initialWidth = useRef(defaultWidth);

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);
  const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILY);
  const [fontSize, setFontSize] = useState<number>(FONT_SIZE);

  const { save, canRedo, canUndo, canvasHistory, redo, undo, setHistoryIndex } =
    useHistory({ canvas, saveCallback });

  const { copy, paste } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({
    canvas,
    container,
  });

  useWindowEvents();
  useCanvasEvents({ save, canvas, setSelectedObjects, clearSelectionCallback });

  useHotKeys({
    canvas,
    copy,
    paste,
    redo,
    save,
    undo,
  });

  useLoadState({
    canvas,
    autoZoom,
    initialState,
    canvasHistory,
    setHistoryIndex,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        save,
        undo,
        redo,
        canUndo,
        canRedo,
        autoZoom,
        copy,
        paste,
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
      });
    }
    return undefined;
  }, [
    canvas,
    copy,
    paste,
    autoZoom,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    fontFamily,
    fontSize,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
  ]);

  const init = useCallback(
    ({ initialCanvas, initialContainer }: InitProps) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkSpace = new fabric.Rect({
        width: initialWidth.current,
        height: initialHeight.current,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkSpace);
      initialCanvas.centerObject(initialWorkSpace);
      initialCanvas.clipPath = initialWorkSpace;
      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const currentCanvasState = JSON.stringify(
        initialCanvas.toJSON(JSON_KEYS_HISTORY)
      );

      canvasHistory.current = [currentCanvasState];
      setHistoryIndex(0);
    },
    // No need for this as these come from useRef,useState but to avoid linting warnings
    [canvasHistory, setHistoryIndex]
  );

  return {
    init,
    editor,
  };
};

import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "@/features/editor/hooks/useAutoResize";
import {
  BuildEditorProps,
  Editor,
  EditorHookProps,
} from "@/features/editor/types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  INVERTED_TRIANGLE_OPTIONS,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/features/editor/constants";
import { useCanvasEvents } from "@/features/editor/hooks/useCanvasEvents";
import { isTextType } from "@/features/editor/utils";

interface InitProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

const buildEditor = ({
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
    addText: (text, options) => {
      const object = new fabric.Textbox(text, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToWorkspace(object);
    },
    changeFontSize(value: number) {
      setFontSize(value);
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
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
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
    canvas,
    selectedObjects,
  };
};
export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
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

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({ canvas, setSelectedObjects, clearSelectionCallback });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
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
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    fontFamily,
    fontSize,
  ]);

  const init = useCallback(({ initialCanvas, initialContainer }: InitProps) => {
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
      width: 900,
      height: 1200,
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
  }, []);

  return {
    init,
    editor,
  };
};

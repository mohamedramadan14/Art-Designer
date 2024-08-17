import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "@/features/editor/hooks/useAutoResize";
import { BuildEditorProps, Editor } from "@/features/editor/types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  INVERTED_TRIANGLE_OPTIONS,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_WIDTH,
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
      });
      addToWorkspace(canvasObject);
    },
    addRectangle() {
      const canvasObject = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToWorkspace(canvasObject);
    },
    addTriangle() {
      const canvasObject = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
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
        }
      );

      addToWorkspace(canvasObject);
    },
    fillColor,
    strokeColor,
    strokeWidth,
    canvas,
    selectedObjects,
  };
};
export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({ canvas, setSelectedObjects });

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
      });
    }
    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

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

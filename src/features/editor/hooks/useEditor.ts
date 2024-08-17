import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "@/features/editor/hooks/useAutoResize";
import { BuildEditorProps, Editor } from "@/features/editor/types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  INVERTED_TRIANGLE_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/features/editor/constants";

interface InitProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
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
    addCircle: () => {
      const canvasObject = new fabric.Circle({ ...CIRCLE_OPTIONS });
      addToWorkspace(canvasObject);
    },
    addSoftRectangle() {
      const canvasObject = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 25,
        ry: 25,
      });
      addToWorkspace(canvasObject);
    },
    addRectangle() {
      const canvasObject = new fabric.Rect({ ...RECTANGLE_OPTIONS });
      addToWorkspace(canvasObject);
    },
    addTriangle() {
      const canvasObject = new fabric.Triangle({ ...TRIANGLE_OPTIONS });
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
        }
      );

      addToWorkspace(canvasObject);
    },
  };
};
export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
      });
    }
    return undefined;
  }, [canvas]);

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

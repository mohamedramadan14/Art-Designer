import { useCallback, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "@/features/hooks/useAutoResize";

interface InitProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}
export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container,
  });

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

    const testRec = new fabric.Rect({
      fill: "red",
      width: 100,
      height: 100,
    })

    initialCanvas.add(testRec);
    initialCanvas.centerObject(testRec);

  }, []);

  return {
    init,
  };
};
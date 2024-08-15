/* import { useCallback, useState } from "react";
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
 */

//TODO: Double Check useEditor Hook logic
import { useCallback, useState, useEffect } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "@/features/hooks/useAutoResize";

interface InitProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [workspace, setWorkspace] = useState<fabric.Rect | null>(null);

  const createWorkspace = useCallback((canvas: fabric.Canvas, container: HTMLDivElement) => {
    const containerAspectRatio = container.offsetWidth / container.offsetHeight;
    let workspaceWidth, workspaceHeight;

    if (containerAspectRatio > 3/4) {
      workspaceHeight = container.offsetHeight * 0.9;
      workspaceWidth = workspaceHeight * 3/4;
    } else {
      workspaceWidth = container.offsetWidth * 0.9;
      workspaceHeight = workspaceWidth * 4/3;
    }

    const newWorkspace = new fabric.Rect({
      width: workspaceWidth,
      height: workspaceHeight,
      name: "clip",
      fill: "white",
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({
        color: "rgba(0,0,0,0.8)",
        blur: 5,
      }),
    });

    canvas.add(newWorkspace);
    canvas.centerObject(newWorkspace);
    canvas.clipPath = newWorkspace;
    
    return newWorkspace;
  }, []);

  const addTestRectangle = useCallback((canvas: fabric.Canvas, workspace: fabric.Rect) => {
    const testRec = new fabric.Rect({
      fill: "red",
      width: workspace.width! * 0.1,
      height: workspace.height! * 0.1,
    });

    canvas.add(testRec);
    canvas.centerObject(testRec);
  }, []);

  useEffect(() => {
    if (canvas && container) {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const newWorkspace = createWorkspace(canvas, container);
      setWorkspace(newWorkspace);

      addTestRectangle(canvas, newWorkspace);

      canvas.requestRenderAll();
    }
  }, [canvas, container, createWorkspace, addTestRectangle]);

  useAutoResize({
    canvas,
    container,
  });

  const init = useCallback(({ initialCanvas, initialContainer }: InitProps) => {
    setCanvas(initialCanvas);
    setContainer(initialContainer);
  }, []);

  return {
    init,
    canvas,
    container,
    workspace,
  };
};
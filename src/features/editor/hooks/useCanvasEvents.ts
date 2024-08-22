import { fabric } from "fabric";
import { useEffect } from "react";
interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;
    canvas.on("object:added", () => save());
    canvas.on("object:modified", () => save());
    canvas.on("object:removed", () => save());

    canvas.on("selection:created", ({ selected }) => {
      console.log("selection:created");
      setSelectedObjects(selected || []);
    });
    canvas.on("selection:updated", ({ selected }) => {
      console.log("selection:updated");
      setSelectedObjects(selected || []);
    });

    canvas.on("selection:cleared", () => {
      console.log("selection:cleared");
      setSelectedObjects([]);
      clearSelectionCallback?.();
    });

    return () => {
      if (canvas) {
        canvas.off("object:added");
        canvas.off("object:modified");
        canvas.off("object:removed");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
    /**
     * adding setSelectedObjects to dep array to resolve linting issue
     */
  }, [canvas, setSelectedObjects, clearSelectionCallback, save]);
};

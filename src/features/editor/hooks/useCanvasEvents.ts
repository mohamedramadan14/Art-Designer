import { fabric } from "fabric";
import { useEffect } from "react";
interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;
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
    });

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
    /**
     * adding setSelectedObjects to dep array to resolve linting issuse
     */
  }, [canvas, setSelectedObjects]);
};

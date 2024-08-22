import { fabric } from "fabric";
import { useCallback, useRef, useState } from "react";
import { JSON_KEYS_HISTORY } from "@/features/editor/constants";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
}
export const useHistory = ({ canvas }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const canvasHistory = useRef<string[]>([]);
  // skipSave: use to avoid saving on every change so fill history infinitely in undo and redo
  const skipSave = useRef(false);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  // skip: used when we want to save without adding to history
  // skipSave act as global skip while skip act as local skip
  // skipSave: wii be saved to the database but skip will be used in local only
  const save = useCallback(
    (skip = false) => {
      if (!canvas) return;
      const currentState = canvas.toJSON(JSON_KEYS_HISTORY);
      const currentStateAsString = JSON.stringify(currentState);

      if (!skip && !skipSave.current) {
        canvasHistory.current.push(currentStateAsString);
        setHistoryIndex(canvasHistory.current.length - 1);
      }

      // TODO: save Callback
    },
    [canvas]
  );

  const undo = useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.clear().renderAll();
      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);
      canvas?.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canUndo, canvas, historyIndex]);
  const redo = useCallback(() => {
    if (canRedo()) {
      skipSave.current = true;
      canvas?.clear().renderAll();
      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);
      canvas?.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canRedo, canvas, historyIndex]);

  return { save, undo, redo, canUndo, canRedo, setHistoryIndex, canvasHistory };
};

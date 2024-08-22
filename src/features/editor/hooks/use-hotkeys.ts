import { fabric } from "fabric";
import { useEvent } from "react-use";

interface useHotKeysProps {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
}
export const useHotKeys = ({
  canvas,
  copy,
  paste,
  redo,
  save,
  undo,
}: useHotKeysProps) => {
  useEvent("keydown", (e) => {
    const isCtrlKey = e.ctrlKey || e.metaKey;
    const isBackspace = e.key === "Backspace";
    const isInInput = ["INPUT", "TEXTAREA"].includes(
      (e.target as HTMLElement).tagName
    );
    if (isInInput) return;
    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && e.key === "z") {
      e.preventDefault();
      undo();
    }

    if (isCtrlKey && e.key === "y") {
      e.preventDefault();
      redo();
    }

    if (isCtrlKey && e.key === "s") {
      e.preventDefault();
      // save to db not to local as JSON
      save(true);
    }

    if (isCtrlKey && e.key === "c") {
      e.preventDefault();
      copy();
    }

    if (isCtrlKey && e.key === "v") {
      e.preventDefault();
      paste();
    }

    if (isCtrlKey && e.key === "a") {
      e.preventDefault();
      canvas?.discardActiveObject();

      const allObjectsInWorkspace = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjectsInWorkspace, { canvas })
      );

      canvas?.renderAll();
    }
  });
  return;
};

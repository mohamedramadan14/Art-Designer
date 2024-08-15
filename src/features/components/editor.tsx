"use client";

import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/useEditor";
import { fabric } from "fabric";

export const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef<any>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: workspaceRef.current!,
    });
  }, [init]);

  /**
   * We use the ref to render the canvas in the workspace but also to observe changes in the workspace and sync the
   * canvas with the workspace to avoid flickering and make everything centered.
   */
  return (
    <div className="h-full flex flex-col">
      <div ref={workspaceRef} className="flex-1 h-full bg-muted">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

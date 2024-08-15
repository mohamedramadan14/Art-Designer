"use client";

import { useEffect, useRef } from "react";
import { useEditor } from "@/features/hooks/useEditor";
import { fabric } from "fabric";
import { Navbar } from "@/features/components/navbar";
import { Sidebar } from "@/features/components/sidebar";
import { Toolbar } from "@/features/components/toolbar";
import { Footer } from "@/features/components/footer";

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
      <Navbar />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
        <Toolbar />
        <div ref={workspaceRef} className="flex-1 h-[calc(100%-124px)] bg-muted">
          <canvas ref={canvasRef} />
        </div>
        <Footer />
        </main>
      </div>
    </div>
  );
};

import { fabric } from "fabric";

export type ActiveTool =
  | "select"
  | "images"
  | "text"
  | "shapes"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export type BuildEditorProps = {
  canvas: fabric.Canvas;
};

export interface Editor {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInvertedTriangle: () => void;
  addDiamond: () => void;
}

export interface CircleOptions {
  radius: number;
  left: number;
  top: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface RectangleOptions {
  left: number;
  top: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  width: number;
  height: number;
  angle: number;
}

export interface DiamondOptions {
  left: number;
  top: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  width: number;
  height: number;
  angle: number;
}
export interface TriangleOptions {
  left: number;
  top: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  width: number;
  height: number;
  angle: number;
}

import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
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
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  setFillColor: (fillColor: string) => void;
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  setStrokeDashArray: (strokeDashArray: number[]) => void;
};

export interface Editor {
  addText: (text: string , options?: ITextboxOptions) => void;

  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInvertedTriangle: () => void;
  addDiamond: () => void;

  bringForward: () => void;
  sendBackwards: () => void;
  changeOpacity: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;

  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
}

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
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

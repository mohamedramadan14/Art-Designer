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
  strokeDashArray: number[];
  selectedObjects: fabric.Object[];
  fontFamily: string;
  fontSize: number;
  save: (skip?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  autoZoom: () => void;
  setFillColor: (fillColor: string) => void;
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setStrokeDashArray: (strokeDashArray: number[]) => void;
  setFontFamily: (fontFamily: string) => void;
  setFontSize: (fontSize: number) => void;
  copy: () => void;
  paste: () => void;
};

export interface Editor {
  saveAsPng: () => void;
  saveAsSvg: () => void;
  saveAsJpg: () => void;
  saveAsJson: () => void;
  loadAsJson: (json: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  onCopy: () => void;
  onPaste: () => void;
  getWorkSpace: () => fabric.Object | undefined;
  zoomIn: () => void;
  zoomOut: () => void;
  autoZoom: () => void;
  changeSize: (size: { width: number; height: number }) => void;
  changeBackground: (value: string) => void;
  enableDrawMode: () => void;
  disableDrawMode: () => void;
  changeImageFilter: (value: string) => void;
  addImage: (value: string) => void;
  deleteElement: () => void;
  addText: (text: string, options?: ITextboxOptions) => void;

  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInvertedTriangle: () => void;
  addDiamond: () => void;

  bringForward: () => void;
  sendBackwards: () => void;

  changeTextAlignment: (value: string) => void;
  changeFontLineThrough: (value: boolean) => void;
  changeFontUnderline: (value: boolean) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeFontSize: (value: number) => void;
  changeFontFamily: (value: string) => void;
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
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveUnderline: () => boolean;
  getActiveLineThrough: () => boolean;
  getActiveTextAlignment: () => string;
  getActiveFontSize: () => number;
  //getActiveImageFilters: () => string[];
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
}

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
  defaultState: string;
  defaultHeight: number;
  defaultWidth: number;
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

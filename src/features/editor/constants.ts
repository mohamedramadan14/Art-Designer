import {
  CircleOptions,
  DiamondOptions,
  RectangleOptions,
  TriangleOptions,
} from "@/features/editor/types";

export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;

export const CIRCLE_OPTIONS: CircleOptions = {
  radius: 175,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS: RectangleOptions = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 300,
  height: 300,
  angle: 0,
};

export const TRIANGLE_OPTIONS: TriangleOptions = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 300,
  height: 300,
  angle: 0,
};

export const INVERTED_TRIANGLE_OPTIONS: TriangleOptions = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 300,
  height: 300,
  angle: 0,
};

export const DIAMOND_OPTIONS: DiamondOptions = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

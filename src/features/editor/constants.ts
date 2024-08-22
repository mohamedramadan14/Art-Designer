import * as material from "material-colors";

import {
  CircleOptions,
  DiamondOptions,
  RectangleOptions,
  TriangleOptions,
} from "@/features/editor/types";

export const SELECTION_DEPENDENT_TOOLS = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];
export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Arial";
export const FONT_WEIGHT = 400;
export const FONT_STYLE = "normal";
export const FONT_ALIGNMENT = "left";

export const FONTS = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Lucida Console",
  "Geneva",
  "Monaco",
  "Andale Mono",
  "Courier",
];
export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};
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

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.grey["500"],
  material.blueGrey["500"],
  "transparent",
];

export const FILTERS = [
  "none",
  "sepia",
  "polaroid",
  "kodachrome",
  "contrast",
  "brightness",
  "grayscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];


export const JSON_KEYS_HISTORY = [
  "name",
  "gradientAngel",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extension",
  "extensionType",
];
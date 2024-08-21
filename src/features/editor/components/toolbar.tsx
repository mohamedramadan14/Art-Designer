import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
} from "lucide-react";
import { BsBorderWidth, BsTrash } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "@/features/editor/utils";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import { FONT_SIZE, FONT_WEIGHT } from "@/features/editor/constants";
import { useState } from "react";
import { FontSizeInput } from "@/features/editor/components/font-size-input";
import { IoColorFilterSharp } from "react-icons/io5";
import { BsEraser } from "react-icons/bs";
interface ToolbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const Toolbar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialLineThrough = editor?.getActiveLineThrough();
  const initialUnderline = editor?.getActiveUnderline();
  const initialTextAlign = editor?.getActiveTextAlignment();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [properties, setProperties] = useState<Record<string, any>>({
    fontWeight: initialFontWeight,
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    lineThrough: initialLineThrough,
    underline: initialUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const selectedObject = editor?.selectedObjects[0];

  const isTextSelected = isTextType(selectedObjectType);
  const isImageSelected = selectedObjectType === "image";

  const toggleBold = () => {
    if (!selectedObject) return;
    const newFontWeight = properties.fontWeight > 400 ? 400 : 700;
    editor?.changeFontWeight(newFontWeight);
    setProperties((prev) => ({ ...prev, fontWeight: newFontWeight }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;
    const newFontStyle =
      properties.fontStyle === "italic" ? "normal" : "italic";
    editor?.changeFontStyle(newFontStyle);
    setProperties((prev) => ({ ...prev, fontStyle: newFontStyle }));
  };
  const toggleLineThrough = () => {
    if (!selectedObject) return;
    const newFontLineThrough = properties.lineThrough ? false : true;
    editor?.changeFontLineThrough(newFontLineThrough);
    setProperties((prev) => ({ ...prev, lineThrough: newFontLineThrough }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;
    const newFontUnderline = properties.underline ? false : true;
    editor?.changeFontUnderline(newFontUnderline);
    setProperties((prev) => ({ ...prev, underline: newFontUnderline }));
  };

  const onChangeTextAlign = (alignment: string) => {
    if (!selectedObject) return;
    editor?.changeTextAlignment(alignment);
    setProperties((prev) => ({ ...prev, textAlign: alignment }));
  };

  const onChangeFontSize = (fontSize: number) => {
    if (!selectedObject) return;
    editor?.changeFontSize(fontSize);
    setProperties((prev) => ({ ...prev, fontSize }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div
        className="shrink-0 h-[56px] border-b bg-white w-full flex
          items-center overflow-x-auto z-[49] p-2 gap-x-2"
      />
    );
  }

  return (
    <div
      className="shrink-0 h-[56px] border-b bg-white w-full flex
          items-center overflow-x-auto z-[49] p-2 gap-x-2"
    >
      {!isImageSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              className={cn(activeTool === "fill" && "bg-gray-100")}
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Stroke Color" side="bottom" sideOffset={5}>
            <Button
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
              onClick={() => onChangeActiveTool("stroke-color")}
              size="icon"
              variant="ghost"
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Stroke Width" side="bottom" sideOffset={5}>
            <Button
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant="ghost"
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
            >
              <div className="truncate max-w-[100px]">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(properties.fontWeight > 400 && "bg-gray-200")}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(properties.fontStyle === "italic" && "bg-gray-200")}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(properties.underline && "bg-gray-200")}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Line Through" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLineThrough}
              size="icon"
              variant="ghost"
              className={cn(properties.lineThrough && "bg-gray-200")}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Align Left" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "left" && "bg-gray-200")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Align Center" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "center" && "bg-gray-200")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Align Right" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "right" && "bg-gray-200")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isTextSelected && (
        <div className="flex items-center justify-center h-full">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {isImageSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "filter" && "bg-gray-200")}
            >
              <IoColorFilterSharp className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isImageSelected && (
        <div className="flex items-center justify-center h-full">
          <Hint label="Remove Background" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("remove-bg")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "remove-bg" && "bg-gray-200")}
            >
              <BsEraser className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex items-center justify-center h-full">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center justify-center h-full">
        <Hint label="Send Backward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center justify-center h-full">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center justify-center h-full">
        <Hint label="Remove" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.deleteElement()}
            size="icon"
            variant="ghost"
          >
            <BsTrash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

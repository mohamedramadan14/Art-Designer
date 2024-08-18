import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
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
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isTextSelected = isTextType(selectedObjectType);

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
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>
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
                  borderColor: strokeColor,
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
    </div>
  );
};

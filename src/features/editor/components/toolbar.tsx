import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";

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
    </div>
  );
};

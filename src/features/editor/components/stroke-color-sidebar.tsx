import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { STROKE_COLOR } from "@/features/editor/constants";

interface StrokeColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const StrokeColorSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: StrokeColorSidebarProps) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Add and customize Stroke color to your elements"
      />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

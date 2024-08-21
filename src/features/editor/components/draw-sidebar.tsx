import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/features/editor/components/color-picker";
import {
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
} from "@/features/editor/constants";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DrawSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const DrawSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: DrawSidebarProps) => {
  const brushColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const brushWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onColorChange = (value: string) => {
    console.log("Color Changed");

    editor?.changeStrokeColor(value);
  };

  const onWidthChange = (value: number) => {
    console.log("Width Changed");

    editor?.changeStrokeWidth(value);
  };
  const onClose = () => {
    onChangeActiveTool("select");
    editor?.disableDrawMode();
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Draw"
        description="customize your drawing brush settings"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">Brush Width</Label>
          <Slider
            value={[brushWidth]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>
        <div className="space-y-6 p-4">
          <ColorPicker value={brushColor} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

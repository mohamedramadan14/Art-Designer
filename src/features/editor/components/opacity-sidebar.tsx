import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";
interface OpacitySidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const OpacitySidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: OpacitySidebarProps) => {
  const initialOpacityValue = editor?.getActiveOpacity() || 1;
  const [opacity, setOpacity] = useState<number>(initialOpacityValue);
  const selectedObject = useMemo(() => {
    return editor?.selectedObjects[0];
  }, [editor?.selectedObjects]);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const onChangeOpacity = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Customize Opacity to your elements"
      />
      <ScrollArea>
        <div className="space-y-4 p-4 border-b">
          <Label className="text-sm">Opacity Degree</Label>
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChangeOpacity(values[0])}
            max={1}
            min={0}
            step={0.1}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

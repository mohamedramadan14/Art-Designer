import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { FILL_COLOR } from "@/features/editor/constants";
import { useEffect, useMemo, useState } from "react";
import { Gradient, Pattern } from "fabric/fabric-impl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const SettingsSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: SettingsSidebarProps) => {
  const workspace = editor?.getWorkSpace();

  const initialWidth = useMemo(() => {
    console.log(workspace?.width);
    return `${workspace?.width ?? 0}`;
  }, [workspace]);

  const initialHeight = useMemo(() => {
    console.log(workspace?.height);
    return `${workspace?.height ?? 0}`;
  }, [workspace]);

  const initialBackground = useMemo(() => {
    return workspace?.fill ?? "#FFF";
  }, [workspace]);

  const [width, setWidth] = useState<string>(initialWidth);
  const [height, setHeight] = useState<string>(initialHeight);
  const [backgroundFill, setBackgroundFill] = useState<
    string | Pattern | Gradient
  >(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackgroundFill(initialBackground);
  }, [initialBackground, initialHeight, initialWidth]);

  const changeWidth = (value: string) => setWidth(value);
  const changeHeight = (value: string) => setHeight(value);
  const changeBackgroundFill = (value: string) => {
    setBackgroundFill(value);
    editor?.changeBackground(value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Customize backgroundColor and size of your workspace"
      />
      <ScrollArea>
        <form onSubmit={onSubmitHandler} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              className="focus-visible:ring-orange-500 focus-visible:ring-offset-1 focus-visible:ring-offset-red-500"
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              className="focus-visible:ring-orange-500 focus-visible:ring-offset-1 focus-visible:ring-offset-red-500"
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker
            value={backgroundFill.toString()}
            onChange={changeBackgroundFill}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
interface TextSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const TextSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: TextSidebarProps) => {
  
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Text"
        description="Add Text to your workspace"
      />
      <ScrollArea>
        <div className="space-y-4 p-4 border-b">
          <Button variant="ghost" size="lg" className="w-full h-16" onClick={() => editor?.addText("TEXTBOX")}>
            <span className="text-xl font-normal">
            Add Text
            </span>
          </Button>
          <Button className="w-full h-16" variant="ghost" size="lg" onClick={() => editor?.addText("HEADING" , {
            fontSize: 80,
            fontWeight: 700,
          })}>
            <span className="text-3xl font-bold">
              Add Heading
            </span>
          </Button>
          <Button className="w-full h-16" variant="ghost" size="lg" onClick={() => editor?.addText("SUBHEADING" , {
            fontSize: 40,
            fontWeight: 500,
          })}>
            <span className="text-2xl font-semibold">
              Add SubHeading
            </span>
          </Button>
          <Button className="w-full h-16" variant="ghost" size="lg" onClick={() => editor?.addText("PARAGRAPH" , {
            fontSize: 32
          })}>
              Add Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

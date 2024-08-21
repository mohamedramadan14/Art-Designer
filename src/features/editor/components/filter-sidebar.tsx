import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FILTERS } from "@/features/editor/constants";
import { useState } from "react";

interface FilterSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const FilterSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: FilterSidebarProps) => {
  const[activeFilters, setActiveFilters] = useState<string[]>([]);
  //const activeFilters = editor?.getActiveImageFilters() || [] ;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Adding and Removing Filters to your selected images"
      />
      <ScrollArea>
        <div className="space-y-2 p-4 border-b">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                filter === activeFilters[0] && "border-2 border-orange-600"
              )}
              onClick={() => {
                editor?.changeImageFilter(filter)
                setActiveFilters([filter]);
              }}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

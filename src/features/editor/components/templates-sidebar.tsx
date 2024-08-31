import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Loader, Crown } from "lucide-react";
import Image from "next/image";
import {
  TemplateResponseType,
  useGetTemplates,
} from "@/features/projects/query/use-get-templates";
import { useConfirm } from "@/hooks/use-confirm";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";

interface TemplatesSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const TemplatesSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: TemplatesSidebarProps) => {
  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "20",
  });
  const { shouldBlock, triggerPaywall } = usePaywall();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to change this template?",
    "This action cannot be undone."
  );
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClickHandler = async (template: TemplateResponseType["data"][0]) => {
    // check if template is Pro
    if (template.isPro && shouldBlock) {
      triggerPaywall();
      return;
    }
    const ok = await confirm();
    if (ok) editor?.loadAsJson(template.json);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ConfirmDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose and customize templates from the library to your workspace"
      />
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Failed to fetch templates. Please try again
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((template) => (
                <button
                  style={{
                    aspectRatio: `${template.width}/${template.height}`,
                  }}
                  onClick={() => onClickHandler(template)}
                  key={template.id}
                  className="relative w-full group hover:opacity-75 transition
              bg-muted rounded-sm overflow-hidden border"
                >
                  <Image
                    sizes="100px"
                    fill
                    src={template.thumbnailUrl || ""}
                    alt={template.name || "Template"}
                    className="object-cover"
                  />
                  {template.isPro && (
                    <div className="absolute right-3 top-3 size-8 flex items-center justify-center bg-black/50 rounded-full">
                      <Crown className="size-4 fill-yellow-500 text-yellow-500" />
                    </div>
                  )}
                  <div
                    className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left
                "
                  >
                    {template.name}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

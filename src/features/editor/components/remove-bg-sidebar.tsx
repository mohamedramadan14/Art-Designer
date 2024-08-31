import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiCircleAlert } from "react-icons/ci";
import { useRemoveBackground } from "@/features/ai/query/use-remove-bg";
import { LoaderPinwheel } from "lucide-react";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";

interface RemoveBgSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const RemoveBgSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: RemoveBgSidebarProps) => {
  const mutation = useRemoveBackground();
  const selectedObject = editor?.selectedObjects[0];
  const { shouldBlock, triggerPaywall } = usePaywall();
  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    mutation.mutate(
      { image: imageSrc },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="AI Background Remover"
        description="Remove background for images with AI"
      />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <CiCircleAlert className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature not available for this element
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition bg-muted",
                mutation.isPending && "opacity-50"
              )}
            >
              <Image
                src={imageSrc}
                alt="image"
                fill
                className="object-cover"
                sizes="200"
              />
            </div>
            <Button
              onClick={onClick}
              disabled={mutation.isPending}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {mutation.isPending ? (
                <LoaderPinwheel className="size-6 animate-spin" />
              ) : (
                "Remove"
              )}
            </Button>
          </div>
        </ScrollArea>
      )}

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

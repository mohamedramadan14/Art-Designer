import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/query/use-generate-image";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";

interface AIImageSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const AIImageSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: AIImageSidebarProps) => {
  const mutation = useGenerateImage();
  const [prompt, setPrompt] = useState<string>("");
  const { shouldBlock, triggerPaywall } = usePaywall();
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(shouldBlock) {
      triggerPaywall();
      return;
    }
    mutation.mutate(
      { prompt: prompt },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
    setPrompt("");
  };
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="AI Image Generator"
        description="Generate images with AI"
      />
      <ScrollArea>
        <form onSubmit={onSubmitHandler} className="space-y-6 p-4">
          <Textarea
            placeholder="an astronaut riding a horse on mars"
            cols={30}
            rows={10}
            required
            minLength={3}
            className="w-full focus-visible:ring-offset-1 focus-visible:ring-orange-500"
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
            value={prompt}
            disabled={mutation.isPending}
          />
          <Button
            disabled={mutation.isPending}
            type="submit"
            variant="default"
            className="w-full bg-orange-500 hover:bg-orange-600 "
          >
            {mutation.isPending ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

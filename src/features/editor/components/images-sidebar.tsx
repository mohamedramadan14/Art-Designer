import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetImages } from "@/features/images/query/use-get-images";
import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

interface ImagesSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
export const ImagesSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: ImagesSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  console.log(data);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add and customize images to your workspace"
      />
      <div className="p-4 border-b">
        <UploadButton
          appearance={{
            button:
              "w-full text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-sm",
            allowedContent: "hidden",
            container: "",
          }}
          content={{
            button: "Upload Image",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => editor?.addImage(res[0].url)}
        />
      </div>
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Failed to load images. Please try again
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((image) => (
                <button
                  onClick={() => editor?.addImage(image.urls.regular)}
                  key={image.id}
                  className="relative w-full h-[100px] group hover:opacity-75 transition
              bg-muted rounded-sm overflow-hidden border"
                >
                  <Image
                    sizes="100px"
                    fill
                    src={image.urls.small}
                    alt={image.alt_description || "image"}
                    className="object-cover"
                  />
                  <Link
                    href={image.links.html}
                    target="_blank"
                    className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left
                "
                  >
                    {image.user.name}
                  </Link>
                </button>
              ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

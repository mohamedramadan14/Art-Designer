import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { CgMinimize } from "react-icons/cg";
import { Editor } from "@/features/editor/types";

interface FooterProps {
  editor: Editor | undefined;
}
export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer
      className="h-[56px] border-t bg-white w-full flex
          items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row"
    >
      <Hint label="Zoom In" side="top" sideOffset={10}>
        <Button
          className="h-full"
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
        >
          <BsZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom Out" side="top" sideOffset={10}>
        <Button
          className="h-full"
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
        >
          <BsZoomOut className="size-4" />
        </Button>
      </Hint>
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          className="h-full"
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
        >
          <CgMinimize className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

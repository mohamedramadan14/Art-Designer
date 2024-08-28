"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/features/auth/components/user-button";
import { Logo } from "@/features/editor/components/logo";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { useFilePicker } from "use-file-picker";

interface NavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
// TODO: check property modal=false
export const Navbar = ({
  editor,
  onChangeActiveTool,
  activeTool,
}: NavbarProps) => {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadAsJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-ful flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full h-full flex items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-52">
            <DropdownMenuItem
              onClick={() => {
                openFilePicker();
              }}
              className="flex items-center gap-x-2"
            >
              <CiFileOn className="size-6" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-slate-200")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Saved</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              Export
              <Download className="size-4 ml-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveAsJson()}
            >
              <CiFileOn className="size-6" />
              <div>
                <p>JSON</p>
                <p className="text-xs text-muted-foreground">
                  Save as a JSON file
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  Best for collaboration
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveAsPng()}
            >
              <CiFileOn className="size-6" />
              <div>
                <p>PNG</p>
                <p className="text-xs text-muted-foreground">
                  Save as a PNG file
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  Best for sharing
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveAsJpg()}
            >
              <CiFileOn className="size-6" />
              <div>
                <p>JPG</p>
                <p className="text-xs text-muted-foreground">
                  Save as a JPG file
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  Best for printing
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveAsSvg()}
            >
              <CiFileOn className="size-6" />
              <div>
                <p>SVG</p>
                <p className="text-xs text-muted-foreground">
                  Save as a SVG file
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  Best for vector software
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <UserButton />
      </div>
    </nav>
  );
};

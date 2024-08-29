"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/query/use-get-project";
import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";

interface EditorProjectPageProps {
  params: { projectId: string };
}
const EditorProjectPage = ({ params }: EditorProjectPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);
  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ImSpinner2 className="size-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-8 text-destructive" />
        <p className="text-muted-foreground text-sm">Failed to fetch project</p>
        <Button
          asChild
          variant="outline"
          className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
        >
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }
  return <Editor initialData={data} />;
};

export default EditorProjectPage;

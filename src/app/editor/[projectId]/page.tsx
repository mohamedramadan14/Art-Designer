import { protectByAuth } from "@/features/auth/utils";
import { Editor } from "@/features/editor/components/editor";

const EditorProjectPage = async ({
  params: { projectId },
}: {
  params: { projectId: string };
}) => {
  await protectByAuth();
  return <Editor />
 

};

export default EditorProjectPage;

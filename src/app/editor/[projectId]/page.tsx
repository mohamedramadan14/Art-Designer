import { Editor } from "@/features/editor/components/editor";

const EditorProjectPage = ({
  params: { projectId },
}: {
  params: { projectId: string };
}) => {
  
  return <Editor />
 

};

export default EditorProjectPage;

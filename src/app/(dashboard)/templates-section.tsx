"use client";

import {
  TemplateResponseType,
  useGetTemplates,
} from "@/features/projects/query/use-get-templates";
import { TriangleAlert } from "lucide-react";
import { RiLoader3Fill } from "react-icons/ri";
import { TemplateCard } from "./template-card";
import { useCreateProject } from "@/features/projects/query/use-create-project";
import { useRouter } from "next/navigation";

export const TemplatesSection = () => {
  const mutation = useCreateProject();
  const router = useRouter();
  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "4",
  });

  const onClickHandler = (template: TemplateResponseType["data"][0]) => {
    // Check if template is Pro
    mutation.mutate(
      {
        name: `${template.name} Project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  if (isLoading) {
    return (
      <div className="space-y-4 ">
        <h4 className="text-xl font-semibold">Quick start with templates</h4>
        <div className="flex items-center justify-center h-32">
          <RiLoader3Fill className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="space-y-4 ">
        <h4 className="text-xl font-semibold">Quick start with templates</h4>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <TriangleAlert className="size-8 text-destructive" />
          <p>Failed to load templates</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div>
      <h4 className="text-xl font-semibold">Quick start with templates</h4>
      <div className="grid grid-cols-2  md:grid-cols-4 mt-4 gap-4">
        {data?.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imgSrc={template.thumbnailUrl || ""}
            onClick={() => onClickHandler(template)}
            disabled={mutation.isPending}
            description={`${template.width} X ${template.height} pixels`}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};

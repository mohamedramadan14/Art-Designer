"use client";
import { CiFileOn } from "react-icons/ci";
import { useGetProjects } from "@/features/projects/query/use-get-projects";
import { Table, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { CiSearch } from "react-icons/ci";
import { AlertTriangle, FileIcon, Loader, MoreHorizontal } from "lucide-react";
import { RiLoader3Fill } from "react-icons/ri";
import React from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { IoIosMore } from "react-icons/io";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoCopyOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { useDuplicateProject } from "@/features/projects/query/use-duplicate-project";
import { useDeleteProject } from "@/features/projects/query/use-delete-project";
import { useConfirm } from "@/hooks/use-confirm";

export const ProjectsSection = () => {
  const router = useRouter();
  const duplicateMutation = useDuplicateProject();
  const deleteMutation = useDeleteProject();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Project",
    "Are you sure you want to delete this project?"
  );
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) deleteMutation.mutate({ id });
  };

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Recent Projects</h4>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <RiLoader3Fill className="size-8 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Recent Projects</h4>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <AlertTriangle className="size-8 text-destructive" />
          <p className="text-muted-foreground text-sm">
            Failed to load projects
          </p>
        </div>
      </div>
    );
  }

  if (!data?.pages.length || !data?.pages[0].data.length) {
    return (
      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Recent Projects</h4>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <CiSearch className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <h4 className="text-xl font-semibold">Recent Projects</h4>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="font-medium flex items-center gap-x-2 cursor-pointer"
                  >
                    <CiFileOn className="size-6" />
                    {project.name}
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden md:table-cell cursor-pointer"
                  >
                    {project.width} x {project.height} pixels
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden md:table-cell cursor-pointer"
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={false}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-transparent"
                        >
                          <IoIosMore className="size-6" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="cursor-pointer h-10"
                          disabled={duplicateMutation.isPending}
                          onClick={() => onCopy(project.id)}
                        >
                          <IoCopyOutline className="size-4 mr-2 text-orange-600 fill-orange-600" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer h-10"
                          disabled={deleteMutation.isPending}
                          onClick={() => onDelete(project.id)}
                        >
                          <FaTrash className="size-4 mr-2 text-destructive fill-destructive" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="w-full flex justify-center items-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <Loader className="size-8 animate-spin text-muted-foreground" />
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

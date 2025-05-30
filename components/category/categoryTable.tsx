"use client";

import { Category } from "@/types/common";
import { SquarePen, X, ChevronDown, ChevronRight } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UpdateModal } from "../modal/update-modal";

export default function CategoryTable({
  category,
  index,
  refetch,
}: {
  category: Category;
  index: number;
  refetch: () => void;
}) {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteCategory(id).unwrap();
      console.log(res);
      if (res?.success === true) {
        toast.success("Category deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete category");
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSubCategory = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteCategory(id).unwrap();
      console.log(res);
      if (res?.success === true) {
        toast.success("Category deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete category");
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <TableRow key={category.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleExpand}
          >
            <span className="">{category.name}</span>
            {category.children &&
              category.children.length > 0 &&
              (expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              ))}
          </div>
        </TableCell>
        <TableCell className="flex gap-2">
          {category.children
            ?.slice(0, expanded ? undefined : 3)
            .map((child) => (
              <div key={child.id}>
                <span className="bg-gray-200 p-1 px-2 rounded-full">
                  {child.name}
                </span>
              </div>
            ))}
          {!expanded && category.children && category.children.length > 3 && (
            <span className="bg-gray-200 p-1 px-2 rounded-full">
              +{category.children.length - 3} more
            </span>
          )}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 p-1 px-3 text-white rounded-full"
            >
              {/* <SquarePen className="h-4 w-4 " /> */}
              Update
              {/* {category.id} */}
            </button>
            <UpdateModal
              open={isOpen}
              onOpenChange={setIsOpen}
              categoryId={category.id}
              name={category.name}
              refetch={refetch}
            />
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 p-1 px-3 text-white rounded-full"
            >
              Delete
            </button>
          </div>
        </TableCell>
      </TableRow>

      {expanded &&
        category.children?.map((child, childIndex) => (
          <TableRow key={child.id} className="bg-gray-50">
            <TableCell></TableCell>
            <TableCell className="pl-10">
              <div className="flex items-center gap-2">{child.name}</div>
            </TableCell>
            <TableCell>
              {child.children?.map((subChild) => (
                <span
                  key={subChild.id}
                  className="bg-gray-200 p-1 px-2 rounded-full mr-2"
                >
                  {subChild.name}
                </span>
              ))}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-green-500 p-1 px-3 text-white rounded-full"
                >
                  Update
                  {/* {child.id} */}
                </button>
                <UpdateModal
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  categoryId={child.id}
                  name={category.name}
                  refetch={refetch}
                />
                <button
                  onClick={() => handleDeleteSubCategory(child.id)}
                  className="bg-red-500 p-1 px-3 text-white rounded-full"
                >
                  Delete
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteModalOpen(false)}>
              No
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(category.id)}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

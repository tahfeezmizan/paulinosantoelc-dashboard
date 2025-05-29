"use client";

import { Category } from "@/types/common";
import { SquarePen, X } from "lucide-react";
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <TableRow key={category.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 p-1 text-white rounded-full"
            >
              <SquarePen className="h-4 w-4 " />
            </button>
            <UpdateModal
              open={isOpen}
              onOpenChange={setIsOpen}
              categoryId={category.id}
            />
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 p-1 text-white rounded-full"
            >
              <X className="h-4 w-4 " />
            </button>
          </div>
        </TableCell>
      </TableRow>

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

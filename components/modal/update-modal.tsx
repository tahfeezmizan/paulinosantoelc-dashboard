"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { useState } from "react";
import { toast } from "sonner";

interface ModalProps {
  open: boolean;
  categoryId: string;
  onOpenChange: (open: boolean) => void;
}

export function UpdateModal({ open, onOpenChange, categoryId }: ModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [updateCategory] = useUpdateCategoryMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async () => {
    // Validate input before submission
    if (!categoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    console.log("category name", categoryName);
    console.log("category id", categoryId);

    try {
      // Fixed: Match API parameter structure
      const res = await updateCategory({
        id: categoryId,
        name: categoryName.trim(),
      }).unwrap();

      // Fixed: Proper comparison operator
      if (res.success === true) {
        toast.success("Category updated successfully");
        setCategoryName("");
        onOpenChange(false);
      } else {
        toast.error(res.message || "Failed to update category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="categoryName" className=" w-full">
            Category Name
          </Label>
          <Input
            id="categoryName"
            type="text"
            onChange={handleInputChange}
            value={categoryName}
            placeholder="Enter Category Name"
          />
        </div>

        <DialogFooter className="w-full flex justify-center">
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

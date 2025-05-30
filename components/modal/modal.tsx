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
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { create } from "domain";
import { useState } from "react";
import { toast } from "sonner";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Modal({ open, onOpenChange }: ModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async () => {
    // Make this async
    console.log("category name", categoryName);

    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const res = await createCategory({ name: categoryName }).unwrap(); // Add await here

      console.log(res);

      if (res.success) {
        // Fixed the assignment (=) to comparison (== or ===)
        toast.success("Category added successfully");
        setCategoryName("");
        onOpenChange(false); // Move this inside the success condition
      } else {
        toast.error("Failed to add category");
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
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="file" className="w-full">
            Category Name
          </Label>
          <Input
            type="text"
            onChange={handleInputChange}
            value={categoryName}
            placeholder="Enter Category Name"
          />
        </div>

        <DialogFooter className="w-full flex justify-center">
          <Button type="submit" onClick={handleSubmit}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

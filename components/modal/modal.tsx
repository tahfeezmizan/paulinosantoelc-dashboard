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

  const handleSubmit = () => {
    console.log("category name", categoryName);

    onOpenChange(false);

    try {
      const res = createCategory({ name: categoryName }).unwrap();
      if ((res.success = true)) {
        toast.success("Category added successfully");
        setCategoryName("");
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
          <Label htmlFor="file" className=" w-full">
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

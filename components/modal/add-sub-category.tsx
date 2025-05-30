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
import { Category } from "@/types/common";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSubCategoryModal({
  open,
  onOpenChange,
  categoryData,
}: {
  categoryData: Category[];
} & ModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    onOpenChange(false);
    e.preventDefault();
    console.log("Selected Category:", selectedCategoryId, categoryName);

    try {
      const res = createCategory({
        parentId: selectedCategoryId,
        name: categoryName,
      }).unwrap();

      console.log(res);

      if ((res.success = true)) {
        toast.success("Sub category added successfully");
        setCategoryName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Add Sub Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="">
            <Label htmlFor="file" className=" w-full">
              Selecte Parent Category
            </Label>
            <Select
              value={selectedCategoryId}
              onValueChange={(value) => setSelectedCategoryId(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryData?.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="">
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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

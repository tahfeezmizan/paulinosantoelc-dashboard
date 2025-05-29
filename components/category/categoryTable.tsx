"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, FileText, SquarePen, X } from "lucide-react";
import { Category } from "@/types/common";

export default function CategoryTable({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  return (
    <TableRow key={category.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.name} </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <button className="bg-green-500 p-1 text-white rounded-full">
            <SquarePen className="h-4 w-4 " />
          </button>
          <button className="bg-red-500 p-1 text-white rounded-full">
            <X className="h-4 w-4 " />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

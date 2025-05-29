"use client";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { Search } from "lucide-react";
import { useState } from "react";
import Pagination from "../pegination/pagination";
import CategoryTable from "./categoryTable";
import { Category } from "@/types/common";
import Link from "next/link";
import { Modal } from "../modal/modal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

export function CategoryList() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data } = useGetAllCategoryQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchQuery,
  });

  const categoryData = data?.data;
  // console.log(searchQuery, "searchQuery");

  const totalPages = categoryData?.metaData?.totalPage || 1;

  // console.log("Categorys Data", categoryData);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Category</h1>
          <p className="text-gray-500">View, manage Category List.</p>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            className="border px-3 py-1.5 rounded-sm text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white duration-300"
          >
            Add Category
          </Button>
          <Modal open={isOpen} onOpenChange={setIsOpen} />
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-[#0F172A] font-semibold">
                  SL.
                </TableHead>
                <TableHead className="text-[#0F172A] font-semibold">
                  Category Name
                </TableHead>
                <TableHead className="text-[#0F172A] font-semibold">
                  Sub Category Name
                </TableHead>

                <TableHead className=" w-[80px] text-[#0F172A] font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData?.map((category: Category, index: number) => (
                <CategoryTable key={index} index={index} category={category} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

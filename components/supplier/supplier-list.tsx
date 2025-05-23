"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllSpplierQuery } from "@/redux/api/supplierApi";
import { I_ErrorResponse, User } from "@/types/common";
import { Search } from "lucide-react";
import { useState } from "react";
import Pagination from "../pegination/pagination";
import SupplierTable from "./supplier-table";

// Define the supplier data type
interface Supplier {
  id: string;
  name: string;
  country: string;
  company: string;
  products: string;
}

export function SupplierList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, isFetching, error, refetch } = useGetAllSpplierQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      searchTerm: searchQuery,
    }
  );

  const supplierData = data?.data;
  // console.log("Supplier Data", supplierData?.metaData?.totalPage);

  const totalPages = supplierData?.metaData?.totalPage || 1;

  // decide what to display
  let content;

  if (isLoading || isFetching) {
    content = <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    const err = error as I_ErrorResponse;
    content = (
      <div className="text-red-500 bg-red-100 py-10 px-5">
        <p>Error: {err.data.message}</p>
      </div>
    );
  }

  if (!isLoading && !isFetching && !error) {
    const supplierLists = data?.data?.users as User[];
    // console.log("sorted content", supplierLists);
    if (supplierLists.length === 0) {
      content = <p>No Supplier Found</p>;
    } else {
      content = (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Supplier List</h1>
              <p className="text-gray-500">View, manage Supplier List.</p>
            </div>

            <div className="flex-1 flex items-center justify-end gap-5 max-w-sm">
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
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white rounded-md border shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px] text-[#0F172A] font-semibold">
                      SL.
                    </TableHead>
                    <TableHead className="text-[#0F172A] font-semibold">
                      Supplier Name
                    </TableHead>
                    <TableHead className="text-[#0F172A] font-semibold">
                      Country
                    </TableHead>
                    <TableHead className="text-[#0F172A] font-semibold">
                      Company Name
                    </TableHead>
                    <TableHead className="text-[#0F172A] font-semibold">
                      Trade License
                    </TableHead>
                    <TableHead className="text-[#0F172A] font-semibold">
                      Products
                    </TableHead>
                    <TableHead className="w-[80px] text-[#0F172A] font-semibold">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierLists.map((supplier: User, index: number) => (
                    <SupplierTable
                      key={supplier.id}
                      supplier={supplier}
                      index={index}
                      refetch={refetch}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      );
    }
  }

  return content;
}

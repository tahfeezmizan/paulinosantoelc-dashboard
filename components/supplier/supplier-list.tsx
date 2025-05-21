"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search } from "lucide-react";
import { useState } from "react";
import { FilterDropdowns } from "../filter-dropdowns";
import { useGetAllSpplierQuery } from "@/redux/api/supplierApi";
import SupplierTable from "./supplier-table";
import { I_ErrorResponse, User } from "@/types/common";

// Define the supplier data type
interface Supplier {
  id: string;
  name: string;
  country: string;
  company: string;
  products: string;
}

// Sample supplier data
const supplierData: Supplier[] = [
  {
    id: "01",
    name: "Jenny Wilson",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "02",
    name: "Arlene McCoy",
    country: "USA",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "03",
    name: "Dianne Russell",
    country: "Canada",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "04",
    name: "Guy Hawkins",
    country: "Landon",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "05",
    name: "Kathryn Murphy",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "06",
    name: "Bessie Cooper",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "07",
    name: "Jacob Jones",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "08",
    name: "Albert Flores",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "09",
    name: "Leslie Alexander",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "10",
    name: "Kristin Watson",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "11",
    name: "Ronald Richards",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "12",
    name: "Eleanor Pena",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
  {
    id: "13",
    name: "Kathryn Murphy",
    country: "Bangladesh",
    company: "Kappa - Kappa Corporation",
    products: "Computer IT",
  },
];

export function SupplierList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, isFetching, error } = useGetAllSpplierQuery(null);

  // console.log(" supplier data", data);

  // Filter suppliers based on search query
  const filteredSuppliers = supplierData.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredSuppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSuppliers = filteredSuppliers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    const supplierLists = data?.users as User[];
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
              <FilterDropdowns />
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
                    />
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Show</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number.parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>from {totalItems}</span>
            </div>

            <div className="">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }).map(
                    (_, i) => {
                      let pageNumber: number;

                      // Logic to show correct page numbers with ellipsis
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNumber);
                              }}
                              isActive={currentPage === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        pageNumber === 2 ||
                        pageNumber === totalPages - 1
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      );
    }
  }

  return content;
}

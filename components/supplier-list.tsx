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
import { FilterDropdowns } from "./filter-dropdowns";

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

  return (
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
                <TableHead className="w-[60px]">SL.</TableHead>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Trade License</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.id}.</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.country}</TableCell>
                  <TableCell>{supplier.company}</TableCell>
                  <TableCell>
                    <Button variant="link" className="text-blue-500 p-0 h-auto">
                      <FileText className="h-4 w-4 mr-1" />
                      Image
                    </Button>
                  </TableCell>
                  <TableCell>{supplier.products}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t">
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
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
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
                } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

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

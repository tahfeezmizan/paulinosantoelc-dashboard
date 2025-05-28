"use client";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBuyersQuery } from "@/redux/api/buyerApi";
import { I_ErrorResponse, User } from "@/types/common";
import { Search } from "lucide-react";
import { useState } from "react";
import Pagination from "../pegination/pagination";
import BuyerTable from "./buyer-table";

// Define the buyers data type
interface Buyers {
  id: string;
  name: string;
  country: string;
  company: string;
  products: string;
}

export function BuyersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data, isLoading, isFetching, error, refetch } = useGetAllBuyersQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchQuery,
  });

  const buyerData = data?.data;
  // console.log(searchQuery, "searchQuery");

  const totalPages = buyerData?.metaData?.totalPage || 1;

  let content;

  if (isLoading || isFetching) {
    content = <p>Loading...</p>;
  }

  if (error) {
    // console.log(error);
    const err = error as I_ErrorResponse;
    <p>Error: {err.data.message}</p>;
  }

  if (!isLoading && !isFetching && !error) {
    const buyersList = data?.data?.users as User[];

    // Always render the search/filter section first
    content = (
      <div className="space-y-4">
        {/* Search and Filter */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Buyer List</h1>
            <p className="text-gray-500">View, manage Buyer List.</p>
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

        {/* Conditional rendering based on buyersList */}
        {buyersList?.length === 0 ? (
          <p>No Buyers Found</p>
        ) : (
          <>
            {/* buyers Table */}
            <div className="bg-white rounded-md border shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px] text-[#0F172A] font-semibold">
                        SL.
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Buyers Name
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
                      <TableHead className=" w-[80px] text-[#0F172A] font-semibold">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buyersList.map((buyers: User, index: number) => (
                      <BuyerTable
                        buyer={buyers}
                        key={buyers.id}
                        index={index}
                        refetch={refetch}
                      />
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
          </>
        )}
      </div>
    );
  }

  return content;
}

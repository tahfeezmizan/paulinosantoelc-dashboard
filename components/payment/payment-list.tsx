"use client";



import {
  // Pagination,
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllPaymentsQuery } from "@/redux/api/paymentsApi";
import { I_ErrorResponse, SubscriptionType, User } from "@/types/common";
import { useState } from "react";
import PaymentTable from "./payment-table";
import Pagination from "../pegination/pagination";

export function PaymentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetAllPaymentsQuery({
    page: currentPage,
  });

  const paymentData = data?.data;
  console.log("Payment", paymentData);

  const payments: SubscriptionType[] = data?.data?.users || [];

  const totalPages = data?.meta?.totalPage || 1;


  let content;

  if (error) {
    console.log(error);
    const err = error as I_ErrorResponse;
    content = (
      <div className="text-red-500 bg-red-100 py-10 px-5">
        <p>Error: {err?.data?.message}</p>
      </div>
    );
  }

  if (!isLoading && !isFetching && !error) {
    const paymentsLists = data?.data as SubscriptionType[];
    if (paymentsLists?.length === 0) {
      content = <p>No Payment Found</p>;
    } else {
      content = (
        <div className="space-y-6">
          {/* Payment History Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Payment History
              </h2>
            </div>

            {/* Payment Table */}
            <div className="bg-white rounded-md border shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px] text-[#0F172A] font-semibold">
                        SL.
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Name
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Payment Date
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Amount
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Subscription Plan
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Start Date
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        End Date
                      </TableHead>
                      <TableHead className="text-[#0F172A] font-semibold">
                        Duration
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {Array.isArray(paymentData) &&
                      paymentData.map(
                        (payment: SubscriptionType, index: number) => (
                          <PaymentTable
                            key={payment?.id || index}
                            payment={payment}
                            index={index + (currentPage - 1)}
                          />
                        )
                      )}
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
            {/* <div className="flex items-center justify-between px-4 py-4 border-t">
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
            </div> */}
          </div>
        </div>
      );
    }
  }

  return content;
}

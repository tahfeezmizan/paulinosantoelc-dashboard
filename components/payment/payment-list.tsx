"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllPaymentsQuery } from "@/redux/api/paymentsApi";
import { I_ErrorResponse, SubscriptionType } from "@/types/common";
import { useState } from "react";
import Pagination from "../pegination/pagination";
import PaymentTable from "./payment-table";

export function PaymentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetAllPaymentsQuery({
    page: currentPage,
  });

  const paymentData = data?.data;
  console.log("Payment", paymentData);

  const totalPages = data?.meta?.totalPage || 1;
  
  // const payments: SubscriptionType[] = data?.data?.users || [];


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
          </div>
        </div>
      );
    }
  }

  return content;
}

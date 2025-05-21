"use client";

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
import { useGetAllPaymentsQuery } from "@/redux/api/paymentsApi";
import { Search } from "lucide-react";
import { useState } from "react";

// Define the payment data type
interface Payment {
  id: string;
  date: string;
  buyer: string;
  country: string;
  company: string;
  type: string;
  plan: string;
  method: string;
}

// Sample payment data
const paymentData: Payment[] = [
  {
    id: "01",
    date: "25/02/2025",
    buyer: "Jenny Wilson",
    country: "USA",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "Monthly",
    method: "Paypal",
  },
  {
    id: "02",
    date: "25/02/2025",
    buyer: "Bessie Cooper",
    country: "Tajikistan",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "6 Month",
    method: "Paypal",
  },
  {
    id: "03",
    date: "25/02/2025",
    buyer: "Jane Cooper",
    country: "Greece",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "1 Year",
    method: "Paypal",
  },
  {
    id: "04",
    date: "25/02/2025",
    buyer: "Annette Black",
    country: "Central African",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "Monthly",
    method: "Paypal",
  },
  {
    id: "05",
    date: "25/02/2025",
    buyer: "Dianne Russell",
    country: "Russian",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "12 Month",
    method: "Paypal",
  },
  {
    id: "06",
    date: "25/02/2025",
    buyer: "Marvin McKinney",
    country: "Principe",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "8 Month",
    method: "Paypal",
  },
  {
    id: "07",
    date: "25/02/2025",
    buyer: "Jerome Bell",
    country: "Bahrain",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "6 Month",
    method: "Paypal",
  },
  {
    id: "08",
    date: "25/02/2025",
    buyer: "Arlene McCoy",
    country: "Viet Nam",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "Yearly",
    method: "Paypal",
  },
  {
    id: "09",
    date: "25/02/2025",
    buyer: "Guy Hawkins",
    country: "Monaco",
    company: "Kappa - Kappa Corporation",
    type: "Supplier",
    plan: "6 Month",
    method: "Paypal",
  },
];

export function PaymentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading } = useGetAllPaymentsQuery(null);

  console.log("All Payment", data);

  // Filter payments based on search query
  const filteredPayments = paymentData.filter(
    (payment) =>
      payment.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = 286; // Total number of payments (from the image)
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(0, itemsPerPage); // Using the sample data for display

  return (
    <div className="space-y-6">
      {/* Payment History Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-8 bg-white w-[200px] md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Payment Table */}
        <div className="bg-white rounded-md border shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">SL.</TableHead>
                  <TableHead>Buyer Name</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Subscription Plan</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}.</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.buyer}</TableCell>
                    <TableCell>{payment.country}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.plan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
        </div>
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
    </div>
  );
}

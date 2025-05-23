"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllPaymentsQuery } from "@/redux/api/paymentsApi";
import { DollarSign, Wallet } from "lucide-react";
import { useState } from "react";
export default function PaymentSummaryCards() {
  const { data, isLoading, isFetching, error } = useGetAllPaymentsQuery(null);
  console.log("Payments Card", data);

  // const totalAmount = data?.reduce((acc, payment) => acc + payment?.plan?.price, 0);
  // console.log("Total ",totalAmount)

  const [timeframe, setTimeframe] = useState("weekly");

  

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Payment List</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Weekly" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border rounded-lg overflow-hidden">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 mb-1">Total Amount</p>
              <h2 className="text-3xl font-bold">
                {/* ${totalAmount} */}$450
                <span className="text-xl">.25</span>
              </h2>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border rounded-lg overflow-hidden">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 mb-1">Supplier Amount</p>
              <h2 className="text-3xl font-bold">
                $564<span className="text-xl">.25</span>
              </h2>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border rounded-lg overflow-hidden">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 mb-1">Buyer Amount</p>
              <h2 className="text-3xl font-bold">
                $58,764<span className="text-xl">.25</span>
              </h2>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Wallet className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

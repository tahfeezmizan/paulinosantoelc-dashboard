"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAnalyticsQuery } from "@/redux/api/analyticsApi";
import { Package, ShieldCheck, Users } from "lucide-react";

export function StatsCards() {
  const { data } = useGetAnalyticsQuery({});
  const analytics = data?.data;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-[#dcf1ea] border-none rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Supplier
          </CardTitle>
          <Users className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.totalSupplier}</div>
        </CardContent>
      </Card>

      <Card className="bg-[#d9eef8] border-none rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Buyer
          </CardTitle>
          <Users className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.totalBuyer}</div>
        </CardContent>
      </Card>

      <Card className="bg-[#e0e7fa] border-none rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">
            Verify Pending
          </CardTitle>
          <ShieldCheck className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {analytics?.verifiedAccountRequests}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#f2e5e1] border-none rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Product
          </CardTitle>
          <Package className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics?.totalProduct}</div>
        </CardContent>
      </Card>
    </div>
  );
}

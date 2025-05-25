"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOverviewChartQuery } from "@/redux/api/analyticsApi";
import { OverviewDataType } from "@/types/common";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { label: "Sat", supplier: 200, buyer: 300 },
  { label: "Sun", supplier: 400, buyer: 350 },
  { label: "Mon", supplier: 800, buyer: 700 },
  { label: "Tue", supplier: 650, buyer: 600 },
  { label: "Wed", supplier: 700, buyer: 800 },
  { label: "Thu", supplier: 900, buyer: 850 },
  { label: "Fri", supplier: 1000, buyer: 700 },
];

export function OverviewChart() {
  const { data: OverviewData } = useOverviewChartQuery({});
  const analytics = OverviewData?.data;

  const chartData = analytics?.map((item: OverviewDataType) => ({
    label: item.label,
    supplier: item.Supplier,
    buyer: item.Buyer,
  }));

  console.log("chartData", chartData);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Supplier and buyer activity</CardDescription>
        </div>
        <Select defaultValue="weekly">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="supplier"
                stroke="#10b981"
                activeDot={{ r: 8 }}
                name="Supplier"
              />
              <Line
                type="monotone"
                dataKey="buyer"
                stroke="#0ea5e9"
                name="Buyer"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

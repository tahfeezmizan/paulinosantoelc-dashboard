"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Sat", supplier: 200, buyer: 300 },
  { name: "Sun", supplier: 400, buyer: 350 },
  { name: "Mon", supplier: 800, buyer: 700 },
  { name: "Tue", supplier: 650, buyer: 600 },
  { name: "Wed", supplier: 700, buyer: 800 },
  { name: "Thu", supplier: 900, buyer: 850 },
  { name: "Fri", supplier: 1000, buyer: 700 },
]

export function OverviewChart() {
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="supplier" stroke="#10b981" activeDot={{ r: 8 }} name="Supplier" />
              <Line type="monotone" dataKey="buyer" stroke="#0ea5e9" name="Buyer" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

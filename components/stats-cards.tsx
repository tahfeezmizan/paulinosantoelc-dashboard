import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShieldCheck, Package } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">Total Supplier</CardTitle>
          <Users className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,500</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">Total Buyer</CardTitle>
          <Users className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,500</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">Verify Pending</CardTitle>
          <ShieldCheck className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">35,00</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500">Total Product</CardTitle>
          <Package className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
        </CardContent>
      </Card>
    </div>
  )
}

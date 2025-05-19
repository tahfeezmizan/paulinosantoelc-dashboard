import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Supplier List</h1>
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>Manage your suppliers here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Supplier list content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BuyersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Buyer List</h1>
      <Card>
        <CardHeader>
          <CardTitle>Buyers</CardTitle>
          <CardDescription>Manage your buyers here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Buyer list content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

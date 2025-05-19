import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>Manage your payments here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Payment content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

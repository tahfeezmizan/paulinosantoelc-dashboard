import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Live Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
          <CardDescription>Manage customer support requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Support content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

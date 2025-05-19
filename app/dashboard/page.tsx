import { StatsCards } from "@/components/stats-cards"
import { OverviewChart } from "@/components/overview-chart"
import { VerificationTable } from "@/components/verification-table"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <OverviewChart />
      <VerificationTable />
    </div>
  )
}

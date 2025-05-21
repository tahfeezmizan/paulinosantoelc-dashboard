import { OverviewChart } from "@/components/overview-chart";
import { StatsCards } from "@/components/stats-cards";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <OverviewChart />
      {/* <VerificationList /> */}
    </div>
  );
}

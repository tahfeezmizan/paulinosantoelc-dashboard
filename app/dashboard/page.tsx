import { OverviewChart } from "@/components/overview-chart";
import { StatsCards } from "@/components/stats-cards";
import { VerificationList } from "@/components/verification/verification-list";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <OverviewChart />
      <VerificationList />
    </div>
  );
}

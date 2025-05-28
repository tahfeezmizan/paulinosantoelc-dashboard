import { OverviewChart } from "@/components/overview-chart";
import ProtectedRoute from "@/components/ProtectedRoute/protected-route";
import { StatsCards } from "@/components/stats-cards";
import { VerificationList } from "@/components/verification/verification-list";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <ProtectedRoute>
        <StatsCards />
        <OverviewChart />
        <VerificationList />
      </ProtectedRoute>
    </div>
  );
}

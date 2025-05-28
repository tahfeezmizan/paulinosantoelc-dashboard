import PaymentSummaryCards from "@/components/payment-summary-cards";
import { PaymentList } from "@/components/payment/payment-list";
import ProtectedRoute from "@/components/ProtectedRoute/protected-route";

export default function PaymentPage() {
  return (
    <div className="space-y-6">
      <ProtectedRoute>
        <PaymentSummaryCards />
        {/* <PaymentList /> */}
        <PaymentList />
      </ProtectedRoute>
    </div>
  );
}

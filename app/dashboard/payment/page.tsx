import PaymentSummaryCards from "@/components/payment-summary-cards";
import { PaymentList } from "@/components/payment/payment-list";

export default function PaymentPage() {
  return (
    <div className="space-y-6">
      <PaymentSummaryCards />
      {/* <PaymentList /> */}
      <PaymentList />
    </div>
  );
}

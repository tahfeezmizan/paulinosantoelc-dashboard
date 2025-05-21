import { PaymentList } from "@/components/payment/payment-list";
import PaymentSummaryCards from "@/components/payment-summary-cards";

export default function PaymentPage() {
  return (
    <div className="space-y-6">
      <PaymentSummaryCards /> 
      <PaymentList />
    </div>
  );
}

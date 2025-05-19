import { PaymentList } from "@/components/payment-list";
import PaymentSummaryCards from "@/components/payment-summary-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentPage() {
  return (
    <div className="space-y-6">
      <PaymentSummaryCards /> 
      <PaymentList />
    </div>
  );
}

import { BuyersList } from "@/components/buyer/buyersList";
import ProtectedRoute from "@/components/ProtectedRoute/protected-route";

export default function BuyersPage() {
  return (
    <div className="">
      <ProtectedRoute>
        <BuyersList />
      </ProtectedRoute>
    </div>
  );
}

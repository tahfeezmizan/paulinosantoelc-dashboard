import ProtectedRoute from "@/components/ProtectedRoute/protected-route";
import { SupplierList } from "@/components/supplier/supplier-list";

export default function SuppliersPage() {
  return (
    <div className="">
      <ProtectedRoute>
        <SupplierList />
      </ProtectedRoute>
    </div>
  );
}

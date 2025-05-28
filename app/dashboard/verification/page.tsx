import ProtectedRoute from "@/components/ProtectedRoute/protected-route";
import { VerificationList } from "@/components/verification/verification-list";

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <ProtectedRoute>
        <h1 className="text-2xl font-bold">Verification</h1>
        <VerificationList />
      </ProtectedRoute>
    </div>
  );
}

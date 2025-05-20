import EmptyState from "@/components/ui/empty-state";
import { Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white rounded-2xl h-full">
      <EmptyState
        icon={<Mail className="h-12 w-12 text-gray-300" />}
        title="No new messages"
        description="You've read them all!"
      />
    </main>
  );
}

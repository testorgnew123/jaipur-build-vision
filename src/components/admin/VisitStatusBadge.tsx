import { Badge } from "@/components/ui/badge";

type Status = "pending" | "confirmed" | "completed" | "cancelled";

const CONFIG: Record<Status, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800 border-blue-200" },
  completed: { label: "Completed", className: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 border-red-200" },
};

export function VisitStatusBadge({ status }: { status: string }) {
  const config = CONFIG[status as Status] ?? { label: status, className: "" };
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

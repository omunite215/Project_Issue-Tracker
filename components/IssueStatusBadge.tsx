import { Status } from "@prisma/client";
import { Badge } from "./ui/badge";

const statusMap: Record<
  Status,
  {
    label: string;
    variant:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | null
      | undefined;
  }
> = {
  OPEN: { label: "Open", variant: "destructive" },
  IN_PROGRESS: { label: "In Progress", variant: "secondary" },
  CLOSED: { label: "Closed", variant: "default" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;

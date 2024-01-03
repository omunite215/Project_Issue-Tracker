import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import NextLink from "next/link";

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.label} className={column.className}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
                className="flex items-center"
              >
                {column.label}
                {column.value === searchParams.orderBy && (
                  <div className="ml-2 w-2 h-2 animate-pulse delay-300 bg-blue-600 rounded-full" />
                )}
              </NextLink>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className=" font-medium">
              <Button variant="link">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Button>
            </TableCell>
            <TableCell>
              <IssueStatusBadge status={issue.status} />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;

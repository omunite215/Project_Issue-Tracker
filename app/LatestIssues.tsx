import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/prisma/client";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Issues</CardTitle>
        <CardDescription>Track the Latest Issues.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start gap-2">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                    {issue.assignedToUser && (
                      <Avatar>
                        <AvatarImage src={issue.assignedToUser.image!} />
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestIssues;

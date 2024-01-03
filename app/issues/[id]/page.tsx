import IssueStatusBadge from "@/components/IssueStatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import prisma from "@/prisma/client";
import { cache } from "react";

type Props = {
  params: {
    id: string;
  };
};

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(parseInt(params.id));
  if (!issue) notFound();

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between flex-row">
          <div>
            <CardTitle>{issue.title}</CardTitle>
            <div className="flex gap-3 mt-2 items-center">
              <IssueStatusBadge status={issue.status} />
              <CardDescription className="Text">
                {issue.createdAt.toDateString()}
              </CardDescription>
            </div>
          </div>
          {session && (
            <div className="sm:flex hidden gap-2 items-center">
              <AssigneeSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </div>
          )}
        </CardHeader>
        <Separator />
        <CardContent className="prose">
          <ReactMarkdown className="Text my-2">
            {issue.description}
          </ReactMarkdown>
        </CardContent>
      </Card>
      {session && (
        <div className="sm:hidden flex flex-col gap-2 mt-2">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      )}
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title + " Details",
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;

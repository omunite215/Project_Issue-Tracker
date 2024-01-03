import { Status } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NextLink from "next/link";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In-Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <div className="flex gap-4">
      {containers.map((container) => (
        <Card key={container.label}>
          <CardHeader>
            <CardDescription>
              <NextLink href={`/issues/list?status=${container.status}`}>
                {container.label}
              </NextLink>
            </CardDescription>
            <CardTitle>
              <p className=" text-xl font-bold">{container.value}</p>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;

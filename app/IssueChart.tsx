"use client";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open, fill: "#2563eb" },
    { label: "In-Progress", value: inProgress, fill: "#64748b" },
    { label: "Closed", value: closed, fill: "#ef4444" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All New Issue Tracker</CardTitle>
        <CardDescription>
          Here is the summary of your Project Issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" barSize={60} fill="fill" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IssueChart;

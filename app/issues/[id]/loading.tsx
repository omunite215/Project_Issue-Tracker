import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LoadingIssueDetailPage = () => {
  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-[4rem] h-5" />
          </CardTitle>
          <div className="flex gap-3 mt-1">
            <Skeleton className="w-[5rem] h-5" />
            <Skeleton className="w-[8rem] h-5" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="prose my-2">
          <Skeleton className="w-[100%] h-8" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;

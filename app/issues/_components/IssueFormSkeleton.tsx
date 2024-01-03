import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton className="h-[2rem] w-full" />
      <Skeleton className="h-[20rem] w-full mt-3" />
    </div>
  );
};

export default IssueFormSkeleton;

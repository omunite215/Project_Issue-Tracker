import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button>
        <FileEdit />
        &nbsp;Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;

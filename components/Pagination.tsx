"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <div className="flex items-center gap-2">
      <p className="text-base text-primary font-medium">
        Page {currentPage} of {pageCount}
      </p>
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="secondary"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => changePage(pageCount)}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;

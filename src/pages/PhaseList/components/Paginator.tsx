import { composite } from "@/util";
import { useMemo, useState } from "react";
import classes from "./Paginator.module.css";

interface PaginatorProps {
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export default function Paginator({ currentPage, totalItems, onPageChange }: PaginatorProps) {
  const [page, setPage] = useState(currentPage ?? 1);
  const [pageSize, setPageSize] = useState(50);
  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

  return <div className={composite(classes, "paginator-container")}></div>;
}

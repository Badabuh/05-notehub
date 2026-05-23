import ReactPaginateImport from "react-paginate";
import type { ComponentType } from "react";
import css from "./Pagination.module.css";

type ReactPaginateComponentProps = {
  nextLabel: string;
  onPageChange: ({ selected }: { selected: number }) => void;
  pageRangeDisplayed: number;
  pageCount: number;
  previousLabel: string;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  renderOnZeroPageCount: null;
};

const ReactPaginate =
  (
    ReactPaginateImport as unknown as {
      default?: ComponentType<ReactPaginateComponentProps>;
    }
  ).default ??
  (ReactPaginateImport as unknown as ComponentType<ReactPaginateComponentProps>);

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      forcePage={Math.max(currentPage - 1, 0)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
}

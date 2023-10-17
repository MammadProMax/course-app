"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
   SortingState,
   ColumnDef,
   ColumnFiltersState,
   flexRender,
   getCoreRowModel,
   useReactTable,
   getPaginationRowModel,
   getSortedRowModel,
   getFilteredRowModel,
   PaginationState,
} from "@tanstack/react-table";

import { PlusCircle } from "lucide-react";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import TablePagination from "./TablePagination";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   pageSize?: number;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   pageSize: _pageSizeProp,
}: DataTableProps<TData, TValue>) {
   const params = useSearchParams();

   const indexPageParam = params.get("indexPage") ?? 1;
   const indexPage = +indexPageParam - 1;

   // sorting
   const [sorting, setSorting] = React.useState<SortingState>([]);

   // pagination
   const [{ pageIndex, pageSize }, setPagination] =
      React.useState<PaginationState>({
         pageIndex: indexPage,
         pageSize: _pageSizeProp || 10,
      });
   const pagination = React.useMemo(
      () => ({ pageIndex, pageSize }),
      [pageIndex, pageSize]
   );

   // filtering
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );

   // table hook
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),

      state: {
         sorting,
         pagination: pagination,
         columnFilters,
      },
   });

   const handlePageIndex = (index: number) => {
      setPagination((state) => ({ ...state, pageIndex: index }));
   };
   return (
      <>
         <div className="flex items-center justify-between py-4">
            <Input
               placeholder="Filter titles..."
               value={
                  (table.getColumn("title")?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
            <Button>
               <Link
                  href="/teacher/create"
                  className="flex items-center gap-x-2"
               >
                  <span className="sr-only">New Course</span>
                  <PlusCircle className="w-5 h-5" />
                  Add Course
               </Link>
            </Button>
         </div>
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead className="p-2" key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell className="px-6" key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className={cn("py-4", table.getPageCount() === 1 && "hidden")}>
            <TablePagination
               className="ml-2"
               currentPage={pageIndex}
               onChange={handlePageIndex}
               pageCount={table.getPageCount()}
               activePageVariants="default"
            />
         </div>
      </>
   );
}

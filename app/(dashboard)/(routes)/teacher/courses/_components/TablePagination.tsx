"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import ReactPaginate from "react-paginate";
import { cn } from "@/lib/utils";

type BtnVariant = {
   size?: "sm" | "lg";
   variant?: "outline" | "default";
};
type PaginationProps = {
   className?: string;
   currentPage: number;
   pageCount: number;
   onChange: (index: number) => void;
   pageLinkVariants?: BtnVariant;
   preNextVariants?: BtnVariant;
   activePageVariants?: "default" | "outline" | "secondary" | "destructive";
};

export default function TablePagination({
   currentPage,
   onChange,
   pageCount,
   pageLinkVariants,
   preNextVariants,
   className,
   activePageVariants,
}: PaginationProps) {
   // Invoke when user click to request another page.
   const handlePageClick = (event: { selected: number }) => {
      onChange(event.selected);
   };

   //layout
   const changePage = (text: string) => (
      <Button
         variant={preNextVariants?.variant || "outline"}
         size={preNextVariants?.size || "sm"}
      >
         {text}
      </Button>
   );
   return (
      <ReactPaginate
         pageCount={pageCount}
         breakLabel="..."
         nextLabel={changePage("Next")}
         previousLabel={changePage("Previous")}
         onPageChange={handlePageClick}
         pageRangeDisplayed={5}
         renderOnZeroPageCount={null}
         forcePage={currentPage}
         className={cn("flex items-center gap-x-2", className)}
         pageLinkClassName={cn(
            buttonVariants({
               variant: pageLinkVariants?.variant || "outline",
               size: pageLinkVariants?.size || "sm",
            })
         )}
         activeLinkClassName={cn(
            buttonVariants({ variant: activePageVariants || "outline" }),
            activePageVariants === "default" && "hover:text-white"
         )}
      />
   );
}

"use client";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@prisma/client";

import { ArrowUpDown, MoreHorizontal, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FreeCourse extends Omit<Course, "price"> {
   price: string;
}

export const columns: ColumnDef<FreeCourse | Course>[] = [
   {
      accessorKey: "title",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
               className={cn(
                  column.getIsSorted() && "font-semibold text-sky-600"
               )}
            >
               Title
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: "price",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
               className={cn(
                  column.getIsSorted() && "font-semibold text-sky-600"
               )}
            >
               Price
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => {
         const value = row.original.price || "Free";
         const formatted =
            value === "Free"
               ? "FREE"
               : Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                 }).format(parseInt(value as string));

         return formatted;
      },
   },
   {
      accessorKey: "isPublished",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
               className={cn(
                  column.getIsSorted() && "font-semibold text-sky-600"
               )}
            >
               Published
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => {
         const isPublished = row.getValue("isPublished") || false;
         return (
            <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
               {isPublished ? "Published" : "Draft"}
            </Badge>
         );
      },
   },
   {
      id: "actions",

      cell: ({ row }) => {
         const { id } = row.original;
         return (
            <DropdownMenu>
               <Button asChild variant="ghost">
                  <DropdownMenuTrigger>
                     <span className="sr-only">Open menu</span>
                     <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
               </Button>
               <DropdownMenuContent>
                  <Link href={`/teacher/courses/${id}`}>
                     <DropdownMenuItem>
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit
                     </DropdownMenuItem>
                  </Link>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
];

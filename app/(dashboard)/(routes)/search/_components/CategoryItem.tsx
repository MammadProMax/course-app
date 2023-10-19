"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";

import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

type Props = {
   label: string;
   icon: IconType;
   value: string;
};

export const CategoryItem = ({ icon: Icon, label, value }: Props) => {
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const currentCategoryId = searchParams.get("categoryId");
   const currentTitle = searchParams.get("title");

   const isSelected = currentCategoryId === value;

   const url = qs.stringifyUrl(
      {
         url: pathname,
         query: {
            title: currentTitle,
            categoryId: isSelected ? null : value,
         },
      },
      { skipNull: true, skipEmptyString: true }
   );

   return (
      <Link
         href={url}
         className={cn(
            "py-2 px-3 text-sm border border-slate-200 rounded-full flex gap-x-2 items-center hover:border-sky-700 transition font-medium",
            isSelected && "border-sky-700 bg-sky-200/20 text-sky-800" // TODO add Active style
         )}
      >
         <Icon size={20} />
         <div className="truncate">{label}</div>
      </Link>
   );
};

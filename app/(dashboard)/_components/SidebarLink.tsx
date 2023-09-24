"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
   Icon: LucideIcon;
   href: string;
   label: string;
};

const SidebarLink = ({ Icon, href, label }: Props) => {
   const pathname = usePathname();
   const isActive =
      (pathname === "/" && href === "/") ||
      pathname === href ||
      pathname.startsWith(`/${href}`);

   return (
      <Link
         href={href}
         className={cn(
            "text-slate-500 font-medium text-sm px-6 py-3 hover:bg-slate-100",
            isActive &&
               "text-sky-700 border-r-[3.5px] border-r-sky-700 bg-sky-200/20 hover:"
         )}
      >
         <Icon size={22} className="inline mr-2" />
         {label}
      </Link>
   );
};

export default SidebarLink;

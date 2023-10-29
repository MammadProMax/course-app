"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserProgress } from "@prisma/client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
   chapterId: string;
   courseId: string;
   title: string;
   isCompleted: boolean;
   isLocked: boolean;
};

export default function SidebarChapterItem({
   chapterId,
   isCompleted,
   isLocked,
   title,
   courseId,
}: Props) {
   // hooks
   const pathname = usePathname();

   const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
   const isActive = pathname.includes(chapterId);
   const url = `/courses/${courseId}/chapters/${chapterId}`;

   return (
      <Link
         href={url}
         className={cn(
            "flex items-center text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate300/20",
            isActive &&
               "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
            isCompleted && "text-emerald-700 hover:text-emerald-700",
            isActive && isCompleted && "bg-emerald-200/20"
         )}
      >
         <div className="px-2 py-4 w-full flex items-center gap-x-3 ">
            <Icon
               size={22}
               className={cn(
                  "text-slate-500",
                  isActive && "text-slate-700",
                  isCompleted && "text-emerald-700"
               )}
            />
            {title}
         </div>
         <div
            className={cn(
               "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
               isCompleted && "border-emerald-700",
               isActive && "opacity-100"
            )}
         ></div>
      </Link>
   );
}

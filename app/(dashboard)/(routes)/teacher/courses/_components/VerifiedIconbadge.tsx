import React from "react";
import { cn } from "@/lib/utils";
import { Verified } from "lucide-react";

const VerifiedIconbadge = ({
   title,
   Valid,
}: {
   title: string;
   Valid: boolean;
}) => {
   return (
      <div className="flex items-center gap-x-2">
         <h6 className="peer text-sm md:text-base line-clamp-1">{title}</h6>
         <div className="absolute bg-slate-600 text-white px-3 py-1 rounded-lg top-0 opacity-0 peer-hover:opacity-100 peer-hover:-translate-y-0.5 transition-all duration-300 after:bg-inherit after:w-2 after:h-3 after:absolute after:left-8 after:rounded-lg after:-bottom-1 z-10">
            {!Valid ? (
               <p className="text-[0.6rem]">Completed</p>
            ) : (
               <p className="text-xs">Incomplete</p>
            )}
         </div>
         <Verified
            className={cn(
               "text-sky-500 w-3.5 h-3.5 md:w-4 md:h-4",
               Valid && "text-gray-400"
            )}
         />
      </div>
   );
};

export default VerifiedIconbadge;

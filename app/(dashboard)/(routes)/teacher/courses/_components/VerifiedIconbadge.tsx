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
         <h6 className="text-sm md:text-base line-clamp-1">{title}</h6>
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

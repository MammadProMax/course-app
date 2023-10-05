import React from "react";
import { cn } from "@/lib/utils";
import { Verified } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
         <Verified
            className={cn(
               "text-sky-500 w-3.5 h-3.5 md:w-4 md:h-4",
               Valid && "text-gray-400"
            )}
         />
         <div className="opacity-0 transition-all duration-500 ease-out peer-hover:opacity-100 peer-hover:translate-x-1">
            {!Valid ? (
               <Badge variant="default">Completed</Badge>
            ) : (
               <Badge variant="destructive">Incomplete</Badge>
            )}
         </div>
      </div>
   );
};

export default VerifiedIconbadge;

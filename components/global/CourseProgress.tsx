import React from "react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
type CourseProgressProps = {
   variant?: "default" | "success";
   size?: "default" | "sm";
   className?: string;
   value: number;
};

const colorByVariant = {
   default: "text-sky-700",
   success: "text-emerald-700",
};

const sizeByVariant = {
   default: "text-sm",
   sm: "text-xs",
};

export default function CourseProgress({
   value,
   variant,
   size,
   className,
}: CourseProgressProps) {
   return (
      <div>
         <Progress
            value={value}
            variant={variant}
            className={cn("h-2", className)}
         />
         <p
            className={cn(
               "font-medium mt-2 text-sky-700",
               colorByVariant[variant || "default"],
               sizeByVariant[size || "default"]
            )}
         >
            {Math.round(value)}% Complete
         </p>
      </div>
   );
}

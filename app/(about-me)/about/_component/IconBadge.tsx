import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

export type IconBadgeProps = {
   icon: IconType;
   label: string;
   className: string;
};

export default function IconBadge({
   icon: Icon,
   label,
   className,
}: IconBadgeProps) {
   return (
      <Card className="flex flex-row items-center w-fit sm:w-36 px-2 py-1">
         <Icon className={cn("w-9 h-9 mr-2", className)} />
         <span className="hidden sm:inline-block">{label}</span>
      </Card>
   );
}

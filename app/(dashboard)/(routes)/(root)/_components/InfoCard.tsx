import React from "react";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/global/IconBadge";
type InfoCardProps = {
   icon: LucideIcon;
   label: string;
   numberOfItems: number;
   variant?: "default" | "succuss";
};

export default function InfoCard({
   icon,
   label,
   numberOfItems,
   variant,
}: InfoCardProps) {
   return (
      <div className="border rounded-md flex items-center gap-x-2 p-3">
         <IconBadge icon={icon} bgVariant={variant || "default"} />
         <div>
            <p className="font-medium ">{label}</p>
            <p className="text-sm text-gray-500">{numberOfItems}</p>
         </div>
      </div>
   );
}

import React from "react";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

type ProfileBadgeProps = {
   icon: IconType | LucideIcon;
   label: string;
   description: string;
};

export default function ProfileBadge({
   description,
   icon: Icon,
   label,
}: ProfileBadgeProps) {
   return (
      <div className="flex items-center justify-center w-full p-2 gap-x-2">
         <div>
            <div className="border bg-slate-800 text-white rounded-lg hover:bg-slate-100 hover:text-slate-800 hover:border-slate-800 transition">
               <Icon className="p-2 w-8 h-8" />
            </div>
         </div>
         <div className="flex-1">
            <h6 className="text-slate-500 text-sm">{label}</h6>
            <p className="font-semibold text-base">{description}</p>
         </div>
      </div>
   );
}

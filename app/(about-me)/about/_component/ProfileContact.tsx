import React from "react";
import ProfileBadge from "./ProfileBadge";
import { Separator } from "@/components/ui/separator";
import { profileBadgeList } from "../_constants";

export default function ProfileContact() {
   const content = profileBadgeList.map((badge, index) => (
      <div
         key={index}
         className="flex flex-col items-center justify-center w-full py-2 px-5"
      >
         <div className="w-full">
            <ProfileBadge
               description={badge.description}
               icon={badge.icon}
               label={badge.label}
            />
            {index !== 3 && <Separator />}
         </div>
      </div>
   ));
   return content;
}

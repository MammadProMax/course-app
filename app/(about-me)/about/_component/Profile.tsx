import React from "react";
import Image from "next/image";

import { IconType } from "react-icons";
import { BsTelegram } from "react-icons/bs";
import {
   LucideIcon,
   MapPin,
   MailOpen,
   CalendarDays,
   PhoneCall,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfileBadge from "./ProfileBadge";

const profileBadgeList: {
   icon: IconType | LucideIcon;
   label: string;
   description: string;
}[] = [
   {
      icon: PhoneCall,
      description: "+98 9363290367",
      label: "Phone",
   },
   {
      icon: MapPin,
      description: "Tehran Iran",
      label: "Location",
   },
   {
      icon: MailOpen,
      description: "mhaagrm2@gmail.com",
      label: "Email",
   },
   {
      icon: CalendarDays,
      description: "18 January, 2002",
      label: "Birth",
   },
];

export default function Profile() {
   return (
      <Card className="flex flex-col items-center relative top-36">
         <Image
            src="/profile.jpg"
            width={240}
            height={240}
            alt="profile picture"
            className="absolute -top-36 rounded-md shadow-md border border-slate-700/30"
         />
         <h1 className="text-2xl font-semibold py-3 mt-24">Mohammad Khalili</h1>
         <div className="px-4 py-2 rounded-md text-base bg-slate-100">
            Web Develper
         </div>
         <div className="flex items-center justify-center w-full gap-x-4 py-4">
            <Button asChild variant="secondary" size="sm">
               <a href="https://www.t.me/mo1nammad" target="_blank">
                  <BsTelegram className="w-5 h-5" />
               </a>
            </Button>
         </div>
         <div className="w-[86%]">
            <div className="flex flex-col items-center justify-center w-full py-2 px-5 bg-slate-100 rounded-lg mb-8">
               {profileBadgeList.map((badge, index) => (
                  <div key={index} className="w-full">
                     <ProfileBadge
                        description={badge.description}
                        icon={badge.icon}
                        label={badge.label}
                     />
                     {index !== 3 && <Separator />}
                  </div>
               ))}
            </div>
         </div>
      </Card>
   );
}

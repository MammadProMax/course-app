import React from "react";
import Image from "next/image";

import { BsTelegram } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfileContact from "./ProfileContact";

export default function Profile() {
   return (
      <Card className="flex flex-col items-center relative top-36 py-6">
         <Image
            src="/profile.jpg"
            width={240}
            height={240}
            alt="profile picture"
            className="absolute -top-32 rounded-md shadow-md border border-slate-700/30"
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
         <div className="w-[86%] bg-slate-100 rounded-lg">
            <ProfileContact />
         </div>
      </Card>
   );
}

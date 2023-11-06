import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export type ExperienceColItem = {
   Date: string;
   title: string;
   description: string;
   etc?: {
      link: string;
      title: string;
   };
};
type ExperienceColProps = {
   icon: LucideIcon;
   header: string;
   list: ExperienceColItem[];
};

export default function ExperienceCol({
   header,
   list,
   icon: Icon,
}: ExperienceColProps) {
   return (
      <div className="w-full">
         <div className="flex items-center gap-1 px-2 mb-4">
            <Icon className="text-slate-700 w-6 h-6" />
            <h2 className="text-xl font-medium">{header}</h2>
         </div>
         <div className="flex flex-col w-full">
            {list.map((item, index) => (
               <Card key={index} className="bg-slate-100 px-2">
                  <div className="text-sm font-normal text-slate-500 px-6 pt-2">
                     {item.Date}
                  </div>
                  <CardHeader className="font-medium text-lg py-2">
                     {item.title}
                  </CardHeader>
                  <CardFooter className="text-base text-slate-600 block">
                     {item.description}
                     {!!item.etc && (
                        <Link
                           className="text-slate-900 font-normal ml-1 underline"
                           href={item.etc.link}
                        >
                           {item.etc.title}
                        </Link>
                     )}
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
}

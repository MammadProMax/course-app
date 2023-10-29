import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import CourseSidebar from "./CourseSidebar";

type SidebarProps = {
   course: Course & {
      chapters: (Chapter & {
         userProgress: UserProgress[] | null;
      })[];
   };
   progressCount: number;
};

export default function CourseMobileSidebar({
   course,
   progressCount,
}: SidebarProps) {
   return (
      <Sheet>
         <Button
            className="block md:hidden hover:opacity-75 transition"
            asChild
            variant={"ghost"}
         >
            <SheetTrigger>
               <Menu className="w-6 h-6" />
            </SheetTrigger>
         </Button>
         <SheetContent side="left" className="p-0 bg-white w-72 border-r-0">
            <CourseSidebar course={course} progress={progressCount} />
         </SheetContent>
      </Sheet>
   );
}

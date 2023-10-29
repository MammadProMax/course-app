import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import NavbarRoutes from "@/components/global/NavbarRoutes";
import CourseMobileSidebar from "./CourseMobileSidebar";

type NavbarProps = {
   course: Course & {
      chapters: (Chapter & {
         userProgress: UserProgress[] | null;
      })[];
   };

   progressCount: number;
};

export default function CourseNavbar({ course, progressCount }: NavbarProps) {
   return (
      <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
         <CourseMobileSidebar course={course} progressCount={progressCount} />

         <NavbarRoutes />
      </div>
   );
}

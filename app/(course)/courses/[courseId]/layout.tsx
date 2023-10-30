import React from "react";
import { notFound, redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { CourseWithPublishedChapsProgressed as getCourse } from "@/fetchers/getCourseFromDB";
import getProgress from "@/fetchers/getUserProgressFromDb";

import CourseSidebar from "./_components/CourseSidebar";
import CourseNavbar from "./_components/CourseNavbar";

type Props = {
   params: {
      courseId: string;
   };
   children: React.ReactNode;
};

export default async function CourseLayout({ children, params }: Props) {
   const { userId } = auth();
   if (!userId) return redirect("/");

   const course = await getCourse(params.courseId);
   if (!course) return notFound();

   const progressCount = await getProgress(userId, params.courseId);

   return (
      <main className="h-full">
         <div className="h-[80px] md:pl-80 inset-y-0 w-full z-50 sticky">
            <CourseNavbar course={course} progressCount={progressCount} />
         </div>
         <div className="hidden md:flex w-80 flex-col inset-y-0 z-50 fixed">
            <CourseSidebar course={course} progress={progressCount} />
         </div>
         <section className="md:pl-80 h-[90%]">{children}</section>
      </main>
   );
}

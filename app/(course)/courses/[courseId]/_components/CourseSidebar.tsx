import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import getCoursePurchase from "@/fetchers/getCoursePurchase";
import SidebarChapterItem from "./SidebarChapterItem";

type Props = {
   course: Course & {
      chapters: (Chapter & {
         userProgress: UserProgress[] | null;
      })[];
   };
   progress: number;
};

export default async function CourseSidebar({ course, progress }: Props) {
   const purchase = await getCoursePurchase(course.id);
   return (
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
         <div className="p-7 flex flex-col border-b">
            <h1 className="font-semibold">{course.title}</h1>
            {/* check purchase or add progeress */}
         </div>
         <div className="flex flex-col w-full">
            {course.chapters.map((chapter) => (
               <SidebarChapterItem
                  key={chapter.id}
                  chapterId={chapter.id}
                  courseId={course.id}
                  isLocked={!chapter.isFree || !purchase}
                  isCompleted={!!chapter.userProgress?.[0]?.isComplete}
                  title={chapter.title}
               />
            ))}
         </div>
      </div>
   );
}

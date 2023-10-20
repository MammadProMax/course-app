import React from "react";

import type { CourseWithProgressWithCategory } from "@/fetchers/getPublishedProgressedCourses";

import CourseCard from "./CourseCard";

type Props = {
   items: CourseWithProgressWithCategory[];
};

export default function CourseList({ items }: Props) {
   return (
      <div>
         <div className="my-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item) => (
               <CourseCard key={item.id} course={item} />
            ))}
         </div>

         {items.length === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-10">
               No courses found
            </div>
         )}
      </div>
   );
}

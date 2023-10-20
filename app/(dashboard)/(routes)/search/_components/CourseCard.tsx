import React from "react";
import Link from "next/link";
import Image from "next/image";

import type { CourseWithProgressWithCategory } from "@/fetchers/getPublishedProgressedCourses";
import { formatPrice } from "@/lib/formatPrice";

import { IconBadge } from "@/components/global/IconBadge";
import { BookOpen } from "lucide-react";

type Props = {
   course: CourseWithProgressWithCategory;
};

export default function CourseCard({ course }: Props) {
   return (
      <Link href={`/courses/${course.id}`}>
         <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
               <Image
                  src={course.imageUrl!} // is required to get published
                  alt="course thumbnail"
                  fill
                  className="object-cover"
               />
            </div>
            <div className="flex flex-col pt-2 ">
               <h5
                  className="text-lg md:text-base font-medium group-hover:text-sky-700 transition'
                line-clamp-2"
               >
                  {course.title}
               </h5>
               <p className="text-xs text-muted-foreground">
                  {course.category?.name}
               </p>
               <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs font-medium">
                  <div className="flex items-center gap-x-1 text-slate-500">
                     <IconBadge icon={BookOpen} bgSize="sm" iconSize="sm" />
                     <div className="flex space-x-1 ">
                        <span>{course.chapters.length}</span>
                        <span>
                           {course.chapters.length === 1
                              ? "Chapter"
                              : "Chapters"}
                        </span>
                     </div>
                  </div>
               </div>
               {course.progress !== null ? (
                  <div>TODO:progeressCompnent</div>
               ) : (
                  <p className="text-md md:text-sm font-medium text-slate-700">
                     {course.price ? formatPrice(course.price) : "FREE"}
                  </p>
               )}
            </div>
         </div>
      </Link>
   );
}

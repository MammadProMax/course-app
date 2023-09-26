import React from "react";
import { notFound, redirect } from "next/navigation";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import getCourse from "@/fetchers/getCourseFromDB";

import { IconBadge } from "@/components/global/IconBadge";
import { LayoutDashboard } from "lucide-react";

import TitleForm from "../_components/TitleForm";
import DescriptionForm from "../_components/DescriptionForm";

type Props = {
   params: {
      courseId: string;
   };
};

const CoursePage = async ({ params: { courseId } }: Props) => {
   try {
      const course = await getCourse(courseId);
      if (!course) return redirect("/");

      const requiredFields = [
         course.title,
         course.description,
         course.imageUrl,
         course.price,
         course.catgoryId,
      ];

      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;

      const completionText = `(${completedFields} of ${totalFields})`;

      //   render

      return (
         <div className="p-6">
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-y-2">
                  <h1 className="text-2xl font font-medium">Course setup</h1>
                  <span className="text-sm text-slate-700">
                     Complete all fields {completionText}
                  </span>
               </div>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
               <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize your course</h2>
               </div>
               <TitleForm courseId={courseId} initialData={course} />
               <DescriptionForm courseId={courseId} initialData={course} />
            </div>
         </div>
      );

      //
   } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         if (error.code === "P2023") {
            // it means that the id that we requested to database does not valid so there is no such an id in db
            notFound();
         }
      }
   }
};

export default CoursePage;

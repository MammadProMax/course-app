import React from "react";
import { notFound } from "next/navigation";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import getCourse from "@/fetchers/getCourseFromDB";

import { IconBadge } from "@/components/global/IconBadge";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";

import TitleForm from "../_components/TitleForm";
import DescriptionForm from "../_components/DescriptionForm";
import ImageForm from "../_components/ImageForm";
import CategoryForm from "../_components/CategoryForm";
import getCategories from "@/fetchers/getCategoriesFromDB";
import PriceForm from "../_components/PriceForm";

type Props = {
   params: {
      courseId: string;
   };
};

const CoursePage = async ({ params: { courseId } }: Props) => {
   try {
      const course = await getCourse(courseId);
      if (!course) return notFound();

      const categories = await getCategories();

      const requiredFields = [
         course.title,
         course.description,
         course.imageUrl,
         course.price,
         course.categoryId,
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

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-9">
               <div className="col-span-1 flex flex-col gap-y-6">
                  <div className="flex items-center gap-x-2 mt-3">
                     <IconBadge icon={LayoutDashboard} />
                     <h2 className="text-xl">Customize your course</h2>
                  </div>
                  <TitleForm
                     courseId={courseId}
                     initialData={{ title: course.title }}
                  />

                  <DescriptionForm
                     courseId={courseId}
                     initialData={{ description: course.description }}
                  />
                  <CategoryForm
                     courseId={course.id}
                     initialData={{ categoryId: course.categoryId }}
                     options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                     }))}
                  />
                  <ImageForm
                     courseId={courseId}
                     initialData={{ imageUrl: course.imageUrl }}
                  />
               </div>
               <div className="col-span-1 flex flex-col gap-y-6">
                  <div className="flex items-center gap-x-2 mt-3">
                     <IconBadge icon={ListChecks} />
                     <h2 className="text-xl">Course chapters</h2>
                  </div>
                  <div>Todo : Chapters</div>
                  <div className="flex items-center gap-x-2 mt-3">
                     <IconBadge icon={CircleDollarSign} />
                     <h3 className="text-xl">sell your courses</h3>
                  </div>
                  <PriceForm
                     courseId={courseId}
                     initialData={{ price: course.price }}
                  />
               </div>
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

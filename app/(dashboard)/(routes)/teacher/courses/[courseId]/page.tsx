import React from "react";
import { notFound, redirect } from "next/navigation";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import getCourse from "@/fetchers/getCourseFromDB";
import getCategories from "@/fetchers/getAllCategoriesFromDb";
import { auth } from "@clerk/nextjs";

import { IconBadge } from "@/components/global/IconBadge";
import {
   CircleDollarSign,
   File,
   LayoutDashboard,
   ListChecks,
} from "lucide-react";

import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentsForm from "./_components/AttachmentsForm";
import ChapterForm from "./_components/ChaptersForm";
import Banner from "@/components/global/Banner";
import CourseActions from "./_components/CourseActions";

type Props = {
   params: {
      courseId: string;
   };
};

const CoursePage = async ({ params: { courseId } }: Props) => {
   try {
      const { userId } = auth();
      const course = await getCourse(courseId);

      if (!course) return notFound();
      if (userId !== course.userId) return redirect("/teacher/courses");

      const categories = await getCategories();

      const requiredFields = [
         course.title,
         course.description,
         course.imageUrl,
         course.categoryId,
      ];

      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;

      const completionText = `(${completedFields} of ${totalFields})`;
      const isComplete = requiredFields.every(Boolean);
      const hasPublishedChapter = course.chapters.some(
         (chapter) => chapter.isPublished
      );
      //   render

      return (
         <>
            {!course.isPublished ? (
               <Banner
                  iconSize="md"
                  label={
                     <div className="flex flex-col content-start ml-1">
                        <p className="font-semibold">
                           this course is unpublished and is not visable to
                           users
                        </p>
                        <p className="w-fit text-xs text-gray-600">
                           At least one chapter must be published
                        </p>
                     </div>
                  }
                  className="px-8"
               />
            ) : (
               <Banner
                  label="this course is published and is visable to users"
                  className="px-8"
                  variant="success"
               />
            )}
            <div className="p-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-2">
                     <h1 className="text-2xl font font-medium">Course setup</h1>
                     <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                     </span>
                  </div>
                  <CourseActions
                     courseId={courseId}
                     disabled={!isComplete || !hasPublishedChapter}
                     isPublished={course.isPublished}
                  />
               </div>

               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-9">
                  <div className="col-span-1 flex flex-col gap-y-6">
                     <div className="flex items-center gap-x-2 mt-3">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl font-semibold">
                           Customize your course
                        </h2>
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
                        <h2 className="text-xl font-semibold">
                           Course chapters
                        </h2>
                     </div>
                     <ChapterForm
                        courseId={courseId}
                        initialData={{ chapters: course.chapters }}
                     />
                     <div className="flex items-center gap-x-2 mt-3">
                        <IconBadge icon={CircleDollarSign} />
                        <h3 className="text-xl font-semibold">
                           sell your courses
                        </h3>
                     </div>
                     <PriceForm
                        courseId={courseId}
                        initialData={{ price: course.price }}
                     />
                     <div className="flex items-center gap-x-2 mt-3">
                        <IconBadge icon={File} />
                        <h2 className="text-xl font-semibold">
                           Resources & Attachments
                        </h2>
                     </div>
                     <AttachmentsForm
                        courseId={courseId}
                        initialData={course}
                     />
                  </div>
               </div>
            </div>
         </>
      );

      //
   } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         if (error.code === "P2023") {
            // it means that the id that we requested to database does not valid so there is no such an id in db
            notFound();
         }
      }
      return notFound();
   }
};

export default CoursePage;

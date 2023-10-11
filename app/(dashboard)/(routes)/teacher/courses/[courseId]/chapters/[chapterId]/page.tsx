import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import getChapter from "@/fetchers/getChapterFromDb";

import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/global/IconBadge";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm.tsx";

type AppProps = {
   params: {
      chapterId: string;
      courseId: string;
   };
};

const ChapterPage = async ({ params: { chapterId, courseId } }: AppProps) => {
   const chapter = await getChapter(chapterId, courseId);
   if (!chapter) return notFound();

   const requiredFields = [
      chapter.title,
      chapter.description,
      chapter.videoUrl,
   ];
   const totalFields = requiredFields.length;
   const completedFields = requiredFields.filter(Boolean).length;

   const completedText = `(${completedFields}/${totalFields})`;

   return (
      <div className="p-6">
         <div className="flex items-center justify-between">
            <div className="w-full">
               <Link
                  className="flex items-center text-sm hover:opacity-75 hover:underline transition mb-6"
                  href={`../`}
               >
                  <ArrowLeft className="h-4 w-4 m-2" />
                  Back to course setup
               </Link>
               <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-y-2">
                     <h1 className="text-2xl font-medium">Chapter Creation</h1>
                     <span>Compelete all fields {completedText}</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 max-w-7xl">
            <div className="space-y-4">
               <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize your chapter</h2>
               </div>
               <ChapterTitleForm
                  chapterId={chapterId}
                  courseId={courseId}
                  initialData={{ title: chapter.title }}
               />
               <ChapterDescriptionForm
                  chapterId={chapterId}
                  courseId={courseId}
                  initialData={{ description: chapter.description }}
               />
               <div className="flex items-center gap-x-2">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">Access Settings</h2>
               </div>
               <ChapterAccessForm
                  chapterId={chapterId}
                  courseId={courseId}
                  initialData={{ isFree: chapter.isFree }}
               />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-x-2">
                  <IconBadge icon={Video} />
                  <h2 className="text-xl">Add a video</h2>
               </div>
               <ChapterVideoForm
                  chapterId={chapterId}
                  courseId={courseId}
                  initialData={chapter}
               />
            </div>
         </div>
      </div>
   );
};

export default ChapterPage;

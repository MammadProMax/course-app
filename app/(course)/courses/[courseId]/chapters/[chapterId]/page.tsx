import { redirect } from "next/navigation";
import React from "react";

import getChapter from "@/fetchers/getPublishableChapterPlayer";

import { FileIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import Banner from "@/components/global/Banner";
import QuillPreview from "@/components/global/QuillPreview";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";

type PageProps = {
   params: {
      courseId: string;
      chapterId: string;
   };
};

export default async function ChapterPlayerPage({
   params: { chapterId, courseId },
}: PageProps) {
   const {
      attachments,
      chapter,
      course,
      muxData,
      nextChapter,
      purchase,
      userProgress,
   } = await getChapter({ chapterId, courseId });

   if (!chapter || !course) return redirect("/");

   const isLocked = !purchase && !chapter.isFree;
   const completeOnEnd = !!purchase && !userProgress?.isComplete;

   return (
      <div>
         {userProgress?.isComplete && (
            <Banner
               iconSize="md"
               label="You already have compeleted this chapter"
               variant="success"
            />
         )}
         {isLocked && (
            <Banner
               iconSize="md"
               label="You have to purchase this course to watch the chapter"
               variant="destructive"
            />
         )}

         <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
               <VideoPlayer
                  chapterId={chapterId}
                  title={chapter.title}
                  courseId={courseId}
                  nextChapterId={nextChapter?.id}
                  muxData={muxData!}
                  isLocked={isLocked}
                  completeOnEnd={completeOnEnd}
               />
            </div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
               <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
               {!isLocked ? (
                  <div>{/* TODO:ADD course progress button */}</div>
               ) : (
                  <CourseEnrollButton
                     courseId={courseId}
                     price={course.price!}
                  />
               )}
            </div>
            <Separator />
            <div>
               <QuillPreview value={chapter.description!} />
            </div>
            {!isLocked && !!attachments.length && (
               <>
                  <Separator />
                  <div>
                     {attachments.map((att) => (
                        <a
                           key={att.id}
                           href={att.url}
                           target="_blank"
                           className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                        >
                           <FileIcon />
                           <p className="line-clamp-1 ">{att.name}</p>
                        </a>
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

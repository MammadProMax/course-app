import Banner from "@/components/global/Banner";
import getChapter from "@/fetchers/getPublishableChapterPlayer";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_components/VideoPlayer";

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
         </div>
      </div>
   );
}

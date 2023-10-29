import getChapter from "@/fetchers/getPublishableChapterPlayer";
import { redirect } from "next/navigation";
import React from "react";

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

   console.log(isLocked);

   return <div>page of chapter</div>;
}

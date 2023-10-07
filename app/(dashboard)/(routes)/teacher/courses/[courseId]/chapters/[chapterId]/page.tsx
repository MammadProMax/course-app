import React from "react";
import getChapter from "@/fetchers/getChapterFromDb";
import { Chapter } from "@prisma/client";

type AppProps = {
   params: {
      chapterId: string;
      courseId: string;
   };
};

const page = async ({ params: { chapterId, courseId } }: AppProps) => {
   const chapter = (await getChapter(chapterId)) as Chapter;

   return (
      <div>
         {chapterId} & {courseId}
      </div>
   );
};

export default page;

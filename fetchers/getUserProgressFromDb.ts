import { db } from "@/lib/db";

export default async function getUserProgressFromDb(
   userId: string,
   courseId: string
) {
   try {
      const publishedChapters = await db.chapter.findMany({
         where: {
            courseId,
            isPublished: true,
         },
         select: {
            id: true,
         },
      });

      // published chapter in specific course
      const publishedChapterIds = publishedChapters.map(
         (chapter) => chapter.id
      );

      // completed chapters in course
      const validCompletedChapters = await db.userProgress.count({
         where: {
            userId,
            chapterId: {
               in: publishedChapterIds,
            },
            isComplete: true,
         },
      });

      const progressPercentage =
         (validCompletedChapters / publishedChapterIds.length) * 100;

      return progressPercentage;
   } catch (error) {
      console.log("[GET_PROGRESS]:FETCHER", error);
      return 0;
   }
}

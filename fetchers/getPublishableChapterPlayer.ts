import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Attachment } from "@prisma/client";
import { redirect } from "next/navigation";
type Props = {
   courseId: string;
   chapterId: string;
};

export default async function getChapter({ chapterId, courseId }: Props) {
   try {
      const { userId } = auth();
      if (!userId) redirect("/");

      const purchase = await db.purchase.findUnique({
         where: {
            userId_courseId: {
               courseId,
               userId,
            },
         },
      });

      const course = await db.course.findUniqueOrThrow({
         where: {
            id: courseId,
            isPublished: true,
         },
         select: {
            price: true,
         },
      });

      const chapter = await db.chapter.findUniqueOrThrow({
         where: {
            courseId,
            id: chapterId,
            isPublished: true,
         },
      });

      let muxData = null;
      let attachments: Attachment[] = [];
      let nextChapter: Chapter | null = null;

      if (purchase || chapter.isFree) {
         attachments = await db.attachment.findMany({
            where: {
               courseId,
            },
         });

         muxData = await db.muxData.findUnique({
            where: {
               chapterId,
            },
         });

         nextChapter = await db.chapter.findFirst({
            where: {
               courseId,
               position: { gt: chapter.position },
            },
            orderBy: {
               position: "asc",
            },
         });
      }

      const userProgress = await db.userProgress.findUnique({
         where: {
            userId_chapterId: {
               chapterId,
               userId,
            },
         },
      });

      return {
         chapter,
         course,
         purchase,
         muxData,
         attachments,
         userProgress,
         nextChapter,
      };
   } catch (error) {
      console.log("[GET_CHAPTER_PUBLISHABLE]", error);

      return {
         chapter: null,
         course: null,
         muxData: null,
         attachments: [],
         userProgress: null,
         nextChapter: null,
         purchase: null,
      };
   }
}

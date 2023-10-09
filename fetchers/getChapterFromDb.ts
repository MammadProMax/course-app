import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function getChapter(chapterId: string, courseId: string) {
   try {
      const chapter = await db.chapter.findUnique({
         where: {
            id: chapterId,
            courseId,
         },
         include: {
            muxData: true,
         },
      });
      if (!chapter) notFound();
      return chapter;
   } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         if (error.code === "P2023") {
            notFound();
         }
      }
   }
}

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Chapter } from "@prisma/client";

export default async function getChapter(chapterId: string) {
   try {
      const chapter = await db.chapter.findUnique({
         where: {
            id: chapterId,
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

import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(
   req: Request,
   {
      params: { courseId },
   }: {
      params: {
         courseId: string;
      };
   }
) {
   try {
      const { userId } = auth();
      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      const { title }: { title: string } = await req.json();
      if (!title) return new NextResponse("forbidden", { status: 403 });

      const courseOwner = await db.course.findUnique({
         where: {
            id: courseId,
            userId,
         },
      });
      if (!courseOwner) return new NextResponse("forbidden", { status: 403 });

      const allChapters = await db.chapter.findMany({
         orderBy: {
            position: "desc",
         },
      });

      const newPosition =
         allChapters.length !== 0 ? allChapters[0].position + 1 : 0;

      const newChapter = await db.chapter.create({
         data: {
            courseId,
            title,
            position: newPosition,
         },
      });

      return NextResponse.json(newChapter);
   } catch (error) {
      console.log("[COURSES_ID_CHAPTERS]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

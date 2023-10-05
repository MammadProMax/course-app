import { NextResponse } from "next/server";

import { db } from "@/lib/db";

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
      const { title }: { title: string } = await req.json();
      if (!title) return new NextResponse("forbidden", { status: 403 });

      const courseOwner = await db.course.findUnique({
         where: {
            id: courseId,
         },
      });
      if (!courseOwner) return new NextResponse("forbidden", { status: 403 });

      const lastChapter = await db.chapter.findFirst({
         where: {
            courseId,
         },
         orderBy: {
            position: "desc",
         },
      });

      const newPosition = lastChapter ? lastChapter.position++ : 1;

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

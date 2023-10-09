import { auth } from "@clerk/nextjs";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type ParamsProps = {
   params: {
      courseId: string;
      chapterId: string;
   };
};

export async function PATCH(
   req: Request,
   { params: { courseId, chapterId } }: ParamsProps
) {
   try {
      const { userId } = auth();
      if (!userId) return new NextResponse("unauthorized", { status: 401 });

      const { isPublished, ...updatedData }: Partial<Chapter> =
         await req.json();

      if (
         !updatedData ||
         Object.keys(updatedData).length === 0 ||
         typeof updatedData !== "object"
      )
         return new NextResponse(undefined, {
            status: 402,
         });

      const courseOwner = await db.course.findUnique({
         where: {
            id: courseId,
            userId,
         },
      });
      if (!courseOwner)
         return new NextResponse("unauthorized", { status: 401 });

      const chapter = await db.chapter.update({
         data: updatedData,
         where: {
            id: chapterId,
            courseId,
         },
      });
      return NextResponse.json(chapter);
   } catch (error) {
      console.log("[CHAPTER_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

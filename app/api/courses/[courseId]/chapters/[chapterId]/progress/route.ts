import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

type ParamsProps = {
   params: {
      chapterId: string;
      courseId: string;
   };
};

export async function PUT(
   request: Request,
   { params: { chapterId, courseId } }: ParamsProps
) {
   try {
      const { isComplete } = await request.json();

      const { userId } = auth();
      if (!userId) return new NextResponse("Unauthorized", { status: 401 });

      // update userProgress if exist or create new one
      await db.userProgress.upsert({
         where: {
            userId_chapterId: {
               chapterId,
               userId,
            },
         },
         create: {
            userId,
            chapterId,
            isComplete,
         },
         update: {
            isComplete,
         },
      });
      return new NextResponse("done", { status: 200 });
   } catch (error) {
      console.log("[CHAPTER_ID_PROGRESS]:PUT");
      return new NextResponse("Internall server Error", { status: 500 });
   }
}

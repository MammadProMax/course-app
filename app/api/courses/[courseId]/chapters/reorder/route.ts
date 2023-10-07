import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PUT(
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
      // validation
      const list: Pick<Chapter, "id" | "position">[] = await req.json();
      list.forEach((data) => {
         if (!data.id || !data.position)
            return new NextResponse("forbidden", { status: 403 });
      });

      const { userId } = auth();
      if (!userId) return new NextResponse("unauthorized", { status: 401 });

      const ownerCourse = await db.course.findUnique({
         where: {
            id: courseId,
            userId,
         },
      });
      if (!ownerCourse)
         return new NextResponse("unauthorized", { status: 401 });
      // db Update

      for (const item of list) {
         await db.chapter.update({
            where: {
               id: item.id,
            },
            data: {
               position: item.position,
            },
         });
      }
      return new NextResponse("done", { status: 200 });
   } catch (error) {
      console.log("[CHAPTERS_REORDER]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Course } from "@prisma/client";
type ParamsProps = {
   params: {
      courseId: string;
   };
};
export async function PATCH(
   req: Request,
   { params: { courseId } }: ParamsProps
) {
   try {
      const { userId } = auth();
      if (!userId) return new NextResponse("unauthorized", { status: 401 });

      const updatedData: Course = await req.json();

      if (
         !updatedData ||
         Object.keys(updatedData).length === 0 ||
         typeof updatedData !== "object"
      )
         return new NextResponse(undefined, {
            status: 402,
         });

      const course = await db.course.update({
         data: updatedData,
         where: {
            id: courseId,
            userId,
         },
      });
      return NextResponse.json(course);
   } catch (error) {
      console.log("[COURSES_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

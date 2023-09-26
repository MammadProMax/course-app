import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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

      const { title } = await req.json();
      if (!title)
         return new NextResponse(undefined, {
            status: 402,
         });

      const course = await db.course.update({
         data: {
            title,
         },
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

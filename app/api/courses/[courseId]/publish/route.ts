import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { getRole } from "@/lib/getRole";

type Params = {
   params: {
      courseId: string;
   };
};

export async function POST(request: Request, { params: { courseId } }: Params) {
   const { searchParams } = new URL(request.url);
   const publishAPI = searchParams.get("set");

   const publishData =
      publishAPI === "true" ? true : publishAPI === "false" ? false : "invalid";
   if (publishData === "invalid") {
      return new NextResponse("invalid api", { status: 400 });
   }

   try {
      const { userId } = auth();
      const isAuthorized = await getRole(userId!);
      if (!userId || !isAuthorized)
         return new NextResponse("unauthorized", { status: 401 });

      const course = await db.course.findUnique({
         where: {
            id: courseId,
         },
         include: {
            chapters: true,
         },
      });
      if (!course) return new NextResponse("not found", { status: 404 });

      if (publishData) {
         const hasPublishedChapter = course.chapters.some(
            (chapter) => chapter.isPublished
         );

         if (
            !course.title ||
            !course.description ||
            !course.imageUrl ||
            !course.categoryId ||
            !hasPublishedChapter
         )
            return new NextResponse("missing required fields", { status: 401 });
      }

      const updatedCourse = await db.course.update({
         where: {
            id: courseId,
            userId,
         },
         data: {
            isPublished: publishData,
         },
      });
      return NextResponse.json({ isPublished: updatedCourse.isPublished });
   } catch (error) {
      console.log("[COURSES_ID_PUBLISH]:POST", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
type ParamsProps = {
   params: {
      courseId: string;
      chapterId: string;
   };
};

const requestSchema = z.object({
   isPublished: z.boolean(),
});
type RequestSchema = z.infer<typeof requestSchema>;
const errorResoponse = (error: ZodError) =>
   JSON.stringify(
      {
         errors: error.errors.map((issue) => ({
            message: `${issue.path[0]} ${issue.message}`,
         })),
      },
      undefined,
      3
   );

export async function POST(
   request: Request,
   { params: { chapterId, courseId } }: ParamsProps
) {
   try {
      // authorization
      const { userId } = auth();
      if (!userId) return new NextResponse("unauthorizrd", { status: 401 });
      const courseOwner = await db.course.findUnique({
         where: {
            id: courseId,
            userId,
         },
      });
      if (!courseOwner)
         return new NextResponse("unauthorizrd", { status: 401 });

      const body: RequestSchema = await request.json();
      requestSchema.parse(body);

      await db.chapter.update({
         where: {
            id: chapterId,
            courseId,
         },
         data: {
            isPublished: body.isPublished,
         },
      });

      if (body.isPublished === false) {
         // if all chapters are unpublished course is unpublished also
         const publishedChapters = await db.chapter.findMany({
            where: {
               courseId,
               isPublished: true,
            },
         });
         if (!publishedChapters.length) {
            await db.course.update({
               where: {
                  id: courseId,
               },
               data: {
                  isPublished: false,
               },
            });
         }
      }

      return new NextResponse("done", { status: 200 });
   } catch (error) {
      if (error instanceof ZodError) {
         const zodErrorString = errorResoponse(error);
         return new NextResponse(zodErrorString, { status: 403 });
      } else {
         console.log("[CHAPTER_ID_PUBLISH]", error);
         return new NextResponse("Internal Error", { status: 500 });
      }
   }
}

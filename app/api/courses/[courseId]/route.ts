import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Course } from "@prisma/client";
import { utapi } from "uploadthing/server";

import Mux from "@mux/mux-node";
import { getRole } from "@/lib/getRole";
const { Video } = new Mux(
   process.env.MUX_TOKEN_ID!,
   process.env.MUX_TOKEN_SECRET!
);

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

      const { imageUrl, ...updatedData }: Partial<Course> = await req.json();
      console.log(imageUrl);

      if (imageUrl) {
         const coursePreState = await db.course.findUnique({
            where: {
               id: courseId,
               userId,
            },
         });
         if (coursePreState?.imageUrl) {
            const fileKey = coursePreState.imageUrl.split("/").pop();
            fileKey && (await utapi.deleteFiles(fileKey));
         }
      }

      const course = await db.course.update({
         data: {
            ...updatedData,
            imageUrl,
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

export async function DELETE(
   req: Request,
   { params: { courseId } }: ParamsProps
) {
   try {
      const { userId } = auth();
      const isAuthorized = await getRole(userId!);
      if (!userId || !isAuthorized)
         return new NextResponse("unauthorized", { status: 401 });
      const course = await db.course.findUnique({
         where: {
            id: courseId,
            userId,
         },
         include: {
            chapters: {
               include: {
                  muxData: true,
               },
            },
            attachments: {},
         },
      });

      if (!course) return new NextResponse("Not found", { status: 404 });
      const utFiles: string[] = [];
      const addUtfilekeyList = (url: string) => {
         const app = url.split("/").pop();
         utFiles.push(app!);
      };

      course.imageUrl && addUtfilekeyList(course.imageUrl);

      if (course.chapters.length > 0) {
         for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
               try {
                  await Video.Assets.del(chapter.muxData.assetId);
               } catch (error) {
                  console.log("asset is not available");
               }

               await db.muxData.delete({
                  where: {
                     chapterId: chapter.id,
                  },
               });
            }
            // uploadthings chapter videos
            if (chapter.videoUrl) addUtfilekeyList(chapter.videoUrl);
         }
         await db.chapter.deleteMany({
            where: {
               courseId,
            },
         });
      }
      // uplaodthings attachments
      if (course.attachments.length > 0) {
         for (const attachment of course.attachments) {
            addUtfilekeyList(attachment.url);
         }
         await db.attachment.deleteMany({
            where: {
               courseId,
            },
         });
      }

      const deletedCourse = await db.course.delete({
         where: {
            id: courseId,
            userId,
         },
      });

      // delete uploadthings files
      try {
         await utapi.deleteFiles(utFiles);
      } catch (error) {
         console.log("cant connect to uploadthings");
      }
      // DELETE COURSE
      if (!deletedCourse)
         return new NextResponse("unauthorized", { status: 401 });

      return NextResponse.json({ done: "done" });
   } catch (error) {
      console.log("[COURSES_ID]:DELETE", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

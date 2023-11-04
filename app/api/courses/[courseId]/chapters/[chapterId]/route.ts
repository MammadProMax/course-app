import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Chapter } from "@prisma/client";

import { db } from "@/lib/db";
import Mux from "@mux/mux-node";
import { UTApi } from "uploadthing/server";

const { Video } = new Mux(
   process.env.MUX_TOKEN_ID!,
   process.env.MUX_TOKEN_SECRET!
);

const utapi = new UTApi({
   fetch: globalThis.fetch,
});

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
      console.log("patch route started");

      const { userId } = auth();
      if (!userId) return new NextResponse("unauthorized", { status: 401 });

      const { isPublished, ...updatedData }: Partial<Chapter> =
         await req.json();

      const courseOwner = await db.course.findUnique({
         where: {
            id: courseId,
            userId,
         },
      });
      if (!courseOwner)
         return new NextResponse("unauthorized", { status: 401 });

      if (updatedData.videoUrl) {
         console.log(
            `video url is sent successfully : ${updatedData.videoUrl}`
         );

         // delete previous video in uploadthings
         const chapterBeforeUpdate = await db.chapter.findUnique({
            where: {
               id: chapterId,
               courseId,
            },
         });

         if (chapterBeforeUpdate?.videoUrl) {
            try {
               const fileKey = chapterBeforeUpdate.videoUrl.split("/").pop();
               fileKey && (await utapi.deleteFiles(fileKey));
            } catch (error) {
               console.log("[utapi]");
               console.log(error);
            }

            const existingMuxData = await db.muxData.findFirst({
               where: {
                  chapterId,
               },
            });

            if (existingMuxData) {
               try {
                  await Video.Assets.del(existingMuxData.assetId);
               } catch (error) {
                  console.log("[mux:Del]");
                  console.log(error);
               }

               await db.muxData.delete({
                  where: {
                     id: existingMuxData.id,
                  },
               });
            }
         }

         console.log("create new mux data");

         const asset = await Video.Assets.create({
            input: updatedData.videoUrl,
            playback_policy: "public",
            test: false,
         });

         await db.muxData.create({
            data: {
               assetId: asset.id,
               chapterId,
               playbackId: asset.playback_ids?.[0].id,
            },
         });
      }

      const chapter = await db.chapter.update({
         data: {
            ...updatedData,
         },
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

export async function DELETE(
   req: Request,
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

      const chapter = await db.chapter.findUnique({
         where: {
            id: chapterId,
         },
      });
      if (!chapter) new NextResponse("forbidden", { status: 403 });
      else if (chapter.videoUrl) {
         // delete video from uploadthings & mux
         const existingMuxData = await db.muxData.findFirst({
            where: {
               chapterId,
            },
         });
         if (existingMuxData) {
            const _UP = Video.Assets.del(existingMuxData.assetId);
            const _UP2 = db.muxData.delete({
               where: {
                  chapterId,
               },
            });
            await Promise.all([_UP, _UP2]);
         }
         const fileKey = chapter.videoUrl.split("/").pop();
         if (fileKey) {
            await utapi.deleteFiles(fileKey);
         }
      }

      const deleted = await db.chapter.delete({
         where: {
            courseId,
            id: chapterId,
         },
      });

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

      return NextResponse.json(deleted);
   } catch (error) {
      console.log("[CHAPTER_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

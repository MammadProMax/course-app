import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Chapter } from "@prisma/client";

import { db } from "@/lib/db";
import Mux from "@mux/mux-node";
import { utapi } from "uploadthing/server";

const { Video } = new Mux(
   process.env.MUX_TOKEN_ID!,
   process.env.MUX_TOKEN_SECRET!
);

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

      if (updatedData.videoUrl) {
         // delete previous video in uploadthings
         const chapterBeforeUpdate = await db.chapter.findUnique({
            where: {
               id: chapterId,
               courseId,
            },
         });

         if (chapterBeforeUpdate?.videoUrl) {
            const fileKey = chapterBeforeUpdate.videoUrl.split("/").pop()!;
            utapi.deleteFiles(fileKey);
         }
         // delete MuxData if new video is uploading
         const existingMuxData = await db.muxData.findFirst({
            where: {
               chapterId,
            },
         });

         if (existingMuxData) {
            await Video.Assets.del(existingMuxData.assetId);
            await db.muxData.delete({
               where: {
                  id: existingMuxData.id,
               },
            });
         }

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
            muxData: {
               connect: {
                  chapterId,
               },
            },
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

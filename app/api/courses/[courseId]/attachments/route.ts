import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Attachment } from "@prisma/client";
import { UTApi } from "uploadthing/server";
import { getRole } from "@/lib/getRole";

const utapi = new UTApi();

export async function POST(
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
      const { userId } = auth();
      if (!userId) return new NextResponse("unauthorized", { status: 401 });

      const request: {
         url: string;
      } = await req.json();
      if (!request) return new NextResponse("forbidden", { status: 403 });

      const response = await db.attachment.create({
         data: {
            url: request.url,
            name: request.url.split("/").pop() as string,
            courseId,
         },
      });
      return NextResponse.json(response);
   } catch (error) {
      console.log("[COURSEID_ATTACHMENTS]", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}

export async function PATCH(
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
      const request: Partial<Attachment> = await req.json();

      if (!request.id) return new NextResponse("forbidden", { status: 403 });

      const response = await db.attachment.update({
         data: {
            name: request.name,
            url: request.url,
         },
         where: {
            id: request.id,
            courseId,
         },
      });
      return NextResponse.json(response);
   } catch (error) {
      console.log("[COURSEID_ATTACHMENTS]", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}

// delete attachment
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
      const request: Partial<Attachment> = await req.json();

      if (!request.id || !request.url)
         return new NextResponse("forbidden", { status: 403 });

      const response = await db.attachment.delete({
         where: {
            id: request.id,
            courseId,
         },
      });
      await utapi.deleteFiles(request.url.split("/").pop() as string);
      return NextResponse.json(response);
   } catch (error) {
      console.log("[COURSEID_ATTACHMENTS]", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}

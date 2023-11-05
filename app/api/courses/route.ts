import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { getRole } from "@/lib/getRole";

export async function GET() {
   try {
      const courses = await db.course.findMany({
         include: {
            attachments: true,
            category: true,
         },
      });
      return NextResponse.json(courses);
   } catch (error) {
      console.log("[COURSES]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

export async function POST(req: Request) {
   try {
      const { userId } = auth();
      const isAuthorized = await getRole(userId!);
      if (!userId || !isAuthorized)
         new NextResponse("Unauthorized", { status: 401 });
      //check requirements
      const {
         title,
      }: {
         title: string;
      } = await req.json();
      if (!userId) return new NextResponse("Unauthorized", { status: 401 });

      // create course
      const course = await db.course.create({
         data: { title, userId },
      });

      return NextResponse.json(course);
   } catch (error) {
      console.log("[COURSES]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

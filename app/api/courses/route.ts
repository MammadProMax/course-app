import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export default async function POST(req: Request) {
   try {
      const { userId } = auth();
      const {
         title,
      }: {
         title: string;
      } = await req.json();

      if (!userId) return new NextResponse("Unauthorized", { status: 401 });
      const course = await db.course.create({
         data: { title, userId },
      });
   } catch (error) {
      console.log("[COURSES]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}

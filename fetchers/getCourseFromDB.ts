import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function getCourse(id: string) {
   const { userId } = auth();
   if (!userId) return redirect("/");

   const course = db.course.findUnique({
      where: {
         id,
      },
   });
   return course;
}
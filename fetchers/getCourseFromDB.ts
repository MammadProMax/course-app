import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function getCourse(id: string) {
   const { userId } = auth();
   if (!userId) return redirect("/");

   const course = db.course.findUnique({
      where: {
         id,
         userId,
      },
      include: {
         attachments: {
            orderBy: {
               createdAt: "desc",
            },
         },
         chapters: {
            orderBy: {
               position: "asc",
            },
         },
      },
   });
   return course;
}
export async function CourseWithPublishedChapsProgressed(id: string) {
   const { userId } = auth();
   if (!userId) return redirect("/");

   const course = db.course.findUnique({
      where: {
         id,
         userId,
      },
      include: {
         chapters: {
            where: {
               isPublished: true,
            },
            include: {
               userProgress: {
                  where: {
                     userId: userId,
                  },
               },
            },
            orderBy: {
               position: "asc",
            },
         },
      },
   });
   return course;
}

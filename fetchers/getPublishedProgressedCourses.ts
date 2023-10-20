import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";
import getProgress from "./getUserProgressFromDb";

export type CourseWithProgressWithCategory = Course & {
   category: Category | null;
   chapters: { id: string }[];
   progress: number | null;
};

type GetCoursesProps = {
   userId: string;
   title?: string;
   categoryId: string;
};

export default async function getCourses({
   categoryId,
   userId,
   title,
}: GetCoursesProps): Promise<CourseWithProgressWithCategory[]> {
   try {
      const courses = await db.course.findMany({
         where: {
            isPublished: true,
            title: {
               contains: title,
            },
            categoryId,
         },
         include: {
            category: true,
            chapters: {
               where: {
                  isPublished: true,
               },
               select: { id: true },
            },
            purchases: {
               where: {
                  userId,
               },
            },
         },
         orderBy: {
            createdAt: "desc",
         },
      });
      const courseWithProgress = await Promise.all(
         courses.map(async (course) => {
            if (course.purchases.length === 0)
               return { ...course, progress: null };
            const progressPercentage = await getProgress(userId, course.id);

            return { ...course, progress: progressPercentage };
         })
      );

      return courseWithProgress;
   } catch (error) {
      console.log("[GET_COURSES_PROGRESSED]:FETCHER", error);
      return [];
   }
}

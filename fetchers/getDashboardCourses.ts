import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Category, Chapter, Course } from "@prisma/client";
import getCourseProgress from "@/fetchers/getUserProgressFromDb";

type CourseWithCategoryWithProgress = Course & {
   category: Category;
   chapters: Chapter[];
   progress: number | null;
};

type DashboardCourses = {
   completedCourses: CourseWithCategoryWithProgress[];
   coursesInProgress: CourseWithCategoryWithProgress[];
};

export const getCourses = async (): Promise<DashboardCourses> => {
   try {
      const { userId } = auth();
      if (!userId) throw new Error("UnAuthorized Action");

      const purchasedCoursesByUser = <CourseWithCategoryWithProgress[]>(
         await db.course.findMany({
            where: {
               purchases: {
                  some: {
                     userId,
                  },
               },
            },
            include: {
               category: true,
               chapters: {
                  where: {
                     isPublished: true,
                  },
               },
            },
         })
      );

      for (const course of purchasedCoursesByUser) {
         const progress = await getCourseProgress(userId, course.id);
         course.progress = progress;
      }
      const completedCourses = purchasedCoursesByUser.filter(
         (course) => course.progress === 100
      );
      const coursesInProgress = purchasedCoursesByUser.filter(
         (course) => (course.progress ?? 0) < 100
      );

      return {
         completedCourses,
         coursesInProgress,
      };
   } catch (error) {
      console.log("[DASHBOEARD_COURSES]:GET_COURSE", error);
      return {
         completedCourses: [],
         coursesInProgress: [],
      };
   }
};

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
   course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
   const grouped: Record<string, number> = {};
   purchases.forEach((purchase) => {
      const courseTitle = purchase.course.title;
      if (!grouped[courseTitle]) {
         grouped[courseTitle] = purchase.course.price!;
      } else grouped[courseTitle] += purchase.course.price!;
   });

   return grouped;
};

export const getAnalytics = async () => {
   try {
      const { userId } = auth();
      if (!userId) throw new Error("Unauthoried action");

      const purchases = await db.purchase.findMany({
         where: {
            course: {
               userId,
               price: {
                  gt: 0,
               },
            },
         },
         include: {
            course: true,
         },
      });
      const groupedEarnings = groupByCourse(purchases);
      const data = Object.entries(groupedEarnings).map(
         ([courseTitle, total]) => ({
            name: courseTitle,
            total,
         })
      );
      const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
      const totalSales = purchases.length;
      return {
         data,
         totalRevenue,
         totalSales,
      };
   } catch (error) {
      console.log("[GET_ANALYTICS]", error);
      return {
         data: [],
         totalRevenue: 0,
         totalSales: 0,
      };
   }
};

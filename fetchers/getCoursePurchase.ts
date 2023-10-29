import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function getCoursePurchase(courseId: string) {
   const { userId } = auth();
   if (!userId) redirect("/");
   else {
      const purchase = await db.purchase.findUnique({
         where: {
            userId_courseId: {
               courseId,
               userId,
            },
         },
      });
      return purchase;
   }
}

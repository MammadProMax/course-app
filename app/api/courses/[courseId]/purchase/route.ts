import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

type ParamProps = {
   params: {
      courseId: string;
   };
};

export async function POST(
   request: Request,
   { params: { courseId } }: ParamProps
) {
   try {
      const { userId } = auth();
      if (!userId) return new NextResponse("Unauthorized", { status: 401 });

      //   check if purchase is available
      const isPurchased = await db.purchase.findUnique({
         where: {
            userId_courseId: {
               courseId,
               userId,
            },
         },
      });
      if (isPurchased)
         return new NextResponse("this course is purchased before", {
            status: 403,
         });

      //   create new purchase

      const createPurchase = await db.purchase.create({
         data: {
            userId,
            courseId,
         },
      });

      return NextResponse.json({
         code: 200,
         message: "purchased",
         detail: {
            userId: createPurchase.userId,
            courseId: createPurchase.courseId,
         },
      });
   } catch (error) {
      console.log("[PURCHASE]:POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}

import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type Props = {
   params: {
      courseId: string;
   };
};

export default async function Page({ params: { courseId } }: Props) {
   const firstChapter = await db.chapter.findFirst({
      where: {
         courseId,
      },
      orderBy: {
         position: "asc",
      },
   });
   if (!firstChapter) {
      return redirect("/");
   }
   return redirect(`/courses/${courseId}/chapters/${firstChapter?.id}`);
}

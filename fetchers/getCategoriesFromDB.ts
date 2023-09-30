import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function getCategories() {
   const { userId } = auth();
   if (!userId) return redirect("/");

   const categories = db.category.findMany({
      orderBy: {
         name: "asc",
      },
   });
   return categories;
}

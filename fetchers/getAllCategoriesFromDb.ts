import { db } from "@/lib/db";

export default async function getCategories() {
   try {
      const categories = await db.category.findMany({
         orderBy: {
            name: "asc",
         },
      });

      return categories;
   } catch (error) {
      console.log(error);
      return [];
   }
}

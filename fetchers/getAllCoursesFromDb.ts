import { db } from "@/lib/db";
import toast from "react-hot-toast";

export default async function getAllCourses(userId: string) {
   try {
      const courses = await db.course.findMany({
         where: {
            userId,
         },
         orderBy: {
            createdAt: "desc",
         },
      });
      return courses;
   } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
      return [];
   }
}

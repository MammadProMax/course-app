import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import getAllCourses from "@/fetchers/getAllCoursesFromDb";

import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/Datatable";
import { columns } from "./_components/Columns";

const CoursesPage = async () => {
   const { userId } = auth();
   if (!userId) return redirect("/");

   const courses = await getAllCourses(userId);
   const rewritenCourse = courses.map((course) => {
      if (!course.price) {
         return { ...course, price: "Free" };
      } else return course;
   });

   return (
      <div className="p-6">
         <div className="max-w-7xl mx-auto">
            <DataTable data={rewritenCourse} columns={columns} />
         </div>
      </div>
   );
};

export default CoursesPage;

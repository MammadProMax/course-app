import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import getCategories from "@/fetchers/getAllCategoriesFromDb";
import getCourses from "@/fetchers/getPublishedProgressedCourses";

import Categories from "./_components/Categories";
import NavSearch from "@/components/global/NavSearch";
import CourseList from "@/components/global/CourseList";

type Props = {
   searchParams: {
      title: string;
      categoryId: string;
   };
};

export default async function SearchPage({ searchParams }: Props) {
   const { userId } = auth();
   if (!userId) redirect("/");

   const categories = await getCategories();
   const courses = await getCourses({ ...searchParams, userId });
   return (
      <>
         <div className="md:hidden mb-4 px-6 pt-4">
            <NavSearch />
         </div>
         <div className="px-6 pb-3">
            <Categories items={categories} />
            <CourseList items={courses} />
         </div>
      </>
   );
}

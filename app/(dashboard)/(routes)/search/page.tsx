import React from "react";

import { db } from "@/lib/db";
import getCategories from "@/fetchers/getAllCategoriesFromDb";

import Categories from "./_components/Categories";
import NavSearch from "@/components/global/NavSearch";

export default async function SearchPage() {
   const categories = await getCategories();
   return (
      <>
         <div className="md:hidden mb-4 px-6 pt-4">
            <NavSearch />
         </div>
         <div>
            <Categories items={categories} />
         </div>
      </>
   );
}

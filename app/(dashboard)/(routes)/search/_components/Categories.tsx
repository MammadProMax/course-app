"use client";

import { Category } from "@prisma/client";
import React from "react";

import {
   FcEngineering,
   FcFilmReel,
   FcMultipleDevices,
   FcMusic,
   FcOldTimeCamera,
   FcSalesPerformance,
   FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./CategoryItem";

type Props = {
   items: Category[];
};

export type IconMap = Record<Category["name"], IconType>;
const iconMap: IconMap = {
   Music: FcMusic,
   Photography: FcOldTimeCamera,
   Fitness: FcSportsMode,
   Accounting: FcSalesPerformance,
   "Computer Science": FcMultipleDevices,
   Filming: FcFilmReel,
   Engineering: FcEngineering,
};

export default function Categories({ items }: Props) {
   return (
      <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto p-2">
         {items.map((item) => (
            <CategoryItem
               key={item.id}
               icon={iconMap[item.name]}
               label={item.name}
               value={item.id}
            />
         ))}
      </div>
   );
}

"use client";

import React from "react";

import SidebarLink from "./SidebarLink";
import { Layout, LucideIcon, Compass, List, BarChart } from "lucide-react";
import { usePathname } from "next/navigation";

type Rout = {
   icon: LucideIcon;
   lable: string;
   href: string;
};

const teacherRoutes: Rout[] = [
   {
      icon: List,
      href: "/teacher/courses",
      lable: "Courses",
   },
   {
      icon: BarChart,
      href: "/teacher/analytics",
      lable: "Analytics",
   },
];

const guestRoutes: Rout[] = [
   {
      icon: Layout,
      href: "/",
      lable: "Dashboard",
   },
   {
      icon: Compass,
      href: "/search",
      lable: "Browse",
   },
];

const SidebarRoutes = () => {
   const pathname = usePathname();
   const sideBarRouter = pathname.includes("/teacher")
      ? teacherRoutes
      : guestRoutes;

   const routes = sideBarRouter.map((data, index) => (
      <SidebarLink
         key={index}
         Icon={data.icon}
         href={data.href}
         label={data.lable}
      />
   ));

   return <div className="flex flex-col w-full">{routes}</div>;
};

export default SidebarRoutes;

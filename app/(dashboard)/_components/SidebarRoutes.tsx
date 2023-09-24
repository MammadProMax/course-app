"use client";

import React from "react";

import SidebarLink from "./SidebarLink";
import { Layout, LucideIcon, Compass } from "lucide-react";

type Rout = {
   icon: LucideIcon;
   lable: string;
   href: string;
};
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
   const routes = guestRoutes.map((data, index) => (
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

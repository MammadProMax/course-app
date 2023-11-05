"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { getRole } from "@/lib/getRole";
import { useQuery } from "@tanstack/react-query";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import NavSearch from "./NavSearch";

const NavbarRoutes = () => {
   const pathname = usePathname();
   const router = useRouter();
   const { userId } = useAuth();
   if (!userId) router.push("/");

   const { data: userRole } = useQuery({
      queryKey: ["userRole"],
      queryFn: () => getRole(userId!),
   });

   const isTeacherPage = pathname.startsWith("/teacher");
   const isCoursePage = pathname.includes("/courses");
   const isSearchPage = pathname === "/search";

   return (
      <>
         <Button asChild variant="ghost" size="sm">
            <Link href="/about">About us</Link>
         </Button>
         {isSearchPage && (
            <div className="hidden md:block">
               <NavSearch />
            </div>
         )}
         <div className="ml-auto flex items-center gap-x-2">
            {isTeacherPage || isCoursePage ? (
               <Button asChild variant="ghost" size="sm">
                  <Link href="/">
                     <LogOut className="h-2 w-2 mr-2" />
                     Exit
                  </Link>
               </Button>
            ) : !!userRole ? (
               <Button asChild variant={"ghost"} size={"sm"}>
                  <Link href="/teacher/courses">Teacher Mode</Link>
               </Button>
            ) : null}
            <UserButton afterSignOutUrl="/" />
         </div>
      </>
   );
};

export default NavbarRoutes;

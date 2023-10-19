"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import NavSearch from "./NavSearch";

const NavbarRoutes = () => {
   const pathname = usePathname();

   const isTeacherPage = pathname.startsWith("/teacher");
   const isPlayerPage = pathname.includes("/chapter");
   const isSearchPage = pathname === "/search";

   return (
      <>
         {isSearchPage && (
            <div className="hidden md:block">
               <NavSearch />
            </div>
         )}
         <div className="ml-auto flex items-center gap-x-2">
            {isTeacherPage || isPlayerPage ? (
               <Button asChild variant="ghost" size="sm">
                  <Link href="/">
                     <LogOut className="h-2 w-2 mr-2" />
                     Exit
                  </Link>
               </Button>
            ) : (
               <Button asChild variant={"ghost"} size={"sm"}>
                  <Link href="/teacher/courses">Teacher Mode</Link>
               </Button>
            )}
            <UserButton afterSignOutUrl="/" />
         </div>
      </>
   );
};

export default NavbarRoutes;

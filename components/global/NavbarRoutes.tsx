"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

const NavbarRoutes = () => {
   const pathname = usePathname();
   const router = useRouter();

   const isTeacherPage = pathname.startsWith("/teacher");
   const isPlayerPage = pathname.includes("/chapter");

   return (
      <div className="ml-auto flex items-center gap-x-2">
         {isTeacherPage || isPlayerPage ? (
            <Button>
               <LogOut className="h-2 w-2 mr-2" />
               Exit
            </Button>
         ) : (
            <Button asChild variant={"ghost"} size={"sm"}>
               <Link href="/teacher/courses">Teacher Mode</Link>
            </Button>
         )}
         <UserButton />
      </div>
   );
};

export default NavbarRoutes;

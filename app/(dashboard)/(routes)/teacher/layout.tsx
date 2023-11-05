import React from "react";

import { getRole } from "@/lib/getRole";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
   children: React.ReactNode;
};

export default async function TeacherLayout({ children }: Props) {
   const { userId } = auth();

   if (!userId) redirect("/");

   const role = await getRole(userId);
   if (!role) redirect("/");

   return <>{children}</>;
}

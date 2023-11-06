"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import { formatPrice } from "@/lib/formatPrice";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogTrigger,
   AlertDialogTitle,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";

type EnrollProps = {
   courseId: string;
   price: number; // must be purchaseable
};

export default function CourseEnrollButton({ courseId, price }: EnrollProps) {
   const router = useRouter();
   const { userId } = useAuth();
   const handleEnroll = async () => {
      try {
         const { data } = await axios.post(`/api/courses/${courseId}/purchase`);
         if (data.code === 200) {
            if (data.detail.userId === userId) {
               toast.success("course purchased");
               router.refresh();
            }
         }
      } catch (error) {
         console.log(error);
         toast.error("somthing went wrong");
      }
   };

   return (
      <AlertDialog>
         <Button asChild className="w-full md:w-auto mt-3 md:mt-0">
            <AlertDialogTrigger>
               Enroll for {formatPrice(price)}
            </AlertDialogTrigger>
         </Button>

         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Purchase simulation</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-y-2">
               <AlertDialogAction onClick={handleEnroll}>
                  Purchase
               </AlertDialogAction>
               <AlertDialogCancel>Cancel Purchase</AlertDialogCancel>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}

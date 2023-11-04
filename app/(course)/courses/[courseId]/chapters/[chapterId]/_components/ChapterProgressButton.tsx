"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProgressbuttonProps = {
   isCompeleted: boolean;
   chapterId: string;
   courseId: string;
   nextChapterId: string | undefined;
};

export default function ChapterProgressButton({
   chapterId,
   courseId,
   isCompeleted,
   nextChapterId,
}: ProgressbuttonProps) {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   const handleProgress = async () => {
      try {
         setIsLoading(true);

         //  api;
         await axios.put(
            `/api/courses/${courseId}/chapters/${chapterId}/progress`,
            {
               isComplete: !isCompeleted,
            }
         );
         toast.success(
            isCompeleted
               ? "Chapter progress is reset"
               : "Chapter progress completed"
         );
         if (!isCompeleted && nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
         }
         router.refresh();
      } catch (error) {
         toast.error("somthing went wrong");
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   const Icon = isCompeleted ? XCircle : CheckCircle;

   return (
      <Button
         variant={isCompeleted ? "outline" : "default"}
         onClick={handleProgress}
         disabled={isLoading}
         className="flex gap-x-2 items-center w-full mt-2 md:mt-0 md:w-auto"
      >
         <Icon className="w-5 h-5" />
         {isCompeleted ? "Not completed" : "Mark as completed"}
      </Button>
   );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
   disabled: boolean;
   courseId: string;
   isPublished: boolean;
};

const CourseActions = ({ courseId, disabled, isPublished }: Props) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const handleDeleteCourse = async () => {
      try {
         setIsLoading(true);
         const process = axios.delete(`/api/courses/${courseId}`);
         await toast.promise(process, {
            success: "course deleted",
            error: "somthing went wrong",
            loading: "deleting course ...",
         });

         router.push("/teacher/courses");
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };
   const handlePublishCourse = async () => {
      try {
         setIsLoading(true);
         await axios.post(
            `/api/courses/${courseId}/publish?set=${!isPublished}`
         );

         toast.success("course updated");
         router.refresh();
      } catch (error) {
         toast.error("somthing went wrong");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex items-center gap-x-2">
         <Button
            onClick={handlePublishCourse}
            disabled={disabled || isLoading}
            variant="outline"
            size="sm"
         >
            {isPublished ? "Unpublish" : "Publish"}
         </Button>
         <AlertDialog>
            <Button asChild size="sm">
               <AlertDialogTrigger>
                  <Trash className="h-4 w-4" />
               </AlertDialogTrigger>
            </Button>
            <AlertDialogContent>
               <AlertDialogHeader>
                  Are you sure you want to delete the Course
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                     asChild
                     variant="destructive"
                     onClick={handleDeleteCourse}
                  >
                     <AlertDialogAction>Delete</AlertDialogAction>
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
};

export default CourseActions;

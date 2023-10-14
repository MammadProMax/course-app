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
   chapterId: string;
   isPublished: boolean;
};

const ChapterActions = ({
   chapterId,
   courseId,
   disabled,
   isPublished,
}: Props) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const handleDeleteChapter = async () => {
      try {
         setIsLoading(true);
         const process = axios.delete(
            `/api/courses/${courseId}/chapters/${chapterId}`
         );
         await toast.promise(process, {
            success: "course updated",
            error: "somthing went wrong",
            loading: "updating course ...",
         });
         router.push("../");
         router.refresh();
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };
   const handlePublishChapter = async () => {
      const data = { isPublished: !isPublished };
      try {
         setIsLoading(true);
         await axios.post(
            `/api/courses/${courseId}/chapters/${chapterId}/publish`,
            data
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
            onClick={handlePublishChapter}
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
                  Are you sure you want to delete the chapter
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                     asChild
                     variant="destructive"
                     onClick={handleDeleteChapter}
                  >
                     <AlertDialogAction>Delete</AlertDialogAction>
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
};

export default ChapterActions;

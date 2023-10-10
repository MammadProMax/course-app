"use client";

import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
   AlertDialog,
   AlertDialogTrigger,
   AlertDialogContent,
   AlertDialogCancel,
   AlertDialogAction,
   AlertDialogHeader,
   AlertDialogFooter,
   AlertDialogTitle,
   AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type AppProps = {
   courseId: string;
   context: {
      id: string;
      url: string;
   };
   toggleEdit: () => void;
};
const DeleteAttDialog = ({ context, courseId, toggleEdit }: AppProps) => {
   const router = useRouter();
   const deleteItem = async () => {
      try {
         await axios.put(`/api/courses/${courseId}/attachments`, context);
         toast.success("Attachment Deleted");
         toggleEdit();
         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">
               Delete
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Are you sure you want delete Attachment ?
               </AlertDialogTitle>
               <AlertDialogDescription>
                  You can not undo deleted item
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <Button asChild onClick={deleteItem} variant="destructive">
                  <AlertDialogAction>Sure</AlertDialogAction>
               </Button>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteAttDialog;

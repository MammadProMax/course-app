"use client";

import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
   DialogDescription,
   DialogHeader,
   DialogTitle,
   Dialog,
   DialogContent,
   DialogTrigger,
   DialogFooter,
} from "@/components/ui/dialog";

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
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  Are you sure you want delete Attachment ?
               </DialogTitle>
               <DialogDescription>
                  You can not undo deleted item
               </DialogDescription>
            </DialogHeader>

            <DialogFooter>
               <Button type="button" onClick={deleteItem} variant="destructive">
                  Sure
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default DeleteAttDialog;

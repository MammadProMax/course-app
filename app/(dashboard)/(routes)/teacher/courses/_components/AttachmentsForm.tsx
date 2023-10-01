"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Course, Attachment } from "@prisma/client";
import { z } from "zod";

import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/global/FileUploader";
import ModifyAttachment from "./ModifyAttachment";

type Props = {
   initialData: Course & { attachments: Attachment[] };
   courseId: string;
};

const formSchema = z.object({
   url: z.string().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

const AttachmentsForm = ({ courseId, initialData }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);

   // other

   const handleSubmit = async (data: FormSchema) => {
      try {
         await axios.post(`/api/courses/${courseId}/attachments`, data);
         toast.success("Course Updated");
         toggleEdit();
         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };
   const toggleEdit = () => setIsEditing((state) => !state);

   return (
      <div className="bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <h3>Course Attachments</h3>
            <Button onClick={toggleEdit} variant="link" className="border-none">
               {isEditing ? (
                  "Cancel"
               ) : (
                  <>
                     <Plus className="h-4 w-4 mr-2" />
                     Add a file
                  </>
               )}
            </Button>
         </div>
         {!isEditing ? (
            <div className="text-slate-500">
               {initialData.attachments.length !== 0 ? (
                  <div className="flex flex-wrap justify-around items-center mt-2">
                     {initialData.attachments.map((att) => (
                        <ModifyAttachment
                           courseId={courseId}
                           key={att.id}
                           attachment={att}
                        />
                     ))}
                  </div>
               ) : (
                  <p className="italic text-sm">No attachments</p>
               )}
            </div>
         ) : (
            <>
               <FileUploader
                  endpoint="courseAttachment"
                  onChange={(url) => {
                     if (url) {
                        handleSubmit({ url });
                     }
                  }}
               />
               <div className="text-xs text-muted-foreground mt-4">
                  add a file to your course as attachment
               </div>
            </>
         )}
      </div>
   );
};

export default AttachmentsForm;

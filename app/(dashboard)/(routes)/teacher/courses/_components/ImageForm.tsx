"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, Plus, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import FileUploader from "@/components/global/FileUploader";
import { Course } from "@prisma/client";

type Props = {
   initialData: {
      imageUrl: string | null;
   };
   courseId: string;
};

const ImageForm = ({ courseId, initialData }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);

   // other

   const handleSubmit = async (data: Pick<Course, "imageUrl">) => {
      try {
         await axios.patch(`/api/courses/${courseId}`, data);
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
            Course image
            <Button onClick={toggleEdit} variant="link" className="border-none">
               {isEditing ? (
                  "Cancel"
               ) : !initialData.imageUrl ? (
                  <>
                     <Plus className="h-4 w-4 mr-2" />
                     Add Image
                  </>
               ) : (
                  <>
                     <Pencil className="h-4 w-4 mr-2" />
                     Edit Image
                  </>
               )}
            </Button>
         </div>
         {!isEditing ? (
            <div className="text-slate-500">
               {/* image */}
               {initialData.imageUrl ? (
                  <div className="relative aspect-video mt-2">
                     <Image
                        className="object-cover rounded-md"
                        fill
                        src={initialData.imageUrl}
                        alt="upload course image"
                     />
                  </div>
               ) : (
                  <div className="grid place-content-center h-40 bg-slate-200 rounded-md">
                     <ImageIcon />
                  </div>
               )}
            </div>
         ) : (
            <>
               <FileUploader
                  endpoint="courseImage"
                  onChange={(url) => {
                     if (url) {
                        handleSubmit({ imageUrl: url });
                     }
                  }}
               />
               <div className="text-xs text-muted-foreground mt-4">
                  16:9 aspect ratio recommended
               </div>
            </>
         )}
      </div>
   );
};

export default ImageForm;

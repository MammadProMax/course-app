"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import VerifiedIconbadge from "@/components/global/VerifiedIconbadge";
import QuillPreview from "@/components/global/QuillPreview";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChapterDescFormDialog from "./ChapterDescFormDialog";

type Props = {
   initialData: {
      description: string | null;
   };
   courseId: string;
   chapterId: string;
};

const ChapterDescriptionForm = ({
   courseId,
   initialData,
   chapterId,
}: Props) => {
   const [isEditing, setEditing] = React.useState(false);
   const toggleEdit = () => setEditing((state) => !state);

   return (
      <div className="relative bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <VerifiedIconbadge
               title="Chapter Description"
               Valid={!initialData.description}
            />
            <Dialog open={isEditing} onOpenChange={toggleEdit}>
               <DialogTrigger asChild>
                  <Button
                     variant="link"
                     className="border-none"
                     disabled={isEditing}
                  >
                     {!initialData.description ? (
                        <>
                           <Plus className="h-4 w-4 mr-2" />
                           Add Description
                        </>
                     ) : (
                        <>
                           <Pencil className="h-4 w-4 mr-2" />
                           Edit Description
                        </>
                     )}
                  </Button>
               </DialogTrigger>

               <DialogContent className="max-w-2xl">
                  <ChapterDescFormDialog
                     chapterId={chapterId}
                     courseId={courseId}
                     initialData={initialData}
                     toggleDialog={toggleEdit}
                  />
               </DialogContent>
            </Dialog>
         </div>
         <div
            className={cn(
               "text-sm text-slate-500",
               !initialData.description && "italic"
            )}
         >
            {initialData.description ? (
               <QuillPreview value={initialData.description} />
            ) : (
               "No description"
            )}
         </div>
      </div>
   );
};

export default ChapterDescriptionForm;

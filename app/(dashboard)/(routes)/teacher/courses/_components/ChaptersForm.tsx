"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Chapter } from "@prisma/client";

import { cn } from "@/lib/utils";
import {
   Form,
   FormControl,
   FormField,
   FormLabel,
   FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import ChaptersList from "./ChaptersList";

type Props = {
   initialData: {
      chapters: Chapter[];
   };
   courseId: string;
};

const formSchema = z.object({
   title: z
      .string()
      .min(1, {
         message: "this field is required",
      })
      .max(64),
});
type FormType = z.infer<typeof formSchema>;

const ChapterForm = ({ courseId, initialData }: Props) => {
   // hooks
   const router = useRouter();
   const [isCreating, setIsCreating] = useState<boolean>(false);
   const [isUpdating, setIsUpdating] = useState<boolean>(false);

   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
      },
   });

   // other
   const { isSubmitting, isValid } = form.formState;
   const handleSubmit = async (data: FormType) => {
      try {
         const res = await axios.post<Pick<Chapter, "id" | "title">>(
            `/api/courses/${courseId}/chapters`,
            data
         );
         toast.success("Chapter created");
         toggleCreating();

         // rerender new data
         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };

   const handleReorderChapters = async (
      updatedData: Pick<Chapter, "id" | "position">[]
   ) => {
      try {
         setIsUpdating(true);
         await axios.put(
            `/api/courses/${courseId}/chapters/reorder`,
            updatedData
         );
         toast.success("Reordered chapters successfully");
         router.refresh();
      } catch (error) {
         toast.error("Somthing went wrong");
         router.refresh();
      } finally {
         setIsUpdating(false);
      }
   };

   const toggleCreating = () => setIsCreating((state) => !state);
   const toggleUpdating = () => setIsCreating((state) => !state);

   return (
      <div className="relative bg-slate-100 rounded-md p-4">
         {isUpdating && (
            <div className="absolute inset-0 rounded-md grid place-content-center bg-slate-500/20">
               <Loader2 className="w-8 h-8 animate-spin" />
            </div>
         )}
         <div className="font-medium flex items-center justify-between mb-2">
            <h3>Course Chapters</h3>
            <Button
               onClick={toggleCreating}
               variant="link"
               className="border-none"
            >
               {isCreating ? (
                  "Cancel"
               ) : (
                  <>
                     <PlusCircle className="h-4 w-4 mr-2" />
                     Add Chapter
                  </>
               )}
            </Button>
         </div>
         {!isCreating ? (
            <div
               className={cn(
                  "text-sm text-slate-500",
                  !initialData.chapters.length && "italic"
               )}
            >
               {initialData.chapters.length === 0 ? (
                  <h6>No Chapter</h6>
               ) : (
                  <>
                     <ChaptersList
                        items={initialData.chapters}
                        onReorder={handleReorderChapters}
                     />
                     <p className="mt-1">
                        Drag and drop to reorder the chapters{" "}
                     </p>
                  </>
               )}
            </div>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                     name="title"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>chapter title</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isSubmitting}
                                 placeholder="e.g. 'Introduction to the course'"
                                 variant="inherit"
                              />
                           </FormControl>
                           <div className="flex justify-between items-center pt-1">
                              <Button
                                 disabled={!isValid || isSubmitting}
                                 type="submit"
                                 variant="outline"
                              >
                                 Create
                              </Button>
                           </div>
                        </FormItem>
                     )}
                  />
               </form>
            </Form>
         )}
      </div>
   );
};

export default ChapterForm;

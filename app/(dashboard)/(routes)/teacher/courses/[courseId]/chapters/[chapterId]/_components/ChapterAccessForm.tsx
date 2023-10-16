"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Pencil, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormLabel,
   FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Transitioned from "@/components/global/Transitioned";

const formSchema = z.object({
   isFree: z.boolean().default(false),
});
type FormType = z.infer<typeof formSchema>;

type AppProps = {
   initialData: {
      isFree: boolean;
   };
   courseId: string;
   chapterId: string;
};

const ChapterAccessForm = ({ chapterId, courseId, initialData }: AppProps) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState(false);

   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         isFree: initialData.isFree,
      },
   });

   // other
   const { isSubmitting, isValid } = form.formState;
   const handleSubmit = async (data: FormType) => {
      try {
         await axios.patch(
            `/api/courses/${courseId}/chapters/${chapterId}`,
            data
         );
         toast.success("Chapter Updated");
         toggleEdit();
         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };
   const toggleEdit = () => setIsEditing((state) => !state);

   return (
      <div className="relative bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <h4>Chapter Access Control</h4>

            <Button
               disabled={isSubmitting}
               onClick={toggleEdit}
               variant="link"
               className="border-none"
            >
               {isEditing ? (
                  "Cancel"
               ) : (
                  <>
                     <Pencil className="h-4 w-4 mr-2" />
                     Edit Access
                  </>
               )}
            </Button>
         </div>
         {!isEditing ? (
            <p className="text-sm text-slate-500">
               {initialData.isFree
                  ? "Chapter is free to preview"
                  : "Chapter is not free to preview"}
            </p>
         ) : (
            <Transitioned
               dependency={isEditing}
               enter="transition duration-500"
               enterFrom="opacity-0 -translate-y-4"
               enterTo="opacity-100"
            >
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                     <FormField
                        name="isFree"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                 <Transitioned.Child
                                    enter="transition duration-700"
                                    enterFrom="opacity-0 -translate-y-4"
                                    enterTo="opacity-100"
                                 >
                                    <Checkbox
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                    />
                                 </Transitioned.Child>
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                 <FormDescription>
                                    Check this box if you want to make this
                                    chapter free to preview
                                 </FormDescription>
                              </div>
                              <div className="flex justify-between items-center">
                                 <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                    size="sm"
                                    variant="outline"
                                 >
                                    Save
                                 </Button>
                              </div>
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>
            </Transitioned>
         )}
      </div>
   );
};

export default ChapterAccessForm;

"use client";

import React, { useState } from "react";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormLabel,
   FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, RefreshCcw, Verified } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import VerifiedIconbadge from "@/components/global/VerifiedIconbadge";

type Props = {
   initialData: {
      title: string;
   };
   courseId: string;
};

const formSchema = z.object({
   title: z
      .string()
      .min(1, {
         message: "this field is required",
      })
      .max(32),
});
type FormType = z.infer<typeof formSchema>;

const TitleForm = ({ courseId, initialData }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: initialData.title,
      },
   });

   // other
   const { isSubmitting, isValid } = form.formState;
   const handleSubmit = async (data: FormType) => {
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
      <div className="relative bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <VerifiedIconbadge
               title="Course Title"
               Valid={!initialData.title}
            />
            {isSubmitting ? (
               <RefreshCcw className="h-6 w-6 animate-reverse-spin-slower text-sky-400" />
            ) : (
               <Button
                  onClick={toggleEdit}
                  variant="link"
                  className="border-none"
               >
                  {isEditing ? (
                     "Cancel"
                  ) : (
                     <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Title
                     </>
                  )}
               </Button>
            )}
         </div>
         {!isEditing ? (
            <p className="text-sm text-slate-500">{initialData.title}</p>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                     name="title"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>title</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isSubmitting}
                                 placeholder="e.g. 'Advanced web development'"
                                 variant="inherit"
                              />
                           </FormControl>
                           <div className="flex justify-between items-center pt-1">
                              <FormDescription>
                                 This is your public display title.
                              </FormDescription>
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
         )}
      </div>
   );
};

export default TitleForm;

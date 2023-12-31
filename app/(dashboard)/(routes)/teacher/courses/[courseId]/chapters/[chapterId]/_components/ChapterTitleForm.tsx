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
import { Input } from "@/components/ui/input";
import VerifiedIconbadge from "@/components/global/VerifiedIconbadge";
import Transitioned from "@/components/global/Transitioned";

const formSchema = z.object({
   title: z.string().min(1).max(32),
});
type FormType = z.infer<typeof formSchema>;

type AppProps = {
   initialData: {
      title: string;
   };
   courseId: string;
   chapterId: string;
};

const ChapterTitleForm = ({ chapterId, courseId, initialData }: AppProps) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState(false);

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
            <VerifiedIconbadge
               title="Chapter Title"
               Valid={!initialData.title}
            />
            {isSubmitting ? (
               <RefreshCcw className="h-6 w-6 animate-reverse-spin-slower text-slate-400" />
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
            <div className="h-[120px]">
               <Transitioned
                  dependency={isEditing}
                  enter="transition duration-500"
                  enterFrom="opacity-0 -translate-y-2"
                  enterTo="opacity-100"
               >
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                           name="title"
                           control={form.control}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>title</FormLabel>
                                 <FormControl>
                                    <Transitioned.Child
                                       enter="transition duration-700"
                                       enterFrom="opacity-0 -translate-y-2"
                                       enterTo="opacity-100"
                                    >
                                       <Input
                                          {...field}
                                          disabled={isSubmitting}
                                          placeholder="e.g. 'Introduction to the course'"
                                          variant="inherit"
                                       />
                                    </Transitioned.Child>
                                 </FormControl>
                                 <div className="flex justify-between items-center pt-1">
                                    <FormDescription>
                                       This is your display chapter title.
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
               </Transitioned>
            </div>
         )}
      </div>
   );
};

export default ChapterTitleForm;

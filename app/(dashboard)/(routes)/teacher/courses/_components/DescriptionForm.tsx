"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, RefreshCcw, Verified } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import VerifiedIconbadge from "./VerifiedIconbadge";

type Props = {
   initialData: {
      description: string | null;
   };
   courseId: string;
};

const formSchema = z.object({
   description: z
      .string()
      .min(1, {
         message: "this field is required",
      })
      .max(256),
});
type FormType = z.infer<typeof formSchema>;

const DescriptionForm = ({ courseId, initialData }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         description: initialData.description || "",
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
               title="Description"
               Valid={!initialData.description}
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
                  ) : !initialData.description ? (
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
            )}
         </div>
         {!isEditing ? (
            <p
               className={cn(
                  "text-sm text-slate-500",
                  !initialData.description && "italic"
               )}
            >
               {initialData.description || "No description"}
            </p>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                     name="description"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>description</FormLabel>
                           <FormControl>
                              <Textarea
                                 {...field}
                                 disabled={isSubmitting}
                                 placeholder="e.g. 'This course is about...'"
                                 className="focus-visible:ring-inherit transition"
                              />
                           </FormControl>
                           <div className="flex justify-between items-center pt-1">
                              <FormDescription>
                                 This is your course description.
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

export default DescriptionForm;

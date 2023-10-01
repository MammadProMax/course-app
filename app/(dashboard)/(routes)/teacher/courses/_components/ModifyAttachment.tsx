"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Attachment } from "@prisma/client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
   Form,
   FormField,
   FormControl,
   FormLabel,
   FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteAttDialog from "./DeleteAttDialog";

type Props = {
   attachment: Attachment;
   courseId: string;
};

const formSchema = z.object({
   "edit-name": z.string().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

const ModifyAttachment = ({
   attachment: { name, url, id },
   courseId,
}: Props) => {
   const [isEditing, setEditing] = useState(false);
   const router = useRouter();
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         "edit-name": name,
      },
   });
   const { isSubmitting, isValid } = form.formState;

   const handleSubmit = async (data: FormSchema) => {
      const updateData = {
         name: data["edit-name"],
         id,
      };
      try {
         await axios.patch(`/api/courses/${courseId}/attachments`, updateData);
         toast.success("Course Updated");
         toggleEdit();
         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };

   const toggleEdit = () => setEditing((state) => !state);

   return (
      <div className="w-full my-2">
         {!isEditing ? (
            <div className=" w-full flex flex-wrap items-center justify-between gap-x-4 px-2">
               <Link
                  target="_blank"
                  href={url}
                  className="shrink-0 w-1/3 truncate hover:underline"
               >
                  {name}
               </Link>
               <div>
                  <Button
                     onClick={toggleEdit}
                     variant="outline"
                     className="mx-2"
                     size="sm"
                  >
                     Edit name
                  </Button>
                  <DeleteAttDialog
                     context={{ id, url }}
                     courseId={courseId}
                     toggleEdit={toggleEdit}
                  />
               </div>
            </div>
         ) : (
            <div className="w-full">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                     <FormField
                        control={form.control}
                        name="edit-name"
                        render={({ field }) => (
                           <FormItem className="flex w-full items-center justify-between space-y-0">
                              <FormControl>
                                 <Input
                                    className="w-1/2"
                                    {...field}
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Advanced web development'"
                                    variant="inherit"
                                 />
                              </FormControl>
                              <div>
                                 <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                    size="sm"
                                    variant="outline"
                                    className="mx-1"
                                 >
                                    Save
                                 </Button>
                                 <Button
                                    disabled={!isValid || isSubmitting}
                                    type="button"
                                    size="sm"
                                    variant="link"
                                    onClick={toggleEdit}
                                 >
                                    cancel
                                 </Button>
                              </div>
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>
            </div>
         )}
      </div>
   );
};

export default ModifyAttachment;

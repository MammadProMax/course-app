"use client";

import React from "react";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormMessage,
   FormLabel,
   FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import CustomToaster from "@/components/global/CustomToaster";

const formSchema = z.object({
   title: z
      .string()
      .min(1, {
         message: "this field is required",
      })
      .max(32),
});
type FormType = z.infer<typeof formSchema>;
const CreateCoursePage = () => {
   const router = useRouter();
   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
      },
   });

   const { isSubmitting, isValid } = form.formState;
   const onSubmit: SubmitHandler<FormType> = async (data) => {
      try {
         const response = await axios.post("/api/courses", data);
         toast.success("Course created");
         router.push(`/teacher/courses/${response.data.id}`);
      } catch (error) {
         toast.error("somthing went wrong");
      }
   };

   return (
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
         <div className="rounded-sm h-fit p-8">
            <h1 className="text-2xl font-medium">Name your course</h1>
            <p>
               What would you like to name your course? Don&apos;t worry, you
               can change this later.
            </p>
            <Form {...form}>
               <form className="my-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem className="my-6">
                           <FormLabel>Course title</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={isSubmitting}
                                 placeholder="e.g. 'Advanced web development'"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>
                              What will you teach in this course
                           </FormDescription>
                        </FormItem>
                     )}
                  />
                  <div className="flex items-center gap-x-2">
                     <Button type="button" variant="ghost" asChild>
                        <Link href="/">Cancel</Link>
                     </Button>
                     <Button type="submit" disabled={!isValid || isSubmitting}>
                        Submit
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default CreateCoursePage;

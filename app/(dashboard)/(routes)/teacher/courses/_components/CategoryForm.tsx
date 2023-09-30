"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Pencil, Plus, Verified } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Combobox, ComboboxItems } from "@/components/ui/combobox";
import VerifiedIconbadge from "./VerifiedIconbadge";

type Props = {
   initialData: {
      categoryId: string | null;
   };
   courseId: string;
   options: ComboboxItems;
};

const formSchema = z.object({
   categoryId: z.string().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

const CategoryForm = ({ courseId, initialData, options }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         categoryId: initialData.categoryId || "",
      },
   });

   // other
   const { isSubmitting, isValid } = form.formState;
   const handleSubmit = async (data: FormSchema) => {
      try {
         await axios.patch(`/api/courses/${courseId}`, data);
         toast.success("course updated");
         toggleEdit();
         router.refresh();
      } catch {
         toast.error("somthing went wrong");
      }
   };
   const toggleEdit = () => setIsEditing((state) => !state);

   const selectedOption = options.find(
      (option) => option.value === initialData.categoryId
   );
   return (
      <div className="bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <VerifiedIconbadge
               title="Category"
               Valid={!initialData.categoryId}
            />
            <Button
               disabled={isSubmitting}
               onClick={toggleEdit}
               variant="link"
               className="border-none"
            >
               {isEditing ? (
                  "Cancel"
               ) : !initialData.categoryId ? (
                  <>
                     <Plus className="h-4 w-4 mr-2" />
                     Add Category
                  </>
               ) : (
                  <>
                     <Pencil className="h-4 w-4 mr-2" />
                     Edit Category
                  </>
               )}
            </Button>
         </div>
         {!isEditing ? (
            <p
               className={cn(
                  "text-sm text-slate-500",
                  !initialData.categoryId && "italic"
               )}
            >
               {selectedOption?.label || "No category"}
            </p>
         ) : (
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                     <FormField
                        disabled={isSubmitting}
                        name="categoryId"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Combobox itemList={options} {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        size="sm"
                        className="mt-2"
                        variant="outline"
                     >
                        Submit
                     </Button>
                  </form>
               </Form>
            </div>
         )}
      </div>
   );
};

export default CategoryForm;

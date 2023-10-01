"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormLabel,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, RefreshCcw, Verified } from "lucide-react";
import toast from "react-hot-toast";
import VerifiedIconbadge from "./VerifiedIconbadge";

type Props = {
   initialData: {
      price: number | null;
   };
   courseId: string;
};

const formSchema = z.object({
   price: z.coerce.number().max(60000),
});
type FormType = z.infer<typeof formSchema>;

const PriceForm = ({ courseId, initialData }: Props) => {
   // hooks
   const router = useRouter();
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         price: initialData.price || 0,
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
   const price = initialData.price ? formatPrice(initialData.price) : "FREE";

   return (
      <div className="relative bg-slate-100 rounded-md p-4">
         <div className="font-medium flex items-center justify-between">
            <VerifiedIconbadge
               title="Course Price"
               Valid={!initialData.price}
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
                  ) : !initialData.price ? (
                     <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Price
                     </>
                  ) : (
                     <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Price
                     </>
                  )}
               </Button>
            )}
         </div>
         {!isEditing ? (
            <p
               className={cn(
                  "text-sm text-slate-500",
                  !initialData.price && "italic"
               )}
            >
               {price}
            </p>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                     name="price"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>price</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="number"
                                 disabled={isSubmitting}
                                 placeholder="e.g. '223'"
                                 className="focus-visible:ring-inherit transition"
                              />
                           </FormControl>

                           <FormMessage />

                           <div className="flex justify-between items-center pt-1">
                              <FormDescription>
                                 <p>This is your course price.</p>
                                 <p className="mt-1">
                                    if you set price 0 it will be accessable for
                                    FREE
                                 </p>
                              </FormDescription>
                              <Button
                                 disabled={isSubmitting}
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

export default PriceForm;

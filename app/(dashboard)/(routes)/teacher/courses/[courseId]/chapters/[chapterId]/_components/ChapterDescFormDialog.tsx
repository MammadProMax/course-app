import React from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormLabel,
   FormItem,
} from "@/components/ui/form";
import QuillEditor from "@/components/global/QuillEditor";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
   description: z.string().min(1).max(256),
});
type FormType = z.infer<typeof formSchema>;

type AppProps = {
   initialData: {
      description: string | null;
   };
   chapterId: string;
   courseId: string;
   toggleDialog: () => void;
};

const ChapterDescFormDialog = ({
   chapterId,
   courseId,
   initialData,
   toggleDialog,
}: AppProps) => {
   // hooks
   const router = useRouter();

   const form = useForm<FormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         description: initialData.description || "",
      },
   });
   // other
   const { isSubmitting, isValid } = form.formState;
   const handleSubmit = async (data: FormType) => {
      const filteredData = data.description.includes("<br>")
         ? {
              description: null,
           }
         : data;

      toggleDialog();
      const update = axios.patch(
         `/api/courses/${courseId}/chapters/${chapterId}`,
         filteredData
      );
      await toast.promise(update, {
         loading: "saving ...",
         error: "Somthing went wrong",
         success: "Description saved",
      });
      router.refresh();
   };
   return (
      <div className="px-6 pt-5">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
               <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <QuillEditor {...field} className="h-40 mb-14" />
                        </FormControl>
                        <div className="flex justify-between items-center pt-1">
                           <FormDescription>
                              This is the chapter description.
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
      </div>
   );
};

export default ChapterDescFormDialog;

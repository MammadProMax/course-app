import React, { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const QuillEditor = ({
   value,
   onChange,
   className,
}: {
   value: string;
   onChange: (value: string) => void;
   className?: string;
}) => {
   const Component = useMemo(
      () =>
         dynamic(() => import("react-quill"), {
            ssr: false,
            loading: () => (
               <div className="w-full h-full grid place-content-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
               </div>
            ),
         }),
      []
   );

   return (
      <Component
         className={cn("bg-white", className)}
         onChange={onChange}
         value={value}
         theme="snow"
      />
   );
};

export default QuillEditor;

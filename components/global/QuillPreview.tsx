import React, { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";
import { Loader2 } from "lucide-react";

const QuillPreview = ({ value }: { value: string }) => {
   const Component = useMemo(
      () =>
         dynamic(() => import("react-quill"), {
            ssr: false,
            loading: () => <Loader2 className="w-5 h-5 animate-spin m-3" />,
         }),
      []
   );

   return <Component readOnly value={value} theme="bubble" />;
};

export default QuillPreview;

import React from "react";
import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type AppProps = {
   onChange: (url?: string) => void;
   endpoint: keyof OurFileRouter;
   onUpdloadBegin?: () => void;
};

const FileUploader = ({ endpoint, onChange, onUpdloadBegin }: AppProps) => {
   return (
      <UploadDropzone
         onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
         }}
         onUploadError={(err) => toast.error(err.message)}
         onUploadBegin={onUpdloadBegin}
         endpoint={endpoint}
      />
   );
};

export default FileUploader;

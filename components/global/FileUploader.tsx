import React from "react";
import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type AppProps = {
   onChange: (url?: string) => void;
   endpoint: keyof OurFileRouter;
};

const FileUploader = ({ endpoint, onChange }: AppProps) => {
   return (
      <UploadDropzone
         onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
         }}
         onUploadError={(err) => toast.error(err.message)}
         endpoint={endpoint}
      />
   );
};

export default FileUploader;

import { X } from "lucide-react";
import React from "react";

type Props = {
   handleReset: () => void;
};

export const ResetButton = ({ handleReset }: Props) => {
   return (
      <button className="absolute top-3 right-2" onClick={handleReset}>
         <X className="w-4 h-4" />
      </button>
   );
};

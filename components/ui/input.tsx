import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const InputVariance = cva("", {
   variants: {
      variant: {
         default: "",
         inherit: "focus-visible:ring-inherit",
      },
   },
   defaultVariants: {
      variant: "default",
   },
});
type InputVariant = VariantProps<typeof InputVariance>;

export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement>,
      InputVariant {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ variant, className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(
               "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition",
               InputVariance({ variant }),
               className
            )}
            ref={ref}
            {...props}
         />
      );
   }
);
Input.displayName = "Input";

export { Input };

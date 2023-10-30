import React from "react";

import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

const bannerVariants = cva(
   "border text-center p-4 text-sm flex items-center w-full",
   {
      variants: {
         variant: {
            warning: "bg-yellow-200/80 border-yellow-300 text-primary",
            success: "bg-emerald-700 border-emerald-800 text-secondary",
            destructive: "bg-red-400/80 border-red-600 text-primary",
         },
      },
      defaultVariants: {
         variant: "warning",
      },
   }
);

type AppProps = VariantProps<typeof bannerVariants> & {
   label: string | React.ReactNode;
   className?: string;
   iconSize?: "sm" | "md" | "lg" | "xl";
};
const iconMap = {
   warning: AlertTriangle,
   success: CheckCircle,
   destructive: AlertCircle,
};

const Banner = ({ variant, label, className, iconSize }: AppProps) => {
   const Icon = iconMap[variant || "warning"];
   const _iconSize = {
      sm: "h-4 w-4 mr-2",
      md: "h-5 w-5 mr-2",
      lg: "h-6 w-6 mr-2",
      xl: "h-7 w-7 mr-3",
   };
   return (
      <div className={cn(bannerVariants({ variant }), className)}>
         <Icon className={_iconSize[iconSize || "sm"]} />
         {label}
      </div>
   );
};

export default Banner;

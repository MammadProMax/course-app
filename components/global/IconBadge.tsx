import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bgVariants = cva("rounded-full flex items-center justify-center", {
   variants: {
      bgVariant: {
         default: "bg-sky-100",
         succuss: "bg-emerald-100",
      },

      bgSize: {
         default: "p-2",
         sm: "p-1",
      },
   },
   defaultVariants: {
      bgVariant: "default",
      bgSize: "default",
   },
});

const IconVariants = cva("", {
   variants: {
      iconVariants: {
         default: "text-sky-700",
         success: "text-emerald-700",
      },
      iconSize: {
         default: "h-8 w-8",
         sm: "h-4 w-4",
      },
   },
   defaultVariants: {
      iconVariants: "default",
      iconSize: "default",
   },
});

type BackgroundVariantsProps = VariantProps<typeof bgVariants>;
type IconVariantsProps = VariantProps<typeof IconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
   icon: LucideIcon;
}

export const IconBadge = ({
   icon: Icon,
   bgSize,
   bgVariant,
   iconSize,
   iconVariants,
}: IconBadgeProps) => {
   return (
      <div className={cn(bgVariants({ bgSize, bgVariant }))}>
         <Icon className={cn(IconVariants({ iconSize, iconVariants }))} />
      </div>
   );
};

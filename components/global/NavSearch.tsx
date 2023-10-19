"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import useDebounce from "@/hooks/useDebounce";
import { ResetButton } from "./ResetButton";

export default function NavSearch() {
   const [value, setValue] = useState("");
   const debouncedValue = useDebounce(value);

   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const currentCategoryId = searchParams.get("categoryId");

   useEffect(() => {
      const url = qs.stringifyUrl(
         {
            url: pathname,
            query: {
               categoryId: currentCategoryId,
               title: debouncedValue,
            },
         },
         { skipNull: true, skipEmptyString: true }
      );
      router.push(url);
   }, [debouncedValue, currentCategoryId, pathname, router]);
   return (
      <div className="relative">
         <Search className="h-4 w-4 absolute left-3 top-3 text-slate-600" />
         <Input
            value={value}
            className="w-full md:w-[300px] pl-9 rounded-lg bg-slate-100 focus-visible:ring-slate-200"
            onChange={(ev) => setValue(ev.target.value)}
            placeholder="Search for a course"
         />
         {value && <ResetButton handleReset={() => setValue("")} />}
      </div>
   );
}

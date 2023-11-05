import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
   return (
      <>
         <main className="w-full h-full bg-gray-100">{children}</main>
      </>
   );
}

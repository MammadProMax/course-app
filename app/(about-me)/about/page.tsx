import React from "react";
import Profile from "./_component/Profile";

export default function AboutPage() {
   return (
      <div className="flex max-w-5xl h-full mx-auto pt-9">
         <div className="w-1/3 relative">
            <Profile />
         </div>

         <div>{/* Expericence */}</div>
      </div>
   );
}

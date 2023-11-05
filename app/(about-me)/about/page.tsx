import React from "react";
import Profile from "./_component/Profile";
import Expericence from "./_component/Expericence";

export default function AboutPage() {
   return (
      <div className="flex gap-x-6 w-full sm:max-w-6xl h-full sm:mx-auto md:pt-9 justify-center">
         <div className="w-1/3 relative hidden lg:block">
            <Profile />
         </div>

         <div className="w-full h-full sm:w-2/3 lg:mt-36 lg:h-[80%]">
            <Expericence />
         </div>
      </div>
   );
}

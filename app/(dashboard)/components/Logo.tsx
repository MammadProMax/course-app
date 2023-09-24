import React from "react";
import Image from "next/image";

const Logo = () => {
   return (
      <Image
         className="mx-6 mb-2"
         alt="logo"
         height={130}
         width={130}
         src="/logo.svg"
      />
   );
};

export default Logo;

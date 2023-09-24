import React from "react";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
   return (
      <nav className="p-4 border-b h-full flex items-center bg-white shadow-sm">
         <MobileSidebar />
      </nav>
   );
};

export default Navbar;

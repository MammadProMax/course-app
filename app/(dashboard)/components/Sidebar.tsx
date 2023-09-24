import React from "react";

// components
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
   return (
      <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm py-5 gap-2">
         <Logo />
         <SidebarRoutes />
      </div>
   );
};

export default Sidebar;

import React from "react";

// components
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="h-full">
         <div className="hidden md:flex flex-col fixed inset-y-0 z-50 left-0 h-full w-56">
            <Sidebar />
         </div>
         <main className="md:ml-56 h-full">{children}</main>
      </div>
   );
};

export default DashboardLayout;

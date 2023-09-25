import React from "react";

// components
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="h-full">
         <div className="h-[80px] md:ml-56 sticky inset-x-0 z-50 top-0">
            <Navbar />
         </div>
         <div className="hidden md:flex flex-col fixed inset-y-0 z-50 left-0 h-full w-56">
            <Sidebar />
         </div>
         <main className="md:ml-56 h-[91.45%]">{children}</main>
      </div>
   );
};

export default DashboardLayout;

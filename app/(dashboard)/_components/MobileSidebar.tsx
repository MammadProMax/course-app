import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
   return (
      <Sheet>
         <SheetTrigger className="md:hidden pr-4 hover:opacity-80 transition">
            <Menu size={22} />
         </SheetTrigger>
         <SheetContent side={"left"} className="p-0 border-0">
            <Sidebar />
         </SheetContent>
      </Sheet>
   );
};

export default MobileSidebar;

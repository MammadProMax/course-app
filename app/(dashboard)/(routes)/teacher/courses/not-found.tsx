import Link from "next/link";
import { XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
   <div className="flex flex-col w-full h-full justify-center items-center space-y-3 text-center">
      <XOctagon className="text-red-600 w-11 h-11" />
      <h2 className="text-xl font-bold">
         The Course you are looking for is Not Found
      </h2>
      <p className="text-slate-500">Has been deleted or not been created yet</p>
      <Button asChild variant="outline">
         <Link href="/">Return Home</Link>
      </Button>
   </div>
);
export default NotFound;

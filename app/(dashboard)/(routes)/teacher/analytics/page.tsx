import React from "react";

import { getAnalytics } from "@/fetchers/getAnalytics";

import { AlertCircle } from "lucide-react";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";

const AnalyticsPage = async () => {
   const { data, totalRevenue, totalSales } = await getAnalytics();

   return (
      <div className="p-6 h-full">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DataCard
               label="Total Revenue"
               value={totalRevenue}
               shouldFormat={true}
            />
            <DataCard label="Total Sales" value={totalSales} />
         </div>
         {!data.length ? (
            <div className="flex flex-col gap-1 justify-center items-center font-semibold text-2xl h-3/5">
               <AlertCircle className="text-red-600 w-10 h-10" />
               No Analytics available
               <p className="font-normal text-base text-slate-400">
                  Make sure publish a purchasable course
               </p>
            </div>
         ) : (
            <Chart data={data} />
         )}
      </div>
   );
};

export default AnalyticsPage;

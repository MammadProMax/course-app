import { getCourses } from "@/fetchers/getDashboardCourses";
import CourseList from "@/components/global/CourseList";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/InfoCard";

export default async function Home() {
   const { completedCourses, coursesInProgress } = await getCourses();
   const noCourse = !completedCourses.length && !coursesInProgress.length;

   return (
      <div className="p-6 space-y-4 h-full">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
               icon={Clock}
               label="In Progress"
               numberOfItems={coursesInProgress.length}
            />
            <InfoCard
               icon={CheckCircle}
               label="Completed"
               numberOfItems={completedCourses.length}
            />
         </div>
         <>
            {noCourse ? (
               <div className="grid place-content-center h-4/5 font-semibold">
                  No course available
               </div>
            ) : (
               <CourseList
                  items={[...completedCourses, ...coursesInProgress]}
               />
            )}
         </>
      </div>
   );
}

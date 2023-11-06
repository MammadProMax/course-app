import React from "react";
import ExperienceCol from "./ExperienceCol";
import { GanttChartSquare, GraduationCap } from "lucide-react";
import IconBadge from "./IconBadge";

import Image from "next/image";
import ProfileBadge from "./ProfileBadge";

import {
   EducationList,
   ProjectsList,
   profileBadgeList,
   skillsList,
} from "../_constants/index";

export default function Expericence() {
   return (
      <div className="w-full h-full lg:h-4/5 bg-white rounded-md pb-10">
         <h2 className="lg:hidden font-bold text-4xl pt-11 pl-12">
            Mohammad Khalili
         </h2>
         <div className="lg:hidden w-full h-72 flex justify-start items-center px-12 gap-6">
            <Image
               src={"/profile.jpg"}
               alt="profile picture"
               width={100}
               height={100}
               className="w-56 h-56 rounded-md hidden sm:block"
            />
            <div className="sm:w-64 w-full">
               {profileBadgeList.map((item, index) => (
                  <ProfileBadge
                     key={index}
                     icon={item.icon}
                     description={item.description}
                     label={item.label}
                  />
               ))}
            </div>
         </div>

         <div className="flex items-center gap-3 justify-center px-12 pt-8">
            <div className="h-0.5 w-2/3 bg-red-700 rounded-lg"></div>
            <h1 className="text-3xl font-semibold ">Resume</h1>
            <div className="h-0.5 w-2/3 bg-red-700 rounded-lg"></div>
         </div>

         <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-center gap-x-3 h-fit mt-7 px-12">
            <ExperienceCol
               icon={GraduationCap}
               header="Education"
               list={EducationList}
            />
            <ExperienceCol
               icon={GanttChartSquare}
               header="Projects"
               list={ProjectsList}
            />
         </div>

         <div className="flex items-center gap-3 justify-center px-12 pt-8">
            <div className="h-0.5 w-2/3 bg-red-700 rounded-lg"></div>
            <h1 className="text-3xl font-semibold ">Skills</h1>
            <div className="h-0.5 w-2/3 bg-red-700 rounded-lg"></div>
         </div>

         <div className="py-6 flex gap-4 flex-row flex-wrap px-8">
            {skillsList.map((item, index) => (
               <IconBadge
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  className={item.className}
               />
            ))}
         </div>
      </div>
   );
}

import React from "react";
import ExperienceCol, { ExperienceColItem } from "./ExperienceCol";
import { GanttChartSquare, GraduationCap } from "lucide-react";
import IconBadge, { IconBadgeProps } from "./IconBadge";

import {
   BiLogoJavascript,
   BiLogoTypescript,
   BiLogoReact,
   BiLogoNodejs,
} from "react-icons/bi";
import { SiPrisma, SiExpress } from "react-icons/si";

const EducationList: ExperienceColItem[] = [
   {
      Date: "23 Septamber , 2021",
      description: "Software Developement",
      title: "Pardis Islamic University",
   },
];
const ProjectsList: ExperienceColItem[] = [
   {
      Date: "5 Novamber , 2023",
      description: "somthing like Udemy clone.",
      title: "Learning Management System",
      etc: {
         link: "/",
         title: "Click Here",
      },
   },
];
const skillsList: IconBadgeProps[] = [
   {
      icon: BiLogoJavascript,
      label: "JavaScript",
      className: "text-[#efd81c]",
   },
   {
      icon: BiLogoTypescript,
      label: "TypeScript",
      className: "text-[#2f74c0]",
   },
   {
      icon: BiLogoReact,
      label: "React",
      className: "text-[#5ed3f3]",
   },
   {
      icon: BiLogoNodejs,
      label: "Nodejs",
      className: "text-[#6fa361]",
   },
   {
      icon: SiExpress,
      label: "Expressjs",
      className: "",
   },
   {
      icon: SiPrisma,
      label: "Prisma",
      className: "text-slate-800",
   },
];

export default function Expericence() {
   return (
      <div className="w-full h-full md:h-4/5 bg-white rounded-md pb-10">
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

         <div className="pt-6 flex gap-4 flex-row flex-wrap px-8">
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

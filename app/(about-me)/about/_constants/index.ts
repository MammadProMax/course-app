import {
   LucideIcon,
   MapPin,
   MailOpen,
   CalendarDays,
   PhoneCall,
} from "lucide-react";
import { IconType } from "react-icons";
import { SiPrisma, SiExpress } from "react-icons/si";
import {
   BiLogoJavascript,
   BiLogoTypescript,
   BiLogoReact,
   BiLogoNodejs,
} from "react-icons/bi";
// icons

import { IconBadgeProps } from "../_component/IconBadge";
import { ExperienceColItem } from "../_component/ExperienceCol";

export const profileBadgeList: {
   icon: IconType | LucideIcon;
   label: string;
   description: string;
}[] = [
   {
      icon: PhoneCall,
      description: "+98 9363290367",
      label: "Phone",
   },
   {
      icon: MapPin,
      description: "Tehran Iran",
      label: "Location",
   },
   {
      icon: MailOpen,
      description: "mhaagrm2@gmail.com",
      label: "Email",
   },
   {
      icon: CalendarDays,
      description: "18 January, 2002",
      label: "Birth",
   },
];

export const EducationList: ExperienceColItem[] = [
   {
      Date: "23 Septamber , 2021",
      description: "Software Developement",
      title: "Pardis Islamic University",
   },
];
export const ProjectsList: ExperienceColItem[] = [
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
export const skillsList: IconBadgeProps[] = [
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

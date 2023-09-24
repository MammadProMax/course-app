import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
   return (
      <>
         <UserButton afterSignOutUrl="/" />
      </>
   );
}

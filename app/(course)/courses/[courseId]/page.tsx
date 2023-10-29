import React from "react";

type Props = {
   params: {
      courseId: string;
   };
};

export default function Page({ params: { courseId } }: Props) {
   return <div>page</div>;
}

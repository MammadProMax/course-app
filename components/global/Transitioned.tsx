"use client";

import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

type AppProps = {
   dependency: boolean;
   enter: string;
   enterFrom: string;
   enterTo: string;
   children: React.ReactNode;
};

const Transitioned = ({
   children,
   dependency,
   enter,
   enterFrom,
   enterTo,
}: AppProps) => {
   const [show, setShow] = useState(false);
   useEffect(() => {
      dependency
         ? setTimeout(() => {
              setShow(true);
           }, 1)
         : setShow(false);
   }, [dependency]);

   return (
      <Transition
         show={show}
         enter={enter}
         enterFrom={enterFrom}
         enterTo={enterTo}
      >
         {children}
      </Transition>
   );
};

const TransitionedChild: FC<
   PropsWithChildren<{
      enter: string;
      enterFrom: string;
      enterTo: string;
   }>
> = ({ children, enter, enterFrom, enterTo }) => {
   return (
      <Transition.Child enter={enter} enterFrom={enterFrom} enterTo={enterTo}>
         {children}
      </Transition.Child>
   );
};

Transitioned.Child = TransitionedChild;

export default Transitioned;

"use client";

import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function ReactQueryProvider({ children }: PropsWithChildren) {
   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   );
}

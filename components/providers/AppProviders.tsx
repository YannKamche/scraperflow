// Contains all the providers needed to wrap the entire application
"use client";

import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProviders({ children }: { children: React.ReactNode }) {
  //definition of tanstack query
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>

      {/* ReactQuery Dev tools will only be visible in dev mode. The dev tools is an inspector for the queries and mutaions we will run 

    WHY USING REACT QUERY FOR CALLING SERVER ACTIONS FROM THE FRONTEND?
      We don't actually need ReactQuery to do so. The reason we use react query is because it provides extra utilities like
      - CALLBACKS (SUCCESS, FAIL)
      - CACHING
      - REFETCH INTERVALS
      - QUERY KEYS
      - AND MANY OTHERS!
    */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type QueryProviderType = {
  children: ReactNode;
};

export default function QueryProvider({ children }: QueryProviderType) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

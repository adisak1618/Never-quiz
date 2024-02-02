"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type AuthProviderType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}

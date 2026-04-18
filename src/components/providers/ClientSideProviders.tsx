"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor").then(mod => mod.CustomCursor), {
  ssr: false,
});

export function ClientSideProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CustomCursor />
      {children}
    </LanguageProvider>
  );
}

"use client";

import { LenisProvider as LenisProviderComponent } from "@/hooks/use-lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <LenisProviderComponent>{children}</LenisProviderComponent>;
}

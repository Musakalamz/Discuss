"use client";

import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
}
export default function Provider({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

"use client";

import { ThemeProvider } from "next-themes";
import type { ComponentProps } from "react";

export function Providers(props: ComponentProps<typeof ThemeProvider>) {
  return <ThemeProvider {...props} />;
}

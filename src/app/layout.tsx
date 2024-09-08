import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

export type ChildrenType = { children: Readonly<React.ReactNode> };

export const metadata: Metadata = {
  title: "Gem's Surplus Consumer Goods Trading",
  description: "This is Gems! Your Bestie",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <ClerkProvider afterSignOutUrl="/login">
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

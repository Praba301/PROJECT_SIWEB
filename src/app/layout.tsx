import type { Metadata } from "next";
import { spaceGrotesk, spaceMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praketrio – Pengiriman Laut Terpercaya",
  description:
    "Platform pelacakan pengiriman terpercaya untuk bisnis Indonesia dan global.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
title: "Lacak Paket | Praketrio",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
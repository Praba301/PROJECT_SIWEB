import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input Barang | Praketrio",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
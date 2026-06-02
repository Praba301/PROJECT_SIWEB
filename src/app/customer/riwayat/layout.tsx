import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat | Praketrio",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
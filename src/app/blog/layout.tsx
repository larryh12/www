import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Larry Huynh",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

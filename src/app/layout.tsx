import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azeem Gbadamosi - Interaction Designer",
  description:
    "Interaction designer and UX Researcher with a proven track record of transforming ideas into compelling digital experiences in government, fintech, business, education, entertainment and blockchain scenes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)]">
        <Sidebar />
        <MobileNav />
        <div className="md:pl-20 pb-16 md:pb-0">{children}</div>
      </body>
    </html>
  );
}

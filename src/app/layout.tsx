import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Script from "next/script";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)]">
        <Script id="theme" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem("currentToggleState");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",d?"dark":"light");}catch(e){}})();`}
        </Script>
        <Sidebar />
        <MobileNav />
        <div className="pb-20 md:pl-[72px] md:pb-0 xl:pl-[288px]">{children}</div>
      </body>
    </html>
  );
}

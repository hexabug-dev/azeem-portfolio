"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Briefcase, LayoutList, User, PenLine, Mail, Moon, Sun } from "lucide-react";
import { socialLinks } from "@/lib/data";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/User-Experience-Interaction-Design", label: "Products", icon: Briefcase },
  { href: "/visual-playground", label: "Playground", icon: LayoutList },
  { href: "/about", label: "About", icon: User },
  { href: "/blog", label: "Blog", icon: PenLine },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("currentToggleState", next ? "dark" : "light");
    } catch {}
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] flex-col justify-between border-r border-[var(--border)] bg-[var(--bg)] py-6 md:flex xl:w-[288px] xl:items-stretch xl:px-6">
      <div>
        <Link href="/" className="flex flex-col items-center xl:items-start xl:pl-[37px]">
          <Image
            src="/media/jjQiVkJ7P7L2gLbhkHRgZioVA.png"
            alt="Azeem Gbadamosi"
            width={56}
            height={56}
            className="h-10 w-10 rounded-xl xl:h-14 xl:w-14"
            priority
          />
          <span className="mt-3 hidden text-[17px] font-semibold leading-tight text-[var(--fg)] xl:block">
            Azeem Gbadamosi
          </span>
          <span className="hidden text-[14px] text-[var(--fg-muted)] xl:block">
            Interaction Designer
          </span>
        </Link>

        <div className="mt-6 flex flex-col items-center gap-3 xl:mt-5 xl:flex-row xl:justify-start xl:pl-[56px]">
          <SocialIcon href={socialLinks.instagram} label="Instagram">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon href={socialLinks.behance} label="Behance">
            <span className="text-[13px] font-bold">Bē</span>
          </SocialIcon>
          <SocialIcon href={socialLinks.linkedin} label="LinkedIn">
            <LinkedinIcon />
          </SocialIcon>
        </div>

        <nav className="mt-8 flex flex-col items-center gap-1 xl:mt-8 xl:items-stretch">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group relative">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors xl:w-full xl:justify-start xl:gap-3 xl:px-3 ${
                    active
                      ? "bg-[var(--surface)] text-[var(--fg)] shadow-sm"
                      : "text-[var(--fg-muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.75} />
                  <span className="hidden text-[15px] font-medium xl:inline">{item.label}</span>
                </motion.span>
                <span className="pointer-events-none absolute left-14 top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-[var(--surface)] px-2 py-1 text-xs text-[var(--fg)] opacity-0 shadow transition-opacity group-hover:opacity-100 xl:hidden">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex justify-center xl:justify-start xl:pl-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--fg-muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"
          aria-label="Toggle colour theme"
        >
          {dark ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
        </motion.button>
      </div>
    </aside>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)]"
    >
      {children}
    </motion.a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.6 1-2.6 2.4-2.6 1.3 0 2.1 1 2.1 2.6V17" />
    </svg>
  );
}

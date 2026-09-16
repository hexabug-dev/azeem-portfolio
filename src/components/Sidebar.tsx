"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, LayoutGrid, User, PenSquare, Mail, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { socialLinks } from "@/lib/data";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/User-Experience-Interaction-Design", label: "Case Studies", icon: Briefcase },
  { href: "/visual-playground", label: "Playground", icon: LayoutGrid },
  { href: "/about", label: "About", icon: User },
  { href: "/blog", label: "Blog", icon: PenSquare },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col items-center justify-between border-r border-[var(--border)] bg-[var(--bg)] py-6 md:flex">
      <div className="flex flex-col items-center gap-8">
        <Link href="/">
          <motion.div
            whileHover={{ rotate: -6, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-2)] font-bold text-black"
          >
            A
          </motion.div>
        </Link>

        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group relative">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                    active
                      ? "bg-[var(--surface-2)] text-[var(--fg)]"
                      : "text-[var(--fg-muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </motion.div>
                <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[var(--surface-2)] px-2 py-1 text-xs text-[var(--fg)] opacity-0 transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4 text-[var(--fg-muted)]">
        <SocialIcon href={socialLinks.instagram}>
          <InstagramIcon />
        </SocialIcon>
        <SocialIcon href={socialLinks.behance}>
          <span className="text-[11px] font-bold">Bē</span>
        </SocialIcon>
        <SocialIcon href={socialLinks.linkedin}>
          <LinkedinIcon />
        </SocialIcon>
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDark((d) => !d)}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--surface)] hover:text-[var(--fg)]"
          aria-label="Toggle theme"
        >
          {dark ? <Moon size={16} strokeWidth={1.75} /> : <Sun size={16} strokeWidth={1.75} />}
        </motion.button>
      </div>
    </aside>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.6 1-2.6 2.4-2.6 1.3 0 2.1 1 2.1 2.6V17" />
    </svg>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, color: "var(--fg)" }}
      whileTap={{ scale: 0.9 }}
      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--surface)]"
    >
      {children}
    </motion.a>
  );
}

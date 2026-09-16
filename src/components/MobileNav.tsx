"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, LayoutGrid, User, PenSquare, Mail } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/User-Experience-Interaction-Design", label: "Products", icon: Briefcase },
  { href: "/visual-playground", label: "Play", icon: LayoutGrid },
  { href: "/about", label: "About", icon: User },
  { href: "/blog", label: "Blog", icon: PenSquare },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[var(--border)] bg-[var(--bg)]/95 py-2 backdrop-blur md:hidden">
      {navItems.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-2 py-1 text-[10px] ${
              active ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"
            }`}
          >
            <Icon size={18} strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // from shadcn/ui, optional helper

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}

export function ActiveLink({ href, children, exact = false }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200 font-semibold",
        isActive
          ? "text-green-600"
          : "text-black "
      )}
    >
      {children}
    </Link>
  );
}

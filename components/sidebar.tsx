"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  HeadphonesIcon,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-provider";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Supplier List",
    href: "/dashboard/suppliers",
    icon: Users,
  },
  {
    title: "Buyer List",
    href: "/dashboard/buyers",
    icon: Users,
  },
  {
    title: "Verification",
    href: "/dashboard/verification",
    icon: ShieldCheck,
  },
  {
    title: "Payment",
    href: "/dashboard/payment",
    icon: CreditCard,
  },
  {
    title: "Live Support",
    href: "/dashboard/support",
    icon: HeadphonesIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-white border-gray-200 hidden md:flex flex-col h-screen">
      {/* Logo */}
      <div className="h-20 p-4 flex items-center justify-center">
        <Link href="/dashboard">
          <div className="text-blue-500 font-bold text-2xl">LOGO</div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600",
              pathname === item.href && "bg-[#F1F5F9] text-blue-600 font-bold"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Log Out */}
      <div className="p-4 border-t">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

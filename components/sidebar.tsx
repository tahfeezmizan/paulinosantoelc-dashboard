import Link from "next/link"
import { LayoutDashboard, Users, ShieldCheck, CreditCard, HeadphonesIcon, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    active: true,
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
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b">
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
              item.active && "bg-blue-50 text-blue-600",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Log Out */}
      <div className="p-4 border-t">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  )
}

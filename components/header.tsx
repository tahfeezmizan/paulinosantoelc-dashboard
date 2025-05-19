"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/components/auth-provider"

export function Header() {
  const { logout } = useAuth()

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4">
      {/* Mobile Menu Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* User Profile and Logout */}
      <div className="ml-auto flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">Super Admin</p>
          <p className="text-xs text-gray-500">bill.smith@example.com</p>
        </div>
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" onClick={logout} title="Logout">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  )
}

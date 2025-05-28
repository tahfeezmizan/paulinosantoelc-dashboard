"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetLoggedInUserQuery } from "@/redux/api/userApi";
import { Menu } from "lucide-react";

export function Header() {
  const { data: user } = useGetLoggedInUserQuery(null);
  console.log("Users",user);

  return (
    <header className="h-20 bg-white shadow-md flex items-center justify-between pr-16 z-10">
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
      <div className="ml-auto flex flex-row-reverse items-center gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-medium">
            {user?.firstName + " " + user?.lastName || "Super Admin"}
          </p>
          <p className="text-xs text-[#94A3B8]">{user?.email}</p>
        </div>
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

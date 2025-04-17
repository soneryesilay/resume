"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" }
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="flex items-center justify-center p-2" aria-label="Toggle Menu">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white dark:bg-[#191919] p-0 w-[200px] sm:w-[200px]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="h-full flex flex-col justify-center px-4">
            <nav className="flex flex-col items-center space-y-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-xl font-medium text-gray-800 dark:text-white hover:text-[#5badff] dark:hover:text-[#5badff] transition-colors relative inline-block"
                >
                  {item.label}
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ff3d00] to-[#5badff] transform scale-x-0 hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
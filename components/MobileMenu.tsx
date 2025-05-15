"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const menuItems = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#blogs", label: "Blogs" },
  { href: "#contact", label: "Contact" }
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const handleLinkClick = (href: string) => {
    // Önce menüyü kapat
    setOpen(false);
    
    // Eğer anchor link ise, scroll işlemini yap
    if (href.startsWith('#')) {
      // Menünün tamamen kapanması için biraz bekle
      setTimeout(() => {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Performans için requestAnimationFrame kullan
          requestAnimationFrame(() => {            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'auto' // 'smooth' yerine 'auto' kullanarak anında geçiş sağla
            });
          });
        }
      }, 10); // Minimal gecikme ile neredeyse anında geçiş
    }
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button 
            className="flex items-center justify-center p-2 relative" 
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              {/* Animated hamburger to X icon */}
              <motion.span 
                className="w-6 h-0.5 bg-black dark:bg-white absolute"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-black dark:bg-white absolute"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-black dark:bg-white absolute"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white dark:bg-[#191919] p-0 w-[200px] sm:w-[200px]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="h-full flex flex-col justify-between px-4">
            <div className="flex-1"></div>
            <nav className="flex flex-col items-center space-y-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                >                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault(); // Varsayılan davranışı engelle
                      handleLinkClick(item.href);
                    }}
                    className="text-xl font-medium text-gray-800 dark:text-white hover:text-[#5badff] dark:hover:text-[#5badff] transition-colors relative inline-block"
                  >
                    {item.label}
                    <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ff3d00] to-[#5badff] transform scale-x-0 hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex-1"></div>
            
            <div className="flex justify-center space-x-6 pb-10 mt-8">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/soneryesilay" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-800 dark:text-white hover:text-[#5badff] dark:hover:text-[#5badff] transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com/in/soneryesilay" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-800 dark:text-white hover:text-[#5badff] dark:hover:text-[#5badff] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
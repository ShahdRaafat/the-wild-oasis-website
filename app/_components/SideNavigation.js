// SideNavigation.js - Mobile-friendly navigation
"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      {/* Mobile menu button */}
      <div className="lg:hidden flex justify-between items-center p-4   ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-primary-900 transition-colors"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-primary-200" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-primary-200" />
          )}
        </button>
      </div>

      <nav
        className={`
        border-r border-primary-900 
        lg:block 
        ${isOpen ? "block" : "hidden"}
        absolute lg:relative 
        md:top-[100%]
        lg:top-0
        left-0 
        w-full lg:w-auto 
        bg-primary-950 lg:bg-transparent 
        z-50 lg:z-auto
        shadow-lg lg:shadow-none
      `}
      >
        <ul className="flex flex-col gap-2 h-full text-base sm:text-lg p-4 lg:p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                onClick={() => setIsOpen(false)}
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 rounded-md lg:rounded-none
                  ${pathname === link.href ? "bg-primary-900" : ""}
                `}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto pt-4 lg:pt-0">
            <SignOutButton />
          </li>
        </ul>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
export default SideNavigation;

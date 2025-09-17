"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

function NavigationClient({ session }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Main navigation container */}
      <nav className="text-lg sm:text-xl z-10 relative flex justify-end">
        {/* Mobile menu button */}
        <button
          className="sm:hidden flex flex-col gap-1 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-primary-100 transition-transform ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-primary-100 transition-opacity ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-primary-100 transition-transform ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* Desktop navigation */}
        <ul className="hidden sm:flex font-bold gap-4 lg:gap-8 xl:gap-16 items-center">
          <li>
            <Link
              href="/cabins"
              className={`hover:text-accent-400 transition-colors ${
                pathname.includes("/cabins") ? "text-accent-400" : ""
              }`}
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`hover:text-accent-400 transition-colors ${
                pathname.includes("/about") ? "text-accent-400" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className={`hover:text-accent-400 transition-colors flex items-center gap-2 lg:gap-4 ${
                  pathname.includes("/account") ? "text-accent-400" : ""
                }`}
              >
                <Image
                  className="rounded-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                  width={40}
                  height={40}
                  sizes="(max-width: 1024px) 32px, 40px"
                />
                <span className="hidden lg:inline">Guest area</span>
                <span className="lg:hidden">Account</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className={`hover:text-accent-400 transition-colors ${
                  pathname.includes("/account") ? "text-accent-400" : ""
                }`}
              >
                <span className="hidden lg:inline">Guest area</span>
                <span className="lg:hidden">Account</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {/*Mobile Navigation*/}
      <div
        className={`sm:hidden fixed top-[73px] left-4 right-4 text-accent-500  bg-primary-900 transition-all duration-300 z-50 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="font-bold">
          <li>
            <Link
              href="/cabins"
              className={`block px-4 sm:px-6 md:px-8 py-4 hover:bg-accent-400 hover:text-primary-900 transition-colors ${
                pathname.includes("/cabins")
                  ? "text-accent-400 bg-primary-900"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cabins
            </Link>
          </li>
          <li className="border-b border-primary-900">
            <Link
              href="/about"
              className={`block px-4 sm:px-6 md:px-8 py-4 hover:bg-accent-400 hover:text-primary-900 transition-colors ${
                pathname.includes("/about")
                  ? "text-accent-400 bg-primary-900"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className={`flex items-center gap-3 px-4 sm:px-6 md:px-8 py-4 hover:bg-accent-400 hover:text-primary-900 transition-colors ${
                  pathname.includes("/account")
                    ? "text-accent-400 bg-primary-900"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  className="rounded-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                  width={32}
                  height={32}
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className={`block px-4 sm:px-6 md:px-8 py-4 hover:text-accent-400 hover:bg-primary-900 transition-colors ${
                  pathname.includes("/account")
                    ? "text-accent-400 bg-primary-900"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </div>
      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
export default NavigationClient;

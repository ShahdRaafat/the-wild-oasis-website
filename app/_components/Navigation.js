"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="text-xl z-10">
      <ul className=" font-bold flex gap-16 items-center">
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
          <Link
            href="/account"
            className={`hover:text-accent-400 transition-colors ${
              pathname.includes("/account") ? "text-accent-400" : ""
            }`}
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
function NavigationClient({ session }) {
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
          {session?.user.image ? (
            <Link
              href="/account"
              className={`hover:text-accent-400 transition-colors flex items-center gap-4 ${
                pathname.includes("/account") ? "text-accent-400" : ""
              }`}
            >
              <Image
                className=" rounded-full object-cover"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
                width={48}
                height={48}
              />

              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className={`hover:text-accent-400 transition-colors ${
                pathname.includes("/account") ? "text-accent-400" : ""
              }`}
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavigationClient;

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/_styles/globals.css";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-50 mb-6 sm:mb-8 md:mb-10 tracking-tight font-normal leading-tight">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="inline-block bg-accent-500 px-6 sm:px-8 py-4 sm:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all rounded-md"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}

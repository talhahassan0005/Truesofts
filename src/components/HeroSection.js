'use client';
import Link from "next/link";
import Image from "next/image";
import { Poppins, Manrope, Inter } from "next/font/google";

// Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-white flex items-center justify-center overflow-hidden pt-0 pb-16 md:pb-24 px-6 sm:px-10 lg:px-16"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">

        {/* Left Content */}
        <div
          className={`space-y-4 z-10 order-1 lg:order-1 pl-4 lg:pl-3 mt-20 ${poppins.className}`}
        >
          <div className="inline-block bg-gray-100 text-gray-800 py-1 px-3 rounded-full shadow-[#00000029] text-sm font-semibold">
            Web, App & SaaS
          </div>

          {/* Heading with Manrope */}
          {/* Mobile text */}
          <h1
            className={`${manrope.className} text-[38px] sm:text-[45px] lg:text-[55px] leading-tight lg:leading-[72px] font-bold text-black tracking-[-0.02em]`}
          >
            <span className="block lg:hidden">
              Hire Tech Minds for Your Project
            </span>
            <span className="hidden lg:block">
              Ai & Blockchain <br /> Powered Solutions
            </span>
          </h1>

          {/* Subheading with Inter */}
          <p
            className={`${inter.className} w-[542px] text-[#1F1F1F]`} 
              style={{
                fontStyle: 'medium',
                fontWeight: 500,
                lineHeight: '26px',
                fontSize: '18px',
                letterSpacing: '-0.00em', 
              }}
          >
            Digital Transformation Company dedicated to turning your ideas into reality. We help
            businesses grow by using the newest technology and best strategies.
          </p>

          {/* Mobile: Show "Let's Talk" */}
          <Link
            href="/Contactpage"
            className="inline-block bg-[#095BE8] hover:bg-[#095BE8] text-white px-6 py-3 rounded-full font-medium transition lg:hidden"
          >
            Let’s Talk
          </Link>

          {/* Desktop: Show "Connect with Experts" */}
          <Link
            href="/Contactpage"
            className={`hidden lg:inline-block px-6 py-2 rounded-full font-semibold transition text-[18px] leading-[24px] tracking-[0px] ${inter.className}`}
            style={{
              backgroundColor: "#5E40F5",
              color: "white",
            }}
          >
            Connect with Experts
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative order-2 lg:order-2 mt-2">
          <Image
            src="/Herosection.png"
            alt="Herosection"
            width={600}
            height={500}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

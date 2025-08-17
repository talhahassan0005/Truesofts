'use client';
import React from 'react';
import { Inter, Manrope } from 'next/font/google';

// Configure fonts with display: 'swap' for better loading
const manrope = Manrope({ 
  subsets: ['latin'], 
  weight: ['700'],
  display: 'swap'
});

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['500'],
  display: 'swap'
});

export default function Industriesworkfileds({ id }) {
  const industries = [
    'Manufacturing',
    'Logistics',
    'Fintech',
    'Real Estate',
    'Blockchain',
    'Cyber Security',
    'Ectech',
    'Manufacturing',
    'Logistics',
    'Fintech',
    'Real Estate',
    'Blockchain',
    'Cyber Security',
    'Ectech'
  ];

  return (
    <section className="w-full py-16 bg-white" id={id}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 mt-8 sm:mt-16">
          <h2 className={`${manrope.className} mx-auto text-2xl sm:text-3xl md:text-4xl leading-tight font-bold text-black mb-6`}>
            Industries we work with
          </h2>
          <p className={`${inter.className} max-w-[735px] text-[#1F1F1F] text-center mx-auto`}>
            Digital Transformation Company dedicated to turning your ideas into reality. We help
            businesses grow by using the newest technology and best strategies.
          </p>
        </div>

        {/* Infinite scrolling industries */}
        <div className="relative overflow-hidden">
          {/* Fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling items */}
          <div className="flex gap-4 w-max animate-marquee">
            {industries.map((industry, index) => (
              <div
                key={`${industry}-${index}`}
                className="flex items-center justify-center flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 border border-black rounded-lg"
              >
                <span className={`${inter.className} text-black text-sm sm:text-base font-medium whitespace-nowrap`}>
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        /* Force font family application */
        .inter-font-force {
          font-family: ${inter.style.fontFamily} !important;
        }
      `}</style>
    </section>
  );
}
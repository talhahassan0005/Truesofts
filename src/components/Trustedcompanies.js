'use client';
import React from 'react';
import { Manrope } from 'next/font/google';
import Image from 'next/image';

const manrope = Manrope({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function TrustedCompanies({ id }) {
  const companyLogos = [
    { name: 'databricks', image: '/databrick.svg' },
    { name: 'contentful', image: '/contentful.svg' },
    { name: 'Lattice', image: '/lattic.svg' },
    { name: 'INTERCOM', image: '/intercom.svg' },
  ];

  // Duplicate for seamless animation
  const duplicatedLogos = [...companyLogos, ...companyLogos, ...companyLogos];

  return (
    <section className="w-full py-12 sm:py-16 bg-white" id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className={`${manrope.className} mx-auto font-bold text-black leading-tight`}
            style={{
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl max-w-full sm:max-w-2xl mx-auto">
              Trusted by 150+ Successful <br /> global names
            </span>
          </h2>
        </div>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          {/* Fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling items */}
          <div className="flex gap-4 sm:gap-6 w-max animate-marquee">
            {duplicatedLogos.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center justify-center flex-shrink-0 border border-gray-300 rounded-xl p-2 sm:p-3"
                style={{
                  width: '140px',
                  height: '60px',
                }}
              >
                <Image
                  src={company.image}
                  alt={company.name}
                  width={100}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

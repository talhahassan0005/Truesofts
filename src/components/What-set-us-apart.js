'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ["latin"],
  weight: ["100","300","400", "500", "600", "700"],
  variable: "--font-inter",
});
export default function WhatSetsUsApart({ id }) {
  return (
    <section
      className="bg-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 font-inter"
      id={id}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-[28px] sm:text-[36px] md:text-[40px] leading-[36px] sm:leading-[44px] md:leading-[48px] font-bold text-black mb-8 sm:mb-10 sm:ml-8"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontStyle: 'bold',
            letterSpacing: '-0.02em',
          }}
        >
          What sets us apart?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Left Side */}
          <div className="flex flex-col space-y-4 w-full md:w-[500px] md:ml-8">
            <Image
              src=""
              alt="Descriptive alt text"
              width={500}
              height={200}
              className="bg-gray-100 object-cover rounded-lg w-full h-auto"
              priority
            />

            <p
              
              className={`${inter.className} text-[#1F1F1F]`} 
              style={{
                fontStyle: 'medium',
                fontWeight: 500,
                lineHeight: '26px',
                fontSize: '18px'
              }}

            >
              Find out what makes us different in the busy world of digital
              transformation. We offer a fresh approach that combines new ideas,
              expert knowledge, and a deep understanding of your business needs.
              Here&apos;s why we&rsquo;re the right choice for your digital journey.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col space-y-6 md:ml-4">
            {[
              'Deep Industry Knowledge',
              'Innovative Technologies',
              'Focus on ROI',
              'Customer-Centric Approach',
            ].map((title, idx) => (
              <div key={idx}>
                <h4
                  className="font-semibold text-black mb-1"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight:'700',
                    lineHeight: '24px',
                    fontSize: '20px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {title}
                </h4>
                <p
                className={`${inter.className} text-[#1F1F1F]`} 
                  style={{
                    fontStyle: 'medium',
                    fontWeight: 500,
                    lineHeight: '26px',
                    fontSize: '18px'
                  }}
                >
                  Digital Transformation Company dedicated to turning your ideas
                  into reality.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

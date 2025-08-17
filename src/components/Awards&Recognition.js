'use client';
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100","300","400", "500", "600", "700"],
  variable: "--font-inter",
});
export default function AwardsRecognition({ id }) {
  return (
    <section
      className="bg-[#f6f6f6] py-16 px-4 mt-30"
      id={id}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        
        {/* Left Side - Text Content */}
        <div className="w-full md:max-w-xl md:ml-[88px] text-center md:text-left px-2 sm:px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Awards & recognition
          </h2>
          <p
            className={`${inter.className} text-[#1F1F1F]`} 
              style={{
                fontStyle: 'medium',
                fontWeight: 500,
                lineHeight: '26px',
                fontSize: '18px'
              }}

          >
            Digital Transformation Company dedicated to turning your ideas into reality. 
            We help businesses grow by using the newest technology and best strategies.
          </p>
        </div>

        {/* Right Side - Placeholder Awards */}
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-4 sm:gap-6 md:mr-20">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-300 rounded-xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

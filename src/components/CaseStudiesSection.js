'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Manrope } from 'next/font/google';


const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const CaseStudiesSection = ({ id }) => {
  const caseStudies = [
    {
      id: 1,
      title: 'How To Trust a Crypto Exchange Development Co...',
      description:
        'Learn how to trust a crypto exchange development company with key tips.',
      tag: 'case study',
      image: '',
    },
    {
      id: 2,
      title: 'How To Trust a Crypto Exchange Development Co...',
      description:
        'Learn how to trust a crypto exchange development company with key tips.',
      tag: 'case study',
      image: '',
    },
    {
      id: 3,
      title: 'How To Trust a Crypto Exchange Development Co...',
      description:
        'Learn how to trust a crypto exchange development company with key tips.',
      tag: 'case study',
      image: '',
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 md:px-8 lg:px-16 bg-white" id={id}>
      {/* Heading + Paragraph */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <h2 className={`${manrope.className} ml-4 text-[#1F1F1F]`} 
              style={{
                fontStyle: 'bold',
                fontWeight: 700,
                lineHeight: '48px',
                fontSize: '35px'

              }}>
            Read our latest case studies
            <br className="hidden sm:block" /> & articles
          </h2>
        </div>
        <div className="flex-1 max-w-xl">
          <p className={`${inter.className} text-[#1F1F1F]`} 
              style={{
                fontStyle: 'medium',
                fontWeight: 500,
                lineHeight: '26px',
                fontSize: '18px'
              }}>
            Digital Transformation Company dedicated to turning your ideas into reality. We help
            businesses grow by using the newest technology and best strategies.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className=" mt-10 sm:mt-16 ml-4 mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 place-items-center">
        {caseStudies.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-[12px] p-5 shadow-sm w-full max-w-[350px] flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-[190px] bg-[#EFEFEF] rounded-md flex shadow-sm items-center justify-center mb-3 overflow-hidden">
              <Image
                src={item.image}
                alt="Case Study"
                width={280}
                height={190}
                className="object-cover rounded-md w-full h-full"
              />
            </div>

            {/* Tag */}
            <span className="inline-block text-[10px] font-medium px-2 py-0.5  text-purple-600 rounded-full mb-2 font-[Inter] line-clamp-1">
              {item.tag}
            </span>

            {/* Title */}
            <h3
            className={`${manrope.className}  text-[#1F1F1F]`}
            style={{
              fontWeight: 700,        // bold weight
              lineHeight: '32px',
              fontSize: '24px',
              letterSpacing: '-0.02em',
            }}
          >
            {item.title}
          </h3>


            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 font-[Inter] font-medium break-words line-clamp-3">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <hr className="w-full border-t border-gray-300 mt-16" />
    </section>
  );
};

export default CaseStudiesSection;

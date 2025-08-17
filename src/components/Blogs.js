'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Inter, Manrope } from 'next/font/google';
import Image from 'next/image';

// Font imports
const inter = Inter({ subsets: ['latin'], weight: ['500'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

// Categories and service mapping
const services = [
  {
    id: 1,
    title: 'Artificial Intelligence',
    category: 'Artificial Intelligence',
    description:
      'Digital Transformation Company dedicated to turning your ideas into reality. We help businesses grow by using the newest technology and best strategies.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    cta: 'Start your AI Project',
  },
  {
    id: 2,
    title: 'Blockchain',
    category: 'Blockchain',
    description:
      'Digital Transformation Company dedicated to turning your ideas into reality. We help businesses grow by using the newest technology and best strategies.',
    image: '',
    cta: 'Get a quote',
  },
  {
    id: 3,
    title: 'Crypto Exchange',
    category: 'Crypto Exchange',
    description:
      'Digital Transformation Company dedicated to turning your ideas into reality. We help businesses grow by using the newest technology and best strategies.',
    image: '',
    cta: 'Get a quote',
  },
  {
    id: 4,
    title: 'Web3',
    category: 'Web3',
    description:
      'Digital Transformation Company dedicated to turning your ideas into reality. We help businesses grow by using the newest technology and best strategies.',
    image: '',
    cta: 'Get a quote',
  },
];

export default function ExploreServices({ id }) {
  const serviceRefs = useRef([]);

  const handleCategoryClick = (index) => {
    const target = serviceRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white" id={id}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className={manrope.className}
            style={{
              fontSize: '40px',
              lineHeight: '48px',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: '#000000',
              width: '376px',
              height: '48px',
              margin: '0 auto 24px',
            }}
          >
            Explore our services
          </h2>
          <p
            className={`${inter.className} w-[735px] text-[#1F1F1F] ml-auto mr-auto`} 
              style={{
                fontStyle: 'medium',
                fontWeight: 500,
                lineHeight: '26px',
                fontSize: '18px'
              }}

          >
            Digital Transformation Company dedicated to turning your ideas into reality. We help
            businesses grow by using the newest technology and best strategies.
          </p>
        </div>

        {/* Buttons to scroll - hidden on mobile */}
        <div className={`${manrope.className} hidden md:flex flex-wrap justify-center gap-4 mb-12`}>
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleCategoryClick(index)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-black hover:bg-blue-700 hover:text-white transition-colors"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 520,
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              {service.category}
            </button>
          ))}
        </div>

        {/* Services */}
        <div className="space-y-8 ">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              ref={(el) => (serviceRefs.current[index] = el)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`
                flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}
                items-start gap-6 md:gap-12 rounded-xl p-4
                border md:border-0 border-gray-300
              `}
            >

              {/* Image - visible only on md+ screens */}
              {/* Image - visible only on md+ screens */}
<div className="w-full md:w-1/2 hidden md:block">
  <div className="h-[320px] w-full rounded-[12px] overflow-hidden bg-gray-100 flex items-center justify-center">
    {service.image ? (
      <Image
        src={service.image}
        alt={service.title}
        width={640}
        height={320}
        className="w-full h-full object-cover"
        priority={index === 0}
      />
    ) : (
      <div className="text-gray-400 text-sm">Image Placeholder</div>
    )}
  </div>
</div>


              {/* Text */}
              <div className="w-full mt-20 md:w-1/2">
                <h3
                  className={`${manrope.className} text-xl md:text-3xl  font-bold text-black mb-2 line-clamp-1`}
                >
                  {service.title}
                </h3>
                <p className={`${inter.className} text-sm md:text-base text-gray-700 mb-4 line-clamp-3`}>
                  {service.description}
                </p>
                <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  {service.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

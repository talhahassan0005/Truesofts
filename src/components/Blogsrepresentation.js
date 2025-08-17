'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['500'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

export default function ServicesSection({ id }) {
  const [activeCategory, setActiveCategory] = useState('Blockchain');

  const categories = [
    'Artificial Intelligence',
    'Blockchain',
    'Crypto Exchange',
    'Web3',
    'Mobile Apps',
  ];

  const services = [
    {
      id: 1,
      title: 'Digital Transformation',
      description:
        'Company addresses a turning your office into reality. We help',
      category: 'Blockchain',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      title: 'Blockchain Solutions',
      description:
        'Digital Transformation Company addresses the turning your',
      category: 'Blockchain',
      image:
        'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=1632&q=80',
    },
    {
      id: 3,
      title: 'Crypto Exchange Platform',
      description:
        'Build secure and scalable cryptocurrency exchange platforms',
      category: 'Crypto Exchange',
      image:
        'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1587&q=80',
    },
  ];

  const filtered = services.find(
    (service) => service.category === activeCategory
  );

  return (
    <section
      className="px-4 sm:px-6 py-8 bg-[#e8f1ff] rounded-3xl max-w-5xl mb-24  mx-auto"
      id={id}
    >
      {/* Main Heading */}
      <h2
        className={`${manrope.className} text-center`}
        style={{
          fontSize: '28px',
          lineHeight: '36px',
          letterSpacing: '-0.02em',
          fontWeight: 700,
          color: '#000000',
          marginBottom: '10px',
        }}
      >
        Explore wide range of <br className="hidden sm:block" /> Blockchain solutions
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left - Categories */}
        <div className="w-full md:w-[500px] md:ml-4 mt-6 space-y-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left px-4 py-3 rounded-2xl font-medium transition-all ${
                activeCategory === category
                  ? 'bg-[#0057ff] text-white'
                  : 'bg-transparent text-black border border-gray-400 hover:bg-gray-100'
              }`}
              style={{ fontFamily: manrope.style.fontFamily }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right - Service Preview */}
        <div className="mt-6 md:mt-8 w-full md:w-1/2 flex flex-col justify-between gap-6 md:mr-8 md:ml-4">
          {/* Image box */}
          <div className="bg-white rounded-3xl h-40 sm:h-48 md:h-56 overflow-hidden relative">
            {filtered?.image ? (
              <Image
                src={filtered.image}
                alt={filtered.title}
                fill
                className="object-cover rounded-3xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          {/* Content */}
          <div>
            <h3
              className={`${manrope.className} mb-1`}
              style={{
                fontSize: '20px',
                lineHeight: '28px',
                letterSpacing: '-0.02em',
                fontWeight: 700,
                color: '#000000',
              }}
            >
              {filtered?.title || 'Title goes here'}
            </h3>

            <p
              className={`${inter.className} text-[#1F1F1F]`} 
              style={{
                fontStyle: 'medium',
                fontWeight: 500,
                lineHeight: '26px',
                fontSize: '18px'
              }}

            >
              {filtered?.description ||
                'Digital Transformation Company dedicated to turning your ideas into reality.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

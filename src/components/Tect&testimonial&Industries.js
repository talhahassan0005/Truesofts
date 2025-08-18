'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Manrope,Inter, Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
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

const TechTestimonialsIndustry = ({ id }) => {
  // Tech stack images
  const techImages = Array.from({ length: 8 }, (_, i) => `/tecstack/tec${i + 1}.svg`);

  const groupImagesByPattern = () => {
    return [
      techImages.slice(0, 3),
      techImages.slice(3, 6),
      techImages.slice(6, 8)
    ];
  };

  const imageGroups = groupImagesByPattern();

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Patrik John',
      company: 'Wealthier',
      text: 'Tristique leo turpis fauclbus fauclbus quam lobortis ac tristique. Sed scelerisque facilisis facilisi sed.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Smith',
      company: 'TechCorp',
      text: 'Exceptional service and innovative solutions. Their team delivered beyond our expectations.',
      rating: 4
    },
    {
      id: 3,
      name: 'Michael Johnson',
      company: 'Digital Ventures',
      text: 'The blockchain implementation was flawless. We have seen a 40% increase in efficiency.',
      rating: 5
    },
    {
      id: 4,
      name: 'Emily Wilson',
      company: 'InnovateX',
      text: 'Reliable partner for all our tech needs. Their expertise helped us scale our platform.',
      rating: 4
    },
    {
      id: 5,
      name: 'David Brown',
      company: 'FutureTech',
      text: 'Their AI solutions transformed our business operations completely.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalTime = 3500; // 3.5 seconds

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const nextTestimonial = () => {
    setAutoPlay(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setAutoPlay(true), intervalTime * 2);
  };

  const prevTestimonial = () => {
    setAutoPlay(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setAutoPlay(true), intervalTime * 2);
  };

  // Get visible testimonials (showing 4 at a time)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  const StarRating = ({ rating }) => (
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="py-12 px-6 bg-[#f6f6f6] md:px-10 lg:px-20" id={id}>
      <div className="max-w-7xl mx-auto">
        {/* Tech Stack Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{
            
              fontWeight: 700,
              fontSize: '40px',
            }}
          >
            Glimpse of our Tech Stack
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`${inter.className} text-[#1F1F1F]`} 
                  style={{
                    fontStyle: 'medium',
                    fontWeight: 500,
                    lineHeight: '26px',
                    fontSize: '18px'
                  }}
          >
            Digital Transformation Company dedicated to turning your ideas into reality.
          </motion.p>
        </div>

        {/* Tech Icons Grid */}
        {/* Tech Icons Grid */}
        <div className="flex flex-col items-center gap-4">
          {imageGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-4 justify-center`}
            >
              {group.map((src, i) => (
                <div
                  key={i}
                  className="w-16 h-12 sm:w-28 sm:h-12 md:w-20 md:h-16 flex items-center justify-center rounded-lg shadow-sm overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Tech ${i}`}
                    width={100} // Adjust as needed
                    height={100} // Adjust as needed
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '150px' }}></div>

        {/* Testimonials Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 px-4 md:px-0">
            <h2
              className="text-black md:ml-8 text-2xl sm:text-3xl md:text-[36px] leading-tight"
              style={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              What Our Client Says<br /> About Us
            </h2>
            <p
            className={`${inter.className} w-[635px] text-[#1F1F1F]`} 
            style={{
              fontStyle: 'medium',
              fontWeight: 500,
              lineHeight: '26px',
              fontSize: '18px'
            }}
            >
              Digital Transformation Company dedicated to turning your ideas into reality. We help businesses grow by using the newest technology and best strategies.
            </p>
          </div>


          {/* Testimonials Carousel */}
          <div className="relative mt-6 h-[400px] overflow-hidden">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition-all"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition-all"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Animated Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 h-full">
              <AnimatePresence custom={direction}>
                {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white"
                    style={{
                      width: '100%',
                      height: '336px',
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                    }}
                  >
                    <StarRating rating={testimonial.rating} />

                      <div className="flex items-center mb-4" style={{ minHeight: '48px' }}>
                        {/* Avatar */}
                        <div
                          className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold overflow-hidden mr-4"
                          style={{ fontSize: '16px', lineHeight: '1' }}
                        >
                          {testimonial.name.split(' ').map((n) => n[0]).join('')}
                        </div>

                        {/* Name + Company */}
                        {/* Name + Company */}
                      <div className="font-inter">
                        <h4 
                          className="text-[#1F1F1F]"
                          style={{
                            style:'medium',
                            fontWeight: 400,
                            lineHeight: '26px',
                            fontSize: '18px'
                          }}
                        >
                          {testimonial.name}
                        </h4>
                        <p
                          className="text-black"
                          style={{
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: '18px',
                          }}
                        >
                          {testimonial.company}
                        </p>
                      </div>                      </div>

                      {/* Testimonial Text */}
                  <p
                  className={`${roboto.className} text-[#1F1F1F] line-clamp-3`} 
                                style={{
                                  fontStyle: 'medium',
                                  fontWeight: 400,
                                  lineHeight: '26px',
                                  fontSize: '18px'
                                }}
                  >
                    &quot;{testimonial.text}&quot;
                  </p>

                        </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTestimonialsIndustry;
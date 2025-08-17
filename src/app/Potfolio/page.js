'use client';

import ProposalForm from "@/components/RequestProposal";
import { useState } from "react";
import Image from "next/image";
import { Inter, Manrope } from 'next/font/google';

// Fonts
const inter = Inter({ subsets: ['latin'], weight: ['400'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

export default function PortfolioPage() {
  const categories = [
    "All",
    "Crypto Exchange",
    "NFT Marketplace",
    "IOS Development",
    "MLM Development"
  ];

  const allProjects = [
    { title: "TappCoin Wallet", image: "https://source.unsplash.com/random/400x300?wallet", category: "Crypto Exchange" },
    { title: "BitChain Exchange", image: "https://source.unsplash.com/random/400x300?crypto", category: "Crypto Exchange" },
    { title: "NFT Art Market", image: "https://source.unsplash.com/random/400x300?nft", category: "NFT Marketplace" },
    { title: "iOS Food App", image: "https://source.unsplash.com/random/400x300?ios", category: "IOS Development" },
    { title: "Social NFT Platform", image: "https://source.unsplash.com/random/400x300?blockchain", category: "NFT Marketplace" },
    { title: "MLM Tracker Pro", image: "https://source.unsplash.com/random/400x300?technology", category: "MLM Development" },
    { title: "Crypto Portfolio Tracker", image: "https://source.unsplash.com/random/400x300?finance", category: "Crypto Exchange" },
    { title: "Mobile Wallet App", image: "https://source.unsplash.com/random/400x300?mobile", category: "IOS Development" },
    { title: "DeFi Dashboard", image: "https://source.unsplash.com/random/400x300?dashboard", category: "Crypto Exchange" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === selectedCategory);

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-8 sm:py-12">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className={`${manrope.className} text-xl sm:text-2xl md:text-3xl font-semibold`}>
          Explore the outcomes we’ve <br className="hidden sm:block" /> delivered to our clients
        </h2>
        <p className={`${inter.className} w-[550px] text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base`}>
          Digital Transformation Company dedicated to turning your ideas into reality.
          We help businesses grow by using the newest technology and best strategies.
        </p>
      </div>

      {/* Main Layout */}
      <div className={`${inter.className} grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8`}>
        
        {/* Sidebar - Category Filter */}
        <div className="flex lg:flex-col flex-wrap gap-2 justify-center lg:justify-start">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-2 rounded border text-sm sm:text-base text-left mr-4 transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="flex flex-col items-center">
              
              {/* Square Image */}
              <div className="relative w-full bg-gray-200 aspect-square rounded overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 
                        (max-width: 1200px) 50vw, 
                        33vw"
                  priority={idx < 3}
                />
              </div>

              {/* Title Centered */}
              <h3 className={`${inter.className} font-semibold text-sm sm:text-base mt-2 text-center`}>
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full border-t border-gray-300 mt-12 sm:mt-20 mb-8 sm:mb-12" />
      <ProposalForm />
    </div>
  );
}

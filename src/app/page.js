
import '@/styles/globals.css'; // Import global styles
import HeroSection from "../components/HeroSection";
import TrustedCompanies from "@/components/Trustedcompanies";
import ProjectFigure from "@/components/Projectfigure";
import React from "react";
import Blogs from "@/components/Blogs";
import Blogsrepresentation from "@/components/Blogsrepresentation";
import AwardsSection from "@/components/Awards&Recognition";
import WhatSetsUsApart from "@/components/What-set-us-apart";
import TechTestimonialsIndustry from "@/components/Tect&testimonial&Industries";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import Industriesworkfileds from "@/components/Industriesworkfileds";
import ProposalForm from "@/components/RequestProposal";
import { Poppins } from "next/font/google";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedCompanies id="trusted-companies" fontClassName={poppins.className} />
      <ProjectFigure id="project-figures" />
      <Blogs id="blog-highlights" />
      <Blogsrepresentation />
      <AwardsSection id="awards" />
      <WhatSetsUsApart id="what-sets-us-apart" />
      <Industriesworkfileds id="industries" />
      <TechTestimonialsIndustry id="tech-stack" />
      <CaseStudiesSection id="case-studies" />
      <ProposalForm id="contact" />
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import { Inter, Manrope } from 'next/font/google';

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

const ProposalForm = ({
  
  mainHeading = 'Ready to kickstart?',
  highlightText = 'kickstart',
  subHeading = 'Launch Your Next Successful Business - Reach Out to Us!',
  formTitle = 'Request a proposal',
  showEffect = true,
  align = 'center',
}) => {
  const alignmentClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),

      });

      const data = await res.json();
      if (data.success) {
        alert(' Proposal request sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          message: '',
        });
      } else {
        alert('❌ Failed to send request. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`py-6 px-4 flex flex-col ${alignmentClass} justify-center bg-white relative`} >
      
      {/* Heading */}
      <div className={`mb-10 ${align === 'left' ? 'text-left' : 'text-center'}`}>
        <h2 className={`${manrope.className} text-[#1F1F1F]`} 
            style={{
              fontWeight: 700,
              lineHeight: '64px',
              fontSize: '56px',
              letterSpacing: '-0.02em'  
            }}>
          {mainHeading.split(highlightText)[0]}
          <span className="text-blue-600">{highlightText}</span>
          {mainHeading.split(highlightText)[1]}
        </h2>
        <p className={`${inter.className} mt-2 text-[#1F1F1F]`} 
            style={{
              fontWeight: 400,
              lineHeight: '24px',
              fontSize: '18px',
              letterSpacing: '-0.02em'
            }}>
          {subHeading}
        </p>
      </div>

      {/* Form Container */}
      <div
        className="w-full max-w-[602px] bg-blue-100 border border-blue-300 rounded-[20px] p-6 relative z-10"
        style={showEffect ? {
          boxShadow: `
            0 0 30px rgba(48, 103, 255, 0.35),
            0 0 60px rgba(48, 103, 255, 0.2),
            0 0 90px rgba(48, 103, 255, 0.1)
          `
        } : {}}
      >
        <h3 className={`${manrope.className} text-left mb-4 text-[#1F1F1F]`} 
            style={{
              fontWeight: 700,
              lineHeight: '32px',
              fontSize: '24px',
              letterSpacing: '-0.02em'
            }}>
          {formTitle}
        </h3>

        {/* Form */}
        <form className="flex flex-col bg-blue-100 gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 font-[Roboto] placeholder-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 font-[Roboto] placeholder-black"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 font-[Roboto] placeholder-black"
            />
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white font-[Roboto]"
            >
              <option value="" disabled>Estimated Project Budget</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-20k">$10,000 - $20,000</option>
              <option value="20k+">$20,000+</option>
            </select>
          </div>

          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about your project (this helps us come prepared)"
            value={formData.message}
            onChange={handleChange}
            required
            className="px-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-[Roboto] placeholder-black"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-2 px-6 rounded-full w-fit hover:bg-blue-700 transition font-[Inter] ${loading && 'opacity-70 cursor-not-allowed'}`}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>

          <p className={`${manrope.className} text-[#1F1F1F]`} 
              style={{
                fontStyle: 'bold',
                fontWeight: 700,
                lineHeight: '24px',
                fontSize: '16px'
              }}>
            Your idea is fully protected under our Non-Disclosure Agreement (NDA)
          </p>
        </form>
      </div>
    </section>
  );
};

export default ProposalForm;

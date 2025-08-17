'use client';

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white py-12" style={{ fontFamily: 'Inter' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-24">
        <hr className="border-t border-gray-300 my-8" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 ml-6">
          {/* Logo Column */}
          <div>
            <Image
              src="/Logo.svg"
              alt="TrueSofts Logo"
              width={140}
              height={50}
              className="object-contain"
            />
            <p className="mt-4 text-black font-medium">Follow Us:</p>
            <div className="flex gap-4 mt-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image src="/linkedIn.svg" alt="LinkedIn" width={24} height={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image src="/Instagram.svg" alt="Instagram" width={24} height={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image src="/Youtube.svg" alt="YouTube" width={24} height={24} />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-black">Our Company</h3>
            <ul className="mt-2 space-y-2 text-gray-600 font-medium">
              {['Portfolio', 'Blogs', 'Portfolio', 'Blogs'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-black">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-black">Our Company</h3>
            <ul className="mt-2 space-y-2 text-gray-600 font-medium">
              {['Portfolio', 'Blogs', 'Portfolio', 'Blogs'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-black">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-black">Our Company</h3>
            <ul className="mt-2 space-y-2 text-gray-600 font-medium">
              {['Portfolio', 'Blogs', 'Portfolio', 'Blogs'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-black">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-8" />

        {/* Let's Talk Section */}
        <div className="mb-8">
          <h3 className="text-lg text-black mb-4">Let&apos;s Talk</h3>
          <div className="flex flex-wrap items-center gap-x-10 text-sm text-black font-medium">
            <div className="flex items-center gap-2">
              <Image src="/email.svg" alt="Email" width={30} height={35} />
              <p>info@truesofts.com</p>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/phonenumber.svg" alt="Phone" width={25} height={35} />
              <p>+1 345 678 9012</p>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/Address.svg" alt="Location" width={30} height={35} />
              <p>Address Goes Here</p>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-black font-medium">
          <p>Copyright 2025 Truesofts. All Rights Reserved</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

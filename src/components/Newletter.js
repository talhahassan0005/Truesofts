'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lexend_Deca } from 'next/font/google';

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function CompactNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <div className={`${lexendDeca.className} relative w-[315px] min-h-[350px] p-4 border border-gray-200 rounded-lg bg-[#095BE814] shadow-sm`}>
      {/* Flyer image */}
      <div className="absolute left-4">
        <Image
          src="/Flyericon.svg"
          alt="Flyer"
          width={40}
          height={40}
          priority
        />
      </div>

      <div className="space-y-3 mt-8">
        <h3 className="text-lg font-bold text-gray-900">Weekly newsletter</h3>
        <p className="text-sm text-black">
          No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <p className="text-xs text-gray-500">
            Read about our <a href="/privacy" className="text-blue-600 hover:underline">policy</a>
          </p>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

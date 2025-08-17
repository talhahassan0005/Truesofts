'use client';

import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Image from 'next/image';
import { Lexend_Deca, Manrope, Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const lexendDeca = Lexend_Deca({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

function convertDriveUrl(url) {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export default function BlogPost({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [contentHtml, setContentHtml] = useState('');
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' });

      if (!res.ok) {
        return notFound();
      }

      const data = await res.json();
      setPost(data);

      const html = marked(data.content || '');
      setContentHtml(html);

      // Parse headings in browser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const found = Array.from(doc.querySelectorAll('h2, h3'));
      setHeadings(found.map(h => ({
        text: h.textContent,
        id: h.id || h.textContent.toLowerCase().replace(/\s+/g, '-'),
        tag: h.tagName.toLowerCase()
      })));
    };

    fetchData();
  }, [slug]);

  if (!post) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const dynamicStyles = {
    fontFamily: post.fontFamily || undefined,
    fontWeight: post.fontWeight || 'normal',
    fontStyle: post.fontStyle || 'normal',
  };

  return (
    <div className="bg-white min-h-screen" style={dynamicStyles}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR */}
        <aside className={`${lexendDeca.className} order-2 lg:order-1 mt-10 lg:mt-[25rem] ml-20 lg:col-span-1 space-y-8`}>
          <hr className="border-gray-200 mb-8" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Table of contents</h3>
            <ul className="space-y-2 text-sm text-blue-600">
              {headings.map((h, index) => (
                <li key={index} className={h.tag === 'h3' ? 'ml-4' : ''}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-gray-200 mb-8" />
          {/* Newsletter */}
          <div>
            <h3 className="w-[390px] font-semibold text-[#095BE8] mb-3">Subscribe to our newsletter</h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 px-3 py-2 w-full rounded mb-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Subscribe</button>
          </div>
          <hr className="border-gray-200 mb-8" />

          {/* Social icons */}
          <div className="flex space-x-3">
            {['twitter', 'facebook', 'linkedin', 'link'].map((name) => (
              <a key={name} href="#" className="hover:opacity-80 transition">
                <Image
                  src={`/${name}.png`}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
              </a>
            ))}
          </div>
          <hr className="border-gray-200 mb-8" />

          {/* Contact form */}
          <form className="border p-4 rounded bg-[#E2EDFF] space-y-3">
            <h3 className="font-semibold">Message us</h3>
            {['Full Name', 'Phone', 'Email Address', 'Your Country', 'Your Whatsapp Id'].map((placeholder, idx) => (
              <input key={idx} type="text" placeholder={placeholder} className="border-gray bg-white px-3 py-2 w-full rounded" />
            ))}
            <textarea placeholder="Message" rows="3" className="border-gray px-3 py-2 bg-white w-full rounded"></textarea>
            <button className="bg-blue-600 text-white px-2 py-2 rounded-full w-[100px]">Submit</button>
          </form>
        </aside>

        {/* MAIN CONTENT */}
        <main className="order-1 lg:order-2 lg:col-span-3 px-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-10 mr-24">
            <div className="flex-1 lg:-ml-[280px]"> 
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm" style={dynamicStyles}>{post.category}</span>
                
              </div>
              <h1 className="text-4xl w-[400px] font-bold mb-2 line-clamp-3" style={dynamicStyles}>{post.title}</h1>
              <p className="text-black w-[400px] line-clamp-5" style={dynamicStyles}>{post.description}</p>
            </div>

            <div className="flex-shrink-0 w-full lg:w-[70%] bg-white mb-10 flex items-center justify-center">
              <div className="relative w-[750px] h-[300px]">
                <Image
                  src={convertDriveUrl(post.image)}
                  alt={post.title}
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
            </div>

          </div>

          <article
            className="prose max-w-none px-10"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            style={dynamicStyles}
          />

          <div className="flex space-x-3 mt-6">
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </main>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* EXPLORE OUR SERVICES */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Explore our services</h2>
          <p className={`${inter.className} text-gray-700 max-w-2xl mx-auto mb-12 font-medium`}>
            Digital Transformation Company dedicated to turning your ideas into reality. We help businesses grow by using the newest technology and best strategies.
          </p>

          <div className={`${lexendDeca.className} font-light grid text-left grid-cols-1 md:grid-cols-3 gap-8`}>
            {[
              {
                title: post.title,
                description: post.description,
                category: post.category,
                image: post.image ? convertDriveUrl(post.image) : '/photo.avif',
              },
              {
                title: 'UX review presentations',
                description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
                category: 'Design',
                image: '/photo.avif',
              },
              {
                title: 'Building your API Stack',
                description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
                category: 'Software Engineering',
                image: '/photo.avif',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 flex flex-col items-start">
                <Image
                  src={convertDriveUrl(item.image)}
                  alt={item.title}
                  width={900}
                  height={650}
                  className="object-cover"
                  priority
                />
                <span className="text-blue-600 font-semibold text-sm mb-2 uppercase line-clamp-1">{item.category}</span>
                <h3 className="text-xl font-bold mb-2 cursor-pointer hover:text-blue-600 transition line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

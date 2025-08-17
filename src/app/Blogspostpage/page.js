'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Newsletter from '@/components/Newletter';
import { Lexend_Deca, Manrope, Inter } from 'next/font/google';
import { marked } from 'marked';

const lexendDeca = Lexend_Deca({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const categories = ['View all', 'Design', 'Product', 'Software Engineering', 'Customer Success'];

function convertDriveUrl(url) {
  if (!url) return '/photo.avif';
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  } catch (error) {
    console.error('Error converting image URL:', error);
    return '/photo.avif';
  }
}

export default function BlogListing() {
  const pathname = usePathname();
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('View all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');

  const postsPerPage = 9;

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        cache: 'no-store',
        next: { revalidate: 60 } // Optional: Revalidate every 60 seconds
      });
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();

      const processedData = data.map(blog => ({
        ...blog,
        description: marked.parse(blog.content || '').replace(/<[^>]+>/g, '').slice(0, 150) + '...',
        popularity: blog.popularity || 0,
        optimizedImage: convertDriveUrl(blog.image)
      }));

      setBlogs(processedData);
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Check if we're coming back from a blog post
    if (prevPathname && prevPathname.startsWith('/Blogspostpage/') && pathname === '/BlogListing') {
      fetchBlogs();
    }
    setPrevPathname(pathname);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter by category + search
  const filteredPosts = blogs.filter(post => {
    const matchesCategory =
      activeCategory === 'View all' ||
      (post.category && post.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting logic
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === 'Newest First') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === 'Oldest First') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortOption === 'Most Popular') {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Insert Newsletter after 3rd post
  const renderPosts = [];
  currentPosts.forEach((post, index) => {
    renderPosts.push(post);
    if (index === 2) {
      renderPosts.push({ id: 'newsletter' });
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
        <h1 className={`${manrope.className} text-4xl font-bold mb-6`}>
          Resources and insights
        </h1>
        <p className={`${lexendDeca.className} text-lg text-gray-700 mb-8 max-w-2xl`}>
          Digital Transformation Company dedicated to turning your ideas into reality.
        </p>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-[350px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </header>

      {/* Main */}
      <main className={`${lexendDeca.className} px-4 sm:px-6 lg:px-12 mr-20 ml-20 max-w-7xl mx-auto pb-20`}>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Category Filter + Sort */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-300 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-2 py-2 font-medium border-b-2 transition-all duration-200
                  ${activeCategory.toLowerCase() === category.toLowerCase()
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-blue-600 hover:border-blue-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="mt-4 md:mt-0">
            <select
              className="border border-gray-300 rounded w-60 shadow-md py-2 px-3 text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
              {renderPosts.map((post) => {
                if (post.id === 'newsletter') {
                  return (
                    <div key="newsletter" className="col-span-1">
                      <Newsletter />
                    </div>
                  );
                }

                return (
                  <Link 
                    key={post._id} 
                    href={`/Blogspostpage/${post.slug}`}
                    scroll={false} // Prevent automatic scroll to top
                  >
                    <div className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative w-full h-[200px]">
                        <Image
                          src={post.optimizedImage}
                          alt={post.title || '/photo.avif'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                        />
                      </div>

                      {/* Category Badge */}
                      <div className="inline-block text-blue-600 py-1 px-2 rounded-full text-sm font-normal m-4">
                        {post.category || 'Uncategorized'}
                      </div>

                      <div className="px-4 pb-4">
                        <h2 className="text-xl font-bold text-black mb-2 line-clamp-1">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <hr className="border-t border-gray-300 my-8" />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center mt-8">
                <button
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <div className="flex justify-center flex-1 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        currentPage === page ? 'bg-blue-500 text-white' : ''
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
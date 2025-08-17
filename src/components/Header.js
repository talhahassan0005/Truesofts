"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import RequestProposal from "@/components/RequestProposal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProposalPopup, setShowProposalPopup] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (showProposalPopup || isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showProposalPopup, isMenuOpen]);

  // Show Proposal Popup
  const handleProposalClick = () => {
    setShowProposalPopup(true);
    setIsMenuOpen(false);
  };

  // Handle menu item click
  const handleScrollToSection = (id) => {
    setIsMenuOpen(false);

    if (pathname !== "/") {
      setPendingScrollId(id);
      router.push("/");
    } else {
      scrollToElement(id);
    }
  };

  // Handle direct page navigation
  const handlePageNavigation = (route) => {
    setIsMenuOpen(false);
    router.push(route);
  };

  // Toggle submenu expansion
  const toggleMenuExpansion = (menuIndex) => {
    setExpandedMenu(expandedMenu === menuIndex ? null : menuIndex);
  };

  // Scroll after route change to home
  useEffect(() => {
    if (pendingScrollId && pathname === "/") {
      const checkAndScroll = () => {
        const element = document.getElementById(pendingScrollId);
        if (element) {
          scrollToElement(pendingScrollId);
          setPendingScrollId(null);
        } else {
          requestAnimationFrame(checkAndScroll);
        }
      };

      checkAndScroll();
    }
  }, [pathname, pendingScrollId]);

  // Smooth scroll with header offset
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const topOffset =
        element.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  // Updated menu structure with parent-child relationships
  const menuItems = [
    {
      label: "Home",
      action: () => handlePageNavigation("/"),
      isParent: false
    },
    {
      label: "Services",
      isParent: true,
      children: [
        {
          label: "Trusted Companies",
          action: () => handleScrollToSection("trusted-companies")
        },
                
        {
          label: "Tech and Testimonial",
          action: () => handleScrollToSection("tech-stack")
        },
                {
          label: "Industry Field works",
          action: () => handleScrollToSection("industries")
        },
        {
          label: "Project Figures",
          action: () => handleScrollToSection("project-figures")
        },
        {
          label: "What Sets Us Apart",
          action: () => handleScrollToSection("what-sets-us-apart")
        },
        {
          label: "Awards & Recognition",
          action: () => handleScrollToSection("awards")
        },
        {
          label: "Tech Stack",
          action: () => handleScrollToSection("tech-stack")
        },
        {
          label: "Case Studies",
          action: () => handleScrollToSection("case-studies")
        }
      ]
    },
    {
      label: "Portfolio",
      action: () => handlePageNavigation("/Potfolio"),
      isParent: false
    },
    {
      label: "Blog",
      action: () => handlePageNavigation("/Blogspostpage"),
      isParent: false
    },
    {
      label: "Contact",
      action: () => handlePageNavigation("/Contactpage"),
      isParent: false
    }
  ];

  return (
    <header className="w-full bg-white relative z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        {/* Logo */}
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/Logo.svg"
            alt="TrueSofts Logo"
            width={140}
            height={150}
            className="ml-4 sm:ml-16 rounded-sm object-contain cursor-pointer"
            priority
          />
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleProposalClick}
            className="text-white px-4 py-2 rounded-full font-semibold transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            style={{
              backgroundColor: "#095BE8",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500, // 500 weight
              lineHeight: "24px",
              fontSize: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Request a Proposal
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setExpandedMenu(null);
            }}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-16"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <span
                className={`absolute block w-4 h-[2px] bg-black rounded transition-all duration-300 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`absolute block w-4 h-[2px] bg-black rounded transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

     {/* Submenu */}
        {isMenuOpen && (
          <nav className="font-bold absolute top-full pl-12 left-0 w-full bg-white shadow-lg py-6 z-40 animate-fadeIn max-h-screen overflow-y-auto">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
              <div className="flex">
                {/* Main menu column */}
                <div className="w-1/3 pr-8 space-y-4">
                  {menuItems.map((item, index) => (
                    <div key={index} className="group pl-4"> {/* <-- slight right indent */}
                      {item.isParent ? (
                        <button
                          onClick={() => toggleMenuExpansion(index)}
                          className="flex justify-between items-center w-full text-left text-gray-800 text-base hover:text-blue-600 py-2 transition-colors duration-200 focus:outline-none font-manrope"
                        >
                          {item.label}

                          {/* Arrow only when active */}
                          {expandedMenu === index && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform duration-200 rotate-90"
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            item.action();
                            setIsMenuOpen(false);
                          }}
                          className="text-gray-800 text-base hover:text-blue-600 w-full text-left py-2 block transition-colors duration-200 focus:outline-none"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submenu column (only shown when Services is expanded) */}
                {expandedMenu !== null && (
                  <div className="w-[300px] pl-8">
                    <div className="space-y-2">
                      {menuItems[expandedMenu].children.map((child, childIndex) => (
                        <button
                          key={childIndex}
                          onClick={() => {
                            child.action();
                            setIsMenuOpen(false);
                          }}
                          className="text-gray-600 hover:text-blue-500 w-full text-left py-1 block transition-colors duration-200 text-base font-[Inter] font-normal" // normal weight
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}

      {/* Proposal Popup */}
      {showProposalPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-transparent transition-opacity duration-300 animate-fadeIn"
            onClick={() => setShowProposalPopup(false)}
          />
          <div 
            className="relative w-[600px] max-w-2xl mx-auto max-h-[90vh] overflow-y-auto scrollbar-hide animate-scaleIn"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="bg-white rounded-xl shadow-xl border border-blue-300 min-h-[200px]">
              <button
                onClick={() => setShowProposalPopup(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
                aria-label="Close popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="p-6 md:p-8">
                <RequestProposal 
                  border borderColor="red-500" 
                  borderSize="4"
                  onClose={() => setShowProposalPopup(false)}
                  mainHeading="Connect with our experts"
                  highlightText="experts"
                  subHeading="Launch Your Next Successful Business - Reach Out to Us!"
                  formTitle="Request a proposal"
                  showEffect={false}
                  align="left"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
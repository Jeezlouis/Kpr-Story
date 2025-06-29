import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import clsx from "clsx";

const Navbar = () => {
    const navRefs = useRef({});
    const audioElementRef = useRef(null);
    const menuOverlayRef = useRef(null);
    const backgroundRef = useRef(null);
    const menuItemsRef = useRef([]);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Original nav links
    const navLinks = [
        {
            id: 'project',
            title: 'project',
        },
        {
            id: 'the-keep',
            title: 'the keep'
        },
        {
            id: 'factions',
            title: 'factions'
        },
        {
            id: 'the-world',
            title: 'the world'
        },
    ];

    // Menu items matching the exact design
    const menuItems = [
        { id: 'story', title: 'STORY', highlight: true, pageNum: 'PAGE\n001' },
        { id: 'protocol', title: 'PROTOCOL' },
        { id: 'journal', title: 'JOURNAL' },
        { id: 'media', title: 'MEDIA' },
        { id: 'gallery', title: 'GALLERY' },
        { id: 'about', title: 'ABOUT' }
    ];

    const socialLinks = [
        { id: 'twitter', title: 'TWITTER' },
        { id: 'discord', title: 'DISCORD' }
    ];

    // Toggle audio and visual indicator
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    // Toggle menu overlay
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current?.play();
        } else {
            audioElementRef.current?.pause();
        }
    }, [isAudioPlaying]);

    // Animate menu overlay
    useEffect(() => {
        if (!menuOverlayRef.current || !backgroundRef.current) return;

        if (isMenuOpen) {
            // Show background fade
            gsap.set(backgroundRef.current, { display: 'block' });
            gsap.to(backgroundRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Slide in menu from left
            gsap.set(menuOverlayRef.current, { display: 'block' });
            gsap.fromTo(menuOverlayRef.current, 
                { 
                    x: '-120%'
                },
                {
                    x: '0%',
                    duration: 0.4,
                    ease: 'power3.out'
                }
            );

            // Animate menu items
            menuItemsRef.current.forEach((item, index) => {
                if (item) {
                    gsap.fromTo(item,
                        { 
                            opacity: 0,
                            x: -30
                        },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.3,
                            delay: 0.1 + (index * 0.04),
                            ease: 'power2.out'
                        }
                    );
                }
            });
        } else {
            // Hide background fade
            gsap.to(backgroundRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(backgroundRef.current, { display: 'none' });
                }
            });

            // Slide out menu to left
            gsap.to(menuOverlayRef.current, {
                x: '-120%',
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(menuOverlayRef.current, { display: 'none' });
                }
            });
        }
    }, [isMenuOpen]);

    const handleMouseEnter = (id, text) => {
        const el = navRefs.current[id];
        if (!el) return;

        gsap.to(el, {
            duration: 1,
            text: {
                value: `${text}`,
                scrambleText: {
                    characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    revealDelay: 0.4,
                    speed: 0.3
                }
            },
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = (id, text) => {
        gsap.to(navRefs.current[id], {
            duration: 0.2,
            text: {
                value: text
            },
            ease: 'power2.out'
        });
    };

    return (
        <>
            {/* Background Fade Overlay */}
            <div 
                ref={backgroundRef}
                className="fixed inset-0 z-[10001] bg-white/80 backdrop-blur-sm hidden opacity-0"
                style={{ display: 'none' }}
                onClick={toggleMenu}
            />

            {/* Side Menu Overlay - Exact Original Design */}
            <div 
                ref={menuOverlayRef}
                className="fixed bg-black hidden rounded-xl"
                style={{ 
                    display: 'none',
                    top: '24px',
                    left: '24px',
                    bottom: '24px',
                    width: '600px',
                    maxWidth: '45vw',
                    zIndex: 10002
                }}
            >
                {/* Top Section */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                    <div className="flex items-center text-white text-[10px] font-ibm uppercase tracking-wide">
                        <span className="mr-2">◈</span>
                        <span>DISCOVER</span>
                    </div>
                    <button 
                        onClick={toggleMenu}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Main Menu Items */}
                <div className="absolute left-6 top-20 right-6">
                    {menuItems.map((item, index) => (
                        <div 
                            key={item.id}
                            ref={el => menuItemsRef.current[index] = el}
                            className="opacity-0 mb-1 relative"
                        >
                            <a
                                href={`#${item.id}`}
                                className={clsx(
                                    "block font-bold leading-none transition-colors duration-300 uppercase tracking-tight",
                                    item.highlight 
                                        ? "text-[#9AFF46]" 
                                        : "text-white hover:text-[#9AFF46]"
                                )}
                                style={{ 
                                    fontSize: '3.5rem',
                                    lineHeight: '0.85',
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    fontWeight: '900'
                                }}
                                onClick={toggleMenu}
                            >
                                {item.title}
                            </a>
                            {item.pageNum && (
                                <div 
                                    className="absolute right-0 top-0 text-[#9AFF46] text-[10px] leading-tight font-mono uppercase tracking-wide"
                                    style={{ 
                                        transform: 'translateY(-10px)',
                                        whiteSpace: 'pre-line'
                                    }}
                                >
                                    {item.pageNum}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Sections */}
                <div className="absolute bottom-6 left-6 right-6">
                    {/* Connect Section */}
                    <div className="mb-6 pb-4 border-b border-gray-800">
                        <div className="flex items-center text-white text-[10px] font-ibm mb-3 uppercase tracking-wide">
                            <span className="mr-2">◈</span>
                            <span>CONNECT</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 ml-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href="#"
                                    className="block text-white hover:text-[#9AFF46] transition-colors text-sm uppercase font-medium tracking-wide"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Buy On Section */}
                    <div className="mb-6 pb-4 border-b border-gray-800">
                        <div className="flex items-center text-white text-[10px] font-ibm mb-3 uppercase tracking-wide">
                            <span className="mr-2">◈</span>
                            <span>BUY ON</span>
                        </div>
                        <div className="ml-4">
                            <a
                                href="#"
                                className="flex items-center space-x-2 text-white hover:text-[#9AFF46] transition-colors text-sm uppercase font-medium tracking-wide"
                            >
                                <span>↓</span>
                                <span>OPENSEA</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="flex justify-between items-end">
                        <div className="text-white text-[10px] font-ibm uppercase tracking-wide">
                            US-EN ↓
                        </div>
                        <div className="text-gray-400 text-[10px]">
                            © 2022
                        </div>
                    </div>
                </div>
                
                {/* Bottom right decorative element */}
                <div className="absolute bottom-6 right-6">
                    <div className="w-3 h-3 bg-gray-600/40 transform rotate-45"></div>
                </div>
                
                {/* Right edge indicators */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    <div className="w-0.5 h-4 bg-white/20"></div>
                    <div className="w-0.5 h-2 bg-white/40"></div>
                    <div className="w-0.5 h-6 bg-white/20"></div>
                </div>
                
                {/* Bottom right scroll indicator */}
                <div className="absolute bottom-6 right-16 text-white/60 text-[8px] font-mono uppercase tracking-wider">
                    SCROLL ↓
                </div>
            </div>

            {/* Original Navbar - UNCHANGED */}
            <div className='fixed inset-0 z-[9000] pointer-events-none'>
                <div className='w-full px-6 pt-6 pointer-events-auto'>
                    <nav className='border-[0.5px] border-gray-25 overflow-hidden rounded-xl pointer-events-none'>
                        <div className='border-b-[0.5px] border-gray-25 flex justify-between items-center w-full h-12'>

                            {/* Left Section (burger) */}
                            <div className="h-full z-20 flex items-center px-6 border border-transparent pointer-events-auto hover:border-white transition-colors duration-300">
                                <button 
                                    className="h-full flex items-center justify-center"
                                    onClick={toggleMenu}
                                >
                                    <svg fill="none" viewBox="0 0 27 6" className="icon-burger w-6 h-6">
                                        <path d="M.867.711h25.634M.867 5.25h21.429" stroke="white" />
                                    </svg>
                                </button>
                            </div>

                            {/* Center Section */}
                            <div className='flex-center flex-1 py-5'>
                                <ul>
                                    {navLinks.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={`#${link.id}`}
                                                ref={(el) => (navRefs.current[link.id] = el)}
                                                onMouseEnter={() => handleMouseEnter(link.id, link.title)}
                                                onMouseLeave={() => handleMouseLeave(link.id, link.title)}
                                                className='bg-hover transition-all duration-300 ease-in-out pointer-events-auto'
                                            >
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Section - Sign In */}
                            <div className='flex-center cursor-pointer py-3 bg-white text-black px-8 clip-polygon rounded-lg pointer-events-auto'>
                                <button className='uppercase cursor-pointer font-ibm font-semibold'>
                                    sign in
                                </button>
                            </div>
                        </div>

                        {/* Bottom section with logo and audio controls */}
                        <div className="absolute h-full px-3 flex flex-col items-center border-r border-gray-25">
                            <div className='mt-auto mb-auto'>
                                <a href="/" rel="noopener noreferrer" className="pointer-events-auto">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 54 102" 
                                        className="w-12"
                                    >
                                        <path 
                                            fill="#fff" 
                                            fillRule="evenodd" 
                                            d="M17.958 70.176c0 .873.708 1.581 1.581 1.581h2.799c.873 0 1.58.708 1.58 1.58V100.1c0 .873.709 1.58 1.582 1.58h2.799a1.58 1.58 0 0 0 1.58-1.58V73.338c0-.873.708-1.58 1.581-1.58h2.799a1.58 1.58 0 0 0 1.58-1.582V55.401c0-.873.709-1.581 1.582-1.581h14.83a1.58 1.58 0 0 0 1.58-1.58v-2.8a1.58 1.58 0 0 0-1.58-1.58h-14.83a1.58 1.58 0 0 1-1.581-1.581V31.503a1.58 1.58 0 0 0-1.581-1.58H31.46a1.58 1.58 0 0 1-1.58-1.581V1.58A1.58 1.58 0 0 0 28.298 0h-2.8a1.58 1.58 0 0 0-1.58 1.58v26.761a1.58 1.58 0 0 1-1.581 1.581h-2.799a1.58 1.58 0 0 0-1.58 1.581V46.28a1.58 1.58 0 0 1-1.582 1.58H1.581A1.58 1.58 0 0 0 0 49.44v2.8c0 .872.708 1.58 1.58 1.58h14.797c.873 0 1.581.708 1.581 1.58v14.776Zm7.537-40.286a1.58 1.58 0 0 0-1.58 1.58v14.804a1.58 1.58 0 0 1-1.581 1.581h-2.8a1.58 1.58 0 0 0-1.58 1.581v2.814c0 .873.708 1.58 1.58 1.58h2.8c.873 0 1.58.709 1.58 1.581v14.79c0 .873.708 1.58 1.581 1.58h2.8a1.58 1.58 0 0 0 1.58-1.58V55.397c0-.873.708-1.581 1.581-1.581h2.799a1.58 1.58 0 0 0 1.58-1.581v-2.788a1.58 1.58 0 0 0-1.58-1.58h-2.799a1.58 1.58 0 0 1-1.58-1.581V31.47a1.58 1.58 0 0 0-1.582-1.58h-2.799Z" 
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <div className='mb-6'>
                                <button
                                    onClick={toggleAudioIndicator}
                                    className="flex items-center space-x-0.5 pointer-events-auto"
                                >
                                    <audio
                                        ref={audioElementRef}
                                        className="hidden"
                                        src="/audio/loop.mp3"
                                        loop
                                    />
                                    {[1, 2, 3, 4].map((bar) => (
                                        <div
                                            key={bar}
                                            className={clsx("indicator-line", {
                                                active: isIndicatorActive,
                                            })}
                                            style={{
                                                animationDelay: `${bar * 0.1}s`,
                                            }}
                                        />
                                    ))}
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar
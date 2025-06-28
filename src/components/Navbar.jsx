import gsap from 'gsap'
import { navLinks } from '../constants/index.js'
import { useRef, useEffect, useState  } from 'react'
import clsx from "clsx";




const Navbar = () => {
    const navRefs = useRef({});
    const audioElementRef = useRef(null);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    // Toggle audio and visual indicator
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
        audioElementRef.current.play();
        } else {
        audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    
    const handleMouseEnter = (id, fullText) => {
    const el = navRefs.current[id];
    if (!el) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const SCRAMBLE_ROUNDS = 12;

    // create a timeline of quick random-text tweens
    const tl = gsap.timeline();

    for (let i = 0; i < SCRAMBLE_ROUNDS; i++) {
        tl.to(el, {
        duration: 0.03,
        text: () => {
            let scrambled = '';
            for (let j = 0; j < fullText.length; j++) {
            scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return scrambled;
        },
        ease: 'none',
        });
    }

    // final tween to the real label
    tl.to(el, {
        duration: 0.2,
        text: fullText,
        ease: 'power1.out',
    });
    };



    const handleMouseLeave = (id, text) => {
        gsap.to(navRefs.current[id], {
            duration: 0.2,
            text: text,
            ease: 'power1.inOut',
        });
        };




  return (
    <div className='relative top-0 left-0 w-full  pointer-events-none'>
        <div className='w-full pl-9 pr-7 absolute pt-6 overflow-visible'>
        <nav className='border-[0.5px] border-gray-25 fixed overflow-hidden rounded-xl z-50 pointer-events-none'>
            <div className='border-b-[0.5px] border-gray-25 flex relative justify-between items-center w-full h-12 pointer-events-auto'>

            {/* Left Section (burger) */}
           <div className="h-full z-20 flex relative  items-center px-6 border border-transparent  hover:border-white transition-colors duration-300">
            <button className="h-full flex items-center relative justify-center pointer-events-auto">
                <svg fill="none" viewBox="0 0 27 6" className="icon-burger w-6 h-6">
                <path d="M.867.711h25.634M.867 5.25h21.429" stroke="white" />
                </svg>
            </button>
            </div>



            {/* Center Section */}
            <div className='flex-center flex-1 py-5  relative'>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                ref={(el) => (navRefs.current[link.id] = el)}
                                onMouseEnter={() => handleMouseEnter(link.id, link.title)}
                                onMouseLeave={() => handleMouseLeave(link.id, link.title)}
                                className='bg-hover transition-all duration-300 ease-in-out'
                            >
                                {link.title}
                            </a>
                     
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Placeholder */}
            <div className='flex-center cursor-pointer py-3 bg-white text-black px-8 relative clip-polygon rounded-lg'>
                <button className='uppercase cursor-pointer font-ibm font-semibold'>
                    sign in
                </button>
            </div>

            </div>
            <div className="absolute inset-y-0 left-0 pointer-events-none px-3 flex flex-col items-center border-r border-gray-25">

                <div className='mt-auto mb-auto'>
                    <a href="/" rel="noopener noreferrer" className="pointer-events-none mt-auto mb-auto">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 54 102" 
                    className="w-12"
                    data-v-e52dd2d3="" 
                    data-v-0aa6ccf8="">
                    <path 
                    fill="#fff" 
                    fillRule="evenodd" 
                    d="M17.958 70.176c0 .873.708 1.581 1.581 1.581h2.799c.873 0 1.58.708 1.58 1.58V100.1c0 .873.709 1.58 1.582 1.58h2.799a1.58 1.58 0 0 0 1.58-1.58V73.338c0-.873.708-1.58 1.581-1.58h2.799a1.58 1.58 0 0 0 1.58-1.582V55.401c0-.873.709-1.581 1.582-1.581h14.83a1.58 1.58 0 0 0 1.58-1.58v-2.8a1.58 1.58 0 0 0-1.58-1.58h-14.83a1.58 1.58 0 0 1-1.581-1.581V31.503a1.58 1.58 0 0 0-1.581-1.58H31.46a1.58 1.58 0 0 1-1.58-1.581V1.58A1.58 1.58 0 0 0 28.298 0h-2.8a1.58 1.58 0 0 0-1.58 1.58v26.761a1.58 1.58 0 0 1-1.581 1.581h-2.799a1.58 1.58 0 0 0-1.58 1.581V46.28a1.58 1.58 0 0 1-1.582 1.58H1.581A1.58 1.58 0 0 0 0 49.44v2.8c0 .872.708 1.58 1.58 1.58h14.797c.873 0 1.581.708 1.581 1.58v14.776Zm7.537-40.286a1.58 1.58 0 0 0-1.58 1.58v14.804a1.58 1.58 0 0 1-1.581 1.581h-2.8a1.58 1.58 0 0 0-1.58 1.581v2.814c0 .873.708 1.58 1.58 1.58h2.8c.873 0 1.58.709 1.58 1.581v14.79c0 .873.708 1.58 1.581 1.58h2.8a1.58 1.58 0 0 0 1.58-1.58V55.397c0-.873.708-1.581 1.581-1.581h2.799a1.58 1.58 0 0 0 1.58-1.581v-2.788a1.58 1.58 0 0 0-1.58-1.58h-2.799a1.58 1.58 0 0 1-1.58-1.581V31.47a1.58 1.58 0 0 0-1.582-1.58h-2.799Z" 
                    clipRule="evenodd">
                    </path>
                    </svg>
                    </a>
                </div>
                <div className='mb-6'>
                     <button
                        onClick={toggleAudioIndicator}
                        className="pointer-events-auto mb-6 flex items-center space-x-0.5"
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


  )
}

export default Navbar
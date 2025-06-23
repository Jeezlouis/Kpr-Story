import { navLinks } from '../constants/index.js'
import { useRef  } from 'react'
import { ScrambleTextPlugin } from 'gsap/all'
import gsap from 'gsap'





const Navbar = () => {
    const navRef = useRef()

    
  return (
    <div className='p-6 absolute w-screen h-screen'>
        <nav className='border-[0.5px] border-gray-25  overflow-hidden rounded-lg'>
            <div className='border-b-[0.5px] border-gray-25 flex justify-between items-center w-full h-12'>

            {/* Left Section (burger) */}
            <div className='h-full flex items-center border-r-[0.5px] border-gray-25 px-6 hover:border-gray-50 hover:border'>
                <button className='h-full flex-center'>
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
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Placeholder */}
            <div className='flex-center cursor-pointer py-3 bg-white text-black px-8 clip-polygon rounded-lg'>
                <button className='uppercase cursor-pointer font-ibm font-semibold'>
                    sign in
                </button>
            </div>

            </div>
        </nav>
    </div>


  )
}

export default Navbar
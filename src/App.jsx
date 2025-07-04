import Hero from "./components/Hero"
import { ScrollTrigger, SplitText } from "gsap/all"
import TextPlugin from 'gsap/TextPlugin';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
import Navbar from "./components/Navbar"
import About from "./components/About";


gsap.registerPlugin(ScrollTrigger, SplitText , ScrambleTextPlugin, TextPlugin,);


const App = () => {
  return (
    <div className='bg-white overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}

export default App
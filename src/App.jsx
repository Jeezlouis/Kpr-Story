import Hero from "./components/Hero"
import { ScrollTrigger, SplitText } from "gsap/all"
import TextPlugin from 'gsap/TextPlugin';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import gsap from "gsap"
import Navbar from "./components/Navbar"

gsap.registerPlugin(ScrollTrigger, SplitText , ScrambleTextPlugin, TextPlugin)


const App = () => {
  return (
    <div className='bg-white px-auto overflow-x-hidden'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
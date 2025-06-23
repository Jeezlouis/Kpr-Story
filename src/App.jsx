import Hero from "./components/Hero"
import { ScrollTrigger, SplitText, ScrambleTextPlugin } from "gsap/all"
import gsap from "gsap"
import Navbar from "./components/Navbar"

gsap.registerPlugin(ScrollTrigger, SplitText , ScrambleTextPlugin)


const App = () => {
  return (
    <div className='bg-white px-auto overflow-x-hidden'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
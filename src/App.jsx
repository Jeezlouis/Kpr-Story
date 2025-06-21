import Hero from "./components/Hero"
import { ScrollTrigger, SplitText } from "gsap/all"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger, SplitText)


const App = () => {
  return (
    <div className='bg-white'>
      <Hero />
    </div>
  )
}

export default App
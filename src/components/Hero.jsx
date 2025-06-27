import ModelView from "./ModelView"
import { useRef } from "react";
import Header from "./Header"
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all"



const Hero = () => {
  const heroRef = useRef()
  useGSAP(() => {
    const heroSplit = new SplitText("#hero h1", {
     type: "chars, words",
    });
    gsap.from(heroSplit.chars, {
      duration: 1,
      x: -100,
      ease: "expo.out",
      stagger: 0.02,
      alpha: 0,
    })

   gsap.to(target, {
      duration: .8,
      , { scope: heroRef }
      scrambleText: {
        text: target.innerText,
        speed: 2,
        chars: config.random ? defaultChars : target.innerText.replace(/\s/g, '')
      }
    });

  }, { scope: heroRef })
  return (
    <div id="hero" ref={heroRef} className='h-screen w-dvw flex items-center justify-center relative overflow-hidden'>
        <div className="h-screen w-screen z-20 flex-col">
          <div id="intro-text" className="absolute font-whyte mt-24 ml-30 w-64 h-16 text-xs font-normal">
            KPR is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.
          </div>
          <div id="hero-headers" className="absolute top-90 left-30 w-[90rem] h-[50rem] flex-col ">
            <Header text="keep." containerClass="ml-[28.2vw]" />
            <Header text="protect." containerClass="ml-[35.6vw]" />
            <Header text="reimagine." containerClass="" />
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full absolute">
          <div className="relative w-screen h-screen overflow-hidden">
            <ModelView />
          </div>
        </div>
    </div>
  )
}

export default Hero
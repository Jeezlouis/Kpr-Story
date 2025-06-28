import ModelView from "./ModelView"
import { useRef } from "react";
import Header from "./Header"
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all"



const Hero = () => {
  const heroRef = useRef()
  const scText = 'KPR is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.'
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

    gsap.to('#intro-text', {
      duration: scText.length * 0.03,
      ease: "expo.out",
      scrambleText: {
        text: `${scText}`,
        chars: "abcdefghijklmnopqrstuvwxyz0123456789",
        revealDelay: 0.3,
        speed: 0.3,
        rightToLeft: false,
      }
      
    })

  }, { scope: heroRef })
  return (
    <div id="hero" ref={heroRef} className='h-screen w-dvw flex items-center justify-center '>
        <div className="h-screen w-screen z-1 flex-col pointer-events-none">
          <div className="pointer-events-auto visible opacity-[1]">
            
          <div id="intro-text" className="absolute font-whyte mt-24 ml-35 w-64 h-16 text-xs font-normal overflow-hidden">
            KPR is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.
          </div>
          <div id="hero-headers" className="absolute top-90 left-39 w-[90rem] h-[50rem] flex-col ">
            <Header text="keep" sup="01k" containerClass="ml-[25.2vw]" />
            <Header text="protect" sup="02p" containerClass="ml-[31.6vw]" />
            <Header text="reimagine" sup="03r" containerClass="" />
          </div>
          
        </div>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="top-0 left-0 w-screen h-screen fixed pointer-events-none overflow-hidden ">
            <ModelView />
          </div>
        </div>
    </div>
  )
}

export default Hero
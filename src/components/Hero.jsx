import ModelView from "./ModelView"
import { useRef, useState } from "react";
import Header from "./Header"
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all"

const Hero = () => {
  const heroRef = useRef()
  const internalCameraRef = useRef()
  const model3DRef = useRef(null)
  const [modelReady, setModelReady] = useState(false)

 useGSAP(() => {
  if (!model3DRef.current || !internalCameraRef.current || !modelReady) return;

  const model = model3DRef.current;
  const camera = internalCameraRef.current;

  const modelDOM = document.querySelector('#model');
  const heroDOM = document.querySelector('#hero-header');

  // Get container dimensions instead of window dimensions
  const containerRect = modelDOM.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;
  const aspectRatio = containerWidth / containerHeight;

  if (!model.scale || !model.position || !camera.position || !modelDOM || !heroDOM) return;

  // Set initial state - no clip path
   gsap.set(modelDOM, {
    clipPath: 'none', // or simply don't set clipPath at all
    borderRadius: '0px', // or whatever your default border radius should be
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      endTrigger: '#about',
      end: 'top top',
      scrub: true,
      // markers: true,
      invalidateOnRefresh: true,
    }
  });

 // Shrink clip-path shape
  tl.to(modelDOM, {
    clipPath: 'polygon(4.8% -0.2%, 100% 0%, 100.2% 81.8%, 78% 100.8%, 0% 100%, 0.15% 60.45%, 4.5% 54.9%)',
    borderRadius: '20px',
    duration: 0.01,
  })
  .to(modelDOM, {
    clipPath: 'none',
    borderRadius: '0px',
    duration: 0.01,
  }, 0.99)

  // Slight delay before fading out the text
  .to(heroDOM, {
    opacity: 0,
    y: -100,
    ease: 'power1.out'
  }, 0.15) // start shortly after

  // Inverse-scale trick
  .to(model.scale, {
    x: 0.5 * aspectRatio, 
    y: 0.5, 
    z: 0.5, 
    duration: 1 
  }, 0)


  // Camera zoom
  .to(camera, {
    fov:90,
    ease: 'power2.out',
    onUpdate: () => {
      camera.updateProjectionMatrix?.();
    }
  }, 0)

  // ✅ Rotate (slant) the model
  .to(model.rotation, {
    x: Math.PI / 12, // tilt downward
    y: Math.PI / 16, // tilt sideways
    ease: "power2.out",
  }, 0)

  .to(modelDOM, {
    position: 'absolute',
    marginLeft: '0',
    height: '21vw',
    width: '21vw',
    bottom: '4rem',
    right: '4rem',
    ease: "power5.out",
  }, 0)




  ScrollTrigger.refresh();

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [modelReady]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    if (model3DRef.current && model3DRef.current.rotation) {
      gsap.to(model3DRef.current.rotation, {
        x: 0.6 + y * 0.25,
        y: x * 0.23,
        duration: 1.1,
        ease: "sine.out",
      });
    }
  };

  const handleMouseLeave = () => {
    // Reset logic if needed
  };

  const scText = 'KPR is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.'
  
  useGSAP(() => {
    const masterTL = gsap.timeline()
    
    // Check if the h1 element exists before creating SplitText
    const h1Element = document.querySelector("#hero h1")
    if (!h1Element) return

    const heroSplit = new SplitText("#hero h1", {
     type: "chars, words",
    });
    
    masterTL.from(heroSplit.chars, {
      duration: 1,
      x: -100,
      ease: "expo.out",
      stagger: 0.02,
      alpha: 0,
    }, 1.5)
    
    .to('#intro-text', {
      duration: scText.length * 0.03,
      ease: "expo.out",
      scrambleText: {
        text: `${scText}`,
        chars: "abcdefghijklmnopqrstuvwxyz0123456789",
        revealDelay: 0.3,
        speed: 0.3,
        rightToLeft: false,
      }
    }, 2)

  }, { scope: heroRef })

  return (
    <div id="hero" ref={heroRef} className='h-screen w-dvw flex-center overflow-hidden z-10'>
        <div id="hero-header" className="h-screen w-screen z-1 flex-col relative pointer-events-none cursor-default">
          <div className="relative visible opacity-[1]">
            
          <div id="intro-text" className="absolute font-whyte mt-24  ml-35 w-64 h-16 text-xs font-normal overflow-hidden">
            KPR is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.
          </div>
          <div id="hero-headers" className="absolute top-90 left-39 w-[90rem] h-[50rem] flex-col ">
            <Header text="keep" sup="01k" containerClass="ml-[25.2vw]" />
            <Header text="protect" sup="02p" containerClass="ml-[31.6vw]" />
            <Header text="reimagine" sup="03r" containerClass="" />
          </div>
          
        </div>
        </div>
        <div className="fixed inset-0 flex items-center justify-center w-full h-full">
          <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onMouseEnter={handleMouseLeave}
          id="model"
          className="w-screen h-screen pointer-events-none overflow-hidden">
            <ModelView 
              modelRef={model3DRef} 
              cameraRef={internalCameraRef} 
              onModelReady={() => setModelReady(true)}
            />
          </div>
        </div>
    </div>
  )
}

export default Hero
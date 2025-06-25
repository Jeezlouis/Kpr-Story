import ModelView from "./ModelView"
import Header from "./Header"
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"

const Hero = () => {
  return (
    <div className='h-screen w-dvw flex items-center justify-center relative overflow-hidden'>
        <div className="h-screen w-screen z-20 flex-col">
          <div className="absolute font-whyte mt-24 ml-30 w-64 h-16 text-xs font-normal">
            KPR is a brand that focuses on collective narrative and empowering storytellers. Keepers is a living story, an uncharted world waiting to be explored, to be imagined.
          </div>
          <div className="absolute top-90 left-30 w-[90rem] h-[50rem] flex-col ">
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
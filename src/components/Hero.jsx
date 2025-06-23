import ModelView from "./ModelView"
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"

const Hero = () => {
  return (
    <div className='h-screen w-dvw flex items-center justify-center relative overflow-hidden'>
        <div className="">

        </div>
        <div className="flex items-center justify-center w-full h-full absolute">
          <div className="w-full h-full ">
            <ModelView />
          </div>
        </div>
    </div>
  )
}

export default Hero
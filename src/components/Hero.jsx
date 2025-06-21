import ModelView from "./ModelView"
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"

const Hero = () => {
  return (
    <div className='h-screen w-dvw flex items-center justify-center'>
        <div className="">

        </div>
        <div className="flex items-center justify-center">
        
            <ModelView />
        </div>
    </div>
  )
}

export default Hero
import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import Landing from './Landing'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ModelView = ({ modelRef, cameraRef, onModelReady }) => {
  const internalCameraRef = useRef()
  const camera = cameraRef || internalCameraRef
  const [modelLoaded, setModelLoaded] = useState(false)

  const handleModelLoaded = () => {
    setModelLoaded(true)
    
    // Small delay to ensure everything is properly initialized
    setTimeout(() => {
      if (onModelReady) {
        onModelReady()
      }
    }, 100)
  }

  // Start camera animation only when model is loaded
  useGSAP(() => {
    if(!camera.current || !modelLoaded) return

    gsap.fromTo(camera.current, 
      { 
        fov: 120
      },
      {
        fov: 28,
        duration: 2,
        ease: 'power1.out',
        onUpdate: function() {
          camera.current.updateProjectionMatrix()
        }
      }
    )
  }, [modelLoaded])
  
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      shadows
      className='absolute inset-0 pointer-events-auto'
    >
      
      <PerspectiveCamera
        ref={camera}
        position={[0, -0.3, 0.9]}
        fov={120}
        near={0.05}
        far={1000}
        makeDefault
      />

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minDistance={0.01}
        maxDistance={10}
        target={[0, 0.2, 0]}
      />
      
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      }>
        <Landing 
          ref={modelRef} 
          onModelLoaded={handleModelLoaded}
        />
      </Suspense>
    </Canvas>
  )
}

export default ModelView
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import Landing from './Landing'

const ModelView = () => {
  const controlsRef = useRef()

    useEffect(() => {
    if (!controlsRef.current) return; // ✅ wait until OrbitControls is mounted

    const controls = controlsRef.current;

    // Safely update position and controls
    controls.object.position.set(0, 3, 5);
    controls.target.set(0, -5, 0);

    controls.update();
  }, []);
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      shadows
      className='absolute inset-0 z-0'
    >

      {/* <Environment preset="sunset" intensity={0.2} /> */}
      {/* Lighting setup */}
      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.5}
        castShadow
      />
      {/* <pointLight position={[-10, -10, -10]} intensity={0.5} /> */}
        <PerspectiveCamera
        position={[0, 0, 0.9]}
        fov={45}
        near={0.05}
        far={1000}
        makeDefault
      />

        
      {/* Controls for interaction */}
      <OrbitControls 
      ref={ controlsRef }
      enableZoom={true}
      enablePan={false}
      enableRotate={false}
      minDistance={0.01}
      maxDistance={10}
      position0={[0, 3, 5]}
      target={[0, 0, 0]}
      />
      
      {/* Model with loading fallback */}
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      }>
        <Landing />
      </Suspense>
    </Canvas>
  )
}

export default ModelView
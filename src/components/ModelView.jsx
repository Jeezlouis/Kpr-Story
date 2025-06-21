import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import initializeKTX2Loader from '../utils/ktx2Setup'
import { View, PerspectiveCamera } from '@react-three/drei'
import Landing from './Landing'

const ModelView = () => {
  return (
    <Canvas
    onCreated={({ gl }) => {
        initializeKTX2Loader(gl)
      }}
    >
      <View>
        <ambientLight intensity={0.3} />
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={75}
          near={0.1}
          far={1000}
        />
        <Suspense fallback={<span>Loading...</span>}>
          <Landing />
        </Suspense>
      </View>
    </Canvas>
  )
}

export default ModelView
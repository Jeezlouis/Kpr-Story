// utils/ktx2Setup.js
import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

let isKTX2Initialized = false

export const initializeKTX2Loader = (renderer) => {
  if (isKTX2Initialized) return
  
  const ktx2Loader = new KTX2Loader()
  ktx2Loader.setTranscoderPath('/basis/') // Adjust path as needed
  ktx2Loader.detectSupport(renderer)
  
  // Set up the loader manager
  THREE.DefaultLoadingManager.addHandler(/\.ktx2$/i, ktx2Loader)
  
  isKTX2Initialized = true
  console.log('KTX2 Loader initialized')
}

// Call this in your main App component or Canvas onCreated
export default initializeKTX2Loader
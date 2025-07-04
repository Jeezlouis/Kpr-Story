// Modified Landing/Model component with flip animation
import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Html } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Loader from './Loader'

const Model = React.forwardRef(function Model({ onModelLoaded, ...props }, ref) {
  const group = useRef()
  const { gl } = useThree()
  const [modelData, setModelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    let ktx2Loader = null
    
    const loadModel = async () => {
      try {
        ktx2Loader = new KTX2Loader()
        const transcoderPath = '/basis/'
        ktx2Loader.setTranscoderPath(transcoderPath)
        ktx2Loader.detectSupport(gl)
        
        const gltfLoader = new GLTFLoader()
        gltfLoader.setKTX2Loader(ktx2Loader)
        
        const gltf = await new Promise((resolve, reject) => {
          gltfLoader.load(
            'gltf/compressed/etc1s/landing/landing-2048.glb',
            (result) => {
              const nodes = {}
              const materials = {}
              
              result.scene.traverse((child) => {
                if (child.name) {
                  nodes[child.name] = child
                }
                if (child.material) {
                  if (child.material.name) {
                    materials[child.material.name] = child.material
                  }
                }
              })
              
              result.nodes = nodes
              result.materials = materials
              resolve(result)
            },
            undefined,
            reject
          )
        })
        
        if (mounted) {
          setModelData(gltf)
          setLoading(false)
          onModelLoaded?.()
        }
        
      } catch (err) {
        if (mounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    
    loadModel()
    
    return () => {
      mounted = false
      if (ktx2Loader) {
        ktx2Loader.dispose()
      }
    }
  }, [gl, onModelLoaded])

  const { actions } = useAnimations(modelData?.animations || [], group)

  // Enhanced flip animation starting from absolute center of screen
  useGSAP(() => {
    if (!group.current || loading) return;

    gsap.timeline()
      .set(group.current.rotation, { y: Math.PI / 2 })
      .set(group.current.scale, { 
        x: 0.001, // Exponentially small at start
        y: 0.001, 
        z: 0.001 
      })
      .set(group.current.position, {
        x: 0,      // Center horizontally
        y: 0.2,    // Center vertically (matches your OrbitControls target)
        z: -10     // Start deep in the background from center
      })
      .to(group.current.rotation, {
        y: 0, // End at 0 (original rotation)
        duration: 1.2,
        ease: 'power2.inOut'
      })
      .to(group.current.scale, {
        x: 1,
        y: 1, 
        z: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      }, 0.4) // Start scaling a bit after rotation begins
      .to(group.current.position, {
        x: 0,      // Stay centered horizontally
        y: 0,      // Move to original Y position 
        z: 0,      // Move to original Z position
        duration: 1.2,
        ease: 'power2.out'
      }, 0) // Start position animation at the same time as rotation

  }, [loading]);

  if (loading) {
    return (
      <Html fullscreen portal>
        <Loader />
      </Html>
    )
  }

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    )
  }

  if (!modelData) {
    return null
  }

  const { nodes, materials } = modelData

  return (
    <group 
      ref={(node) => {
        group.current = node;
        if (ref) ref.current = node;
      }}
      {...props}
      dispose={null}
      // Remove the initial rotation since we're setting it in the animation
      rotation={[0.5, 0, 0]} // Original rotation as fallback
    >
      <group name="Scene">
        <group name="Camera_Target" />
        <group name="CAMERA_export" position={[0, 0, 3]} rotation={[Math.PI / 2, 0, 0]}>
          <PerspectiveCamera
            name="CAMERA_export_Orientation"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={39.598}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        {nodes.face_accessory && (
          <mesh
            name="face_accessory"
            castShadow
            receiveShadow
            geometry={nodes.face_accessory.geometry}
            material={materials.male_group_01}
            position={[0, 0, 0.003]}
          />
        )}
        {nodes.hair_02 && (
          <mesh
            name="hair_02"
            castShadow
            receiveShadow
            geometry={nodes.hair_02.geometry}
            material={materials.male_group_01}
            position={[0, 0, 0.003]}
          />
        )}
        {nodes.clothing_jacket && (
          <mesh
            name="clothing_jacket"
            castShadow
            receiveShadow
            geometry={nodes.clothing_jacket.geometry}
            material={materials.male_group_01}
          />
        )}
        {nodes.hair_01 && (
          <mesh
            name="hair_01"
            castShadow
            receiveShadow
            geometry={nodes.hair_01.geometry}
            material={materials.male_group_01}
            position={[0, 0, 0.003]}
          />
        )}
        {nodes.clothing_jacket_02 && (
          <mesh
            name="clothing_jacket_02"
            castShadow
            receiveShadow
            geometry={nodes.clothing_jacket_02.geometry}
            material={materials.male_group_01}
            position={[-0.778, -0.791, -0.862]}
          />
        )}
        {nodes.hair_01_back && (
          <mesh
            name="hair_01_back"
            castShadow
            receiveShadow
            geometry={nodes.hair_01_back.geometry}
            material={materials.male_group_01}
            position={[0, 0, 0.003]}
          />
        )}
        {nodes.head_accessory && (
          <mesh
            name="head_accessory"
            castShadow
            receiveShadow
            geometry={nodes.head_accessory.geometry}
            material={materials.male_group_02}
            position={[0, 0, 0.003]}
          />
        )}
        {nodes.eye_brows_V02_f && (
          <mesh
            name="eye_brows_V02_f"
            castShadow
            receiveShadow
            geometry={nodes.eye_brows_V02_f.geometry}
            material={materials.male_group_02}
          />
        )}
        {nodes.mouth && (
          <mesh
            name="mouth"
            castShadow
            receiveShadow
            geometry={nodes.mouth.geometry}
            material={materials.male_group_02}
          />
        )}
        {nodes.eye_brows_V02_b && (
          <mesh
            name="eye_brows_V02_b"
            castShadow
            receiveShadow
            geometry={nodes.eye_brows_V02_b.geometry}
            material={materials.male_group_02}
          />
        )}
        {nodes.head && (
          <mesh
            name="head"
            castShadow
            receiveShadow
            geometry={nodes.head.geometry}
            material={materials.male_group_03}
          />
        )}
        {nodes.ear && (
          <mesh
            name="ear"
            castShadow
            receiveShadow
            geometry={nodes.ear.geometry}
            material={materials.male_group_03}
          />
        )}
        {nodes.headgear && (
          <mesh
            name="headgear"
            castShadow
            receiveShadow
            geometry={nodes.headgear.geometry}
            material={materials.male_group_04}
          />
        )}
        {nodes.nose && (
          <mesh
            name="nose"
            castShadow
            receiveShadow
            geometry={nodes.nose.geometry}
            material={materials.male_group_04}
            position={[-0.21, 0.06, -0.341]}
          />
        )}
        {nodes.clothing_inner_body && (
          <mesh
            name="clothing_inner_body"
            castShadow
            receiveShadow
            geometry={nodes.clothing_inner_body.geometry}
            material={materials.male_group_04}
          />
        )}
        {nodes.hand_02 && (
          <mesh
            name="hand_02"
            castShadow
            receiveShadow
            geometry={nodes.hand_02.geometry}
            material={materials.male_group_04}
            position={[-0.324, -0.481, -0.201]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        )}
        {nodes.hand && (
          <mesh
            name="hand"
            castShadow
            receiveShadow
            geometry={nodes.hand.geometry}
            material={materials.male_group_04}
            position={[-0.324, -0.481, -0.201]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        )}
        {nodes.background && (
          <mesh
            name="background"
            castShadow
            receiveShadow
            geometry={nodes.background.geometry}
            material={materials.male_group_05}
            position={[-0.12, 0.054, -2.791]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        )}
      </group>
    </group>
  )
})

export default Model
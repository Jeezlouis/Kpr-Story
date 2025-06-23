import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function Model(props) {
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
        // Create and configure KTX2 loader (only once)
        ktx2Loader = new KTX2Loader()
        
        // Set transcoder path - adjust this to your actual path
        const transcoderPath = '/basis/'
        ktx2Loader.setTranscoderPath(transcoderPath)
        
        // Detect support
        ktx2Loader.detectSupport(gl)
        
        // Create GLTF loader and set KTX2 loader
        const gltfLoader = new GLTFLoader()
        gltfLoader.setKTX2Loader(ktx2Loader)
        
        // Load the model
        const gltf = await new Promise((resolve, reject) => {
          gltfLoader.load(
            'gltf/compressed/etc1s/landing/landing-2048.glb',
            (result) => {
              // Extract nodes and materials like useGLTF does
              const nodes = {}
              const materials = {}
              
              // Traverse the scene to collect nodes
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
              
              // Add nodes and materials to the result
              result.nodes = nodes
              result.materials = materials
              
              resolve(result)
            },
            (progress) => {
              // Progress callback - can be used for loading indicators
            },
            (error) => {
              reject(error)
            }
          )
        })
        
        if (mounted) {
          setModelData(gltf)
          setLoading(false)
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
  }, [gl])

  // Get animations if model is loaded
  const { actions } = useAnimations(modelData?.animations || [], group)

  if (loading) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
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
    <group ref={group} {...props} dispose={null}>
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
}

export default Model
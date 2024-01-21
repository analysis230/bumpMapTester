'use client'

import { Canvas } from '@react-three/fiber'
import { AlphaFormat, DataTexture, FloatType, MeshStandardMaterial, PlaneGeometry, ShaderMaterial } from 'three'

import vertexShader from '../src/shaders/vertex.glsl'
import fragmentShader from '../src/shaders/fragment.glsl'
import { CameraControls } from '@react-three/drei'

function generateBumpMap(resolution = 10) {
  if (resolution % 2 === 0) resolution += 1
  const halfWayIndex = (resolution - 1) / 2

  const darkLevelsInOneLayer = Array(resolution)
    .fill(0)
    .map((_, index) => {
      const distance = Math.abs(index - halfWayIndex)
      return (1 - distance / halfWayIndex) * 255
    })

  const bumpArray = new Float32Array([...darkLevelsInOneLayer, ...darkLevelsInOneLayer])

  const bumpMap = new DataTexture(bumpArray, 2, resolution, AlphaFormat, FloatType)

  console.log(bumpMap.userData)
  return bumpMap
}

function ShaderTester() {
  const geometry = new PlaneGeometry(2, 2, 10, 10)

  const bumpMap = generateBumpMap()
  const material = new MeshStandardMaterial({ color: 'hotpink', bumpMap: bumpMap, bumpScale: 1 })

  return <mesh geometry={geometry} material={material} />
}

export default function Page() {
  return (
    <>
      <div className='bg-gray-50 flex w-full h-full flex-col flex-wrap items-center '>
        <Canvas>
          <ambientLight intensity={1} />
          <ShaderTester />
          <CameraControls />
        </Canvas>
      </div>
    </>
  )
}

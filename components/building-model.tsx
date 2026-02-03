'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Html } from '@react-three/drei'
import * as THREE from 'three'

interface BuildingProps {
  position?: [number, number, number]
  scale?: [number, number, number]
}

export function Building({ position = [0, 0, 0], scale = [1, 1, 1] }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    } else if (meshRef.current) {
      meshRef.current.position.y = position[1]
    }
  })

  const baseHeight = 5 * scale[1]
  const buildingColor = hovered ? '#60a5fa' : clicked ? '#3b82f6' : '#1e3a8a'

  return (
    <group position={position}>
      {/* Main Building */}
      <Box
        ref={meshRef}
        args={[2 * scale[0], baseHeight, 2 * scale[2]]}
        position={[0, baseHeight / 2, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <meshStandardMaterial 
          color={buildingColor}
          metalness={0.3}
          roughness={0.7}
          emissive={hovered ? '#1e40af' : '#0f172a'}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Box>

      {/* Windows */}
      {Array.from({ length: Math.floor(baseHeight) }).map((_, floor) => (
        <group key={floor}>
          {Array.from({ length: 3 }).map((_, col) => (
            <Box
              key={`${floor}-${col}`}
              args={[0.15 * scale[0], 0.3, 0.05]}
              position={[
                (col - 1) * 0.5 * scale[0],
                floor + 0.5,
                1.01 * scale[2]
              ]}
            >
              <meshStandardMaterial 
                color={clicked ? '#fbbf24' : '#60a5fa'}
                emissive={clicked ? '#fbbf24' : '#3b82f6'}
                emissiveIntensity={clicked ? 0.8 : 0.5}
              />
            </Box>
          ))}
        </group>
      ))}

      {/* Roof */}
      <Box
        args={[2.2 * scale[0], 0.3, 2.2 * scale[2]]}
        position={[0, baseHeight + 0.15, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Info Label */}
      {clicked && (
        <Html position={[0, baseHeight + 1, 0]} center>
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-card-foreground text-sm whitespace-nowrap">
            <div className="font-semibold">Building Status</div>
            <div className="text-muted-foreground text-xs mt-1">
              Height: {baseHeight.toFixed(1)}m
            </div>
            <div className="text-xs text-green-500 mt-1">● Active</div>
          </div>
        </Html>
      )}
    </group>
  )
}

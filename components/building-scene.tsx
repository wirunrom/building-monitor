'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Grid } from '@react-three/drei'
import { Building } from './building-model'

interface BuildingSceneProps {
  onBuildingSelect: (id: number) => void
  selectedBuilding: number | null
}

export function BuildingScene({ onBuildingSelect, selectedBuilding }: BuildingSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={50} />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <hemisphereLight intensity={0.5} groundColor="#1a1a2e" />

        {/* Environment and Grid */}
        <Environment preset="night" />
        <Grid 
          args={[50, 50]} 
          cellColor="#1e293b"
          sectionColor="#334155"
          fadeDistance={40}
          fadeStrength={1}
          position={[0, -0.01, 0]}
        />

        {/* Buildings */}
        <Building 
          id={0}
          position={[0, 0, 0]} 
          onSelect={onBuildingSelect}
          isSelected={selectedBuilding === 0}
        />
        <Building 
          id={1}
          position={[8, 0, 0]} 
          scale={[0.8, 1.2, 0.8]} 
          onSelect={onBuildingSelect}
          isSelected={selectedBuilding === 1}
        />
        <Building 
          id={2}
          position={[-8, 0, 2]} 
          scale={[0.6, 0.9, 0.6]} 
          onSelect={onBuildingSelect}
          isSelected={selectedBuilding === 2}
        />
        <Building 
          id={3}
          position={[4, 0, -6]} 
          scale={[0.7, 1.4, 0.7]} 
          onSelect={onBuildingSelect}
          isSelected={selectedBuilding === 3}
        />
        <Building 
          id={4}
          position={[-5, 0, -6]} 
          scale={[0.9, 1.1, 0.9]} 
          onSelect={onBuildingSelect}
          isSelected={selectedBuilding === 4}
        />
      </Canvas>
    </div>
  )
}

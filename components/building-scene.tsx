"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Grid,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import { buildings } from "@/lib/buildings-data";

interface BuildingSceneProps {
  onBuildingSelect: (id: number | null) => void;
  onFloorSelect: (buildingId: number, floor: number | null) => void;
  selectedBuilding: number | null;
  selectedFloorByBuilding: Record<number, number | null>;
}

const BuildingModel = dynamic(() => import("./building-model"), { ssr: false });

export function BuildingScene({
  onBuildingSelect,
  onFloorSelect,
  selectedBuilding,
  selectedFloorByBuilding,
}: BuildingSceneProps) {
  return (
    <div className="w-full h-full relative z-0">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        style={{ position: 'relative', zIndex: 0 }}
      >
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
        <hemisphereLight intensity={0.5} groundColor="#fff" />

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
        <BuildingModel
          id={buildings[0].id}
          floors={buildings[0].floors}
          position={[-4, 0, 0]}
          scale={[1, 1.1, 1]}
          onSelect={onBuildingSelect}
          onFloorSelect={onFloorSelect}
          selectedFloor={selectedFloorByBuilding[buildings[0].id] ?? null}
          isSelected={selectedBuilding === buildings[0].id}
        />
        <BuildingModel
          id={buildings[1].id}
          floors={buildings[1].floors}
          position={[4.5, 0, -1]}
          scale={[0.9, 1.3, 0.9]}
          onSelect={onBuildingSelect}
          onFloorSelect={onFloorSelect}
          selectedFloor={selectedFloorByBuilding[buildings[1].id] ?? null}
          isSelected={selectedBuilding === buildings[1].id}
        />
      </Canvas>
    </div>
  );
}

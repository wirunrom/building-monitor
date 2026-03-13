"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Grid,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildings } from "@/lib/buildings-data";
import * as THREE from "three";
import { useBuildingStore } from "@/lib/store";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface BuildingSceneProps {
  onBuildingSelect: (id: number | null) => void;
  onFloorSelect: (buildingId: number, floor: number | null) => void;
  selectedBuilding: number | null;
  selectedFloorByBuilding: Record<number, number | null>;
}

const BuildingModel = dynamic(() => import("./building-model"), { ssr: false });
const En001Model = dynamic(() => import("./models/En001"), { ssr: false });

function FocusController({
  focusTarget,
  focusOffset,
  minDistance,
  maxDistance,
}: {
  focusTarget: THREE.Vector3 | null;
  focusOffset: THREE.Vector3;
  minDistance: number;
  maxDistance: number;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const internalTargetRef = useRef<THREE.Vector3 | null>(null);
  const internalOffsetRef = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (focusTarget) {
      internalTargetRef.current = focusTarget.clone();
      internalOffsetRef.current = focusOffset ? focusOffset.clone() : null;
    } else {
      internalTargetRef.current = null;
      internalOffsetRef.current = null;
    }
  }, [focusTarget, focusOffset]);

  useFrame(() => {
    const controls = controlsRef.current;
    const internalTarget = internalTargetRef.current;
    const internalOffset = internalOffsetRef.current;
    if (!controls || !internalTarget || !internalOffset) return;

    const desiredTarget = internalTarget;
    const offset = internalOffset.clone();
    const offsetLength = offset.length();
    const clampedLength = Math.max(
      minDistance,
      Math.min(offsetLength, maxDistance),
    );
    offset.setLength(clampedLength);
    const desiredPosition = desiredTarget.clone().add(offset);

    controls.target.lerp(desiredTarget, 0.12);
    camera.position.lerp(desiredPosition, 0.12);
    controls.update();

    if (
      controls.target.distanceTo(desiredTarget) < 0.02 &&
      camera.position.distanceTo(desiredPosition) < 0.02
    ) {
      internalTargetRef.current = null;
      internalOffsetRef.current = null;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={minDistance}
      maxDistance={maxDistance}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

export function BuildingScene({
  onBuildingSelect,
  onFloorSelect,
  selectedBuilding,
  selectedFloorByBuilding,
}: BuildingSceneProps) {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [focusTarget, setFocusTarget] = useState<THREE.Vector3 | null>(null);
  const [focusOffset, setFocusOffset] = useState<THREE.Vector3 | null>(null);
  const cameraMinDistance = 12;
  const cameraMaxDistance = 50;
  const focusOffsetLocal = useMemo(() => new THREE.Vector3(30, 0, 0), []);
  const { floorFocusRequest, floorFocusRequestId } = useBuildingStore();

  const focusFloorIndex =
    floorFocusRequest?.buildingId === buildings[0].id
      ? floorFocusRequest.floor
      : null;

  const currentSelectedFloor = selectedFloorByBuilding[buildings[0].id] ?? null;
  const [prevSelectedFloor, setPrevSelectedFloor] = useState<number | null>(
    currentSelectedFloor,
  );

  if (currentSelectedFloor !== prevSelectedFloor) {
    setPrevSelectedFloor(currentSelectedFloor);
    if (currentSelectedFloor === null) {
      setFocusTarget(null);
      setFocusOffset(null);
    }
  }

  return (
    <div className="w-full h-full relative z-0">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        style={{ position: "relative", zIndex: 0 }}
      >
        <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={50} />
        <FocusController
          focusTarget={focusTarget}
          focusOffset={focusOffset ?? focusOffsetLocal}
          minDistance={cameraMinDistance}
          maxDistance={cameraMaxDistance}
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
        <En001Model
          position={[-4, 0, 0]}
          scale={[1, 1, 1]}
          selectedFloor={selectedFloorByBuilding[buildings[0].id] ?? null}
          hoveredFloor={hoveredFloor}
          onFloorHover={setHoveredFloor}
          onFloorSelect={(floor) => {
            const isActive = selectedFloorByBuilding[buildings[0].id] === floor;
            onBuildingSelect(buildings[0].id);
            onFloorSelect(buildings[0].id, isActive ? null : floor);
          }}
          onFloorFocus={(position, offset) => {
            setFocusTarget(position);
            setFocusOffset(offset);
          }}
          focusFloorIndex={focusFloorIndex}
          focusRequestId={floorFocusRequestId}
          floorInfo={buildings[0].floorInfo}
          focusOffset={focusOffsetLocal}
          onBuildingSelect={() => onBuildingSelect(buildings[0].id)}
        />
        {/* <BuildingModel
          id={buildings[1].id}
          floors={buildings[1].floors}
          position={[4.5, 0, -1]}
          scale={[0.9, 1.3, 0.9]}
          onSelect={onBuildingSelect}
          onFloorSelect={onFloorSelect}
          selectedFloor={selectedFloorByBuilding[buildings[1].id] ?? null}
          isSelected={selectedBuilding === buildings[1].id}
        /> */}
      </Canvas>
    </div>
  );
}

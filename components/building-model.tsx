"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Html } from "@react-three/drei";
import * as THREE from "three";

interface BuildingProps {
  id: number;
  floors: number;
  position?: [number, number, number];
  scale?: [number, number, number];
  onSelect: (id: number | null) => void;
  onFloorSelect: (buildingId: number, floor: number | null) => void;
  isSelected: boolean;
  selectedFloor: number | null;
}

export default function Building({
  id,
  floors,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  onSelect,
  onFloorSelect,
  isSelected,
  selectedFloor,
}: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);

  const { floorHeight, floorGap, buildingHeight, roofHeight } = useMemo(() => {
    const height = 0.9 * scale[1];
    const gap = 0.08 * scale[1];
    const roof = 0.28 * scale[1];
    const totalHeight = floors * height + (floors - 1) * gap;
    return { floorHeight: height, floorGap: gap, buildingHeight: totalHeight, roofHeight: roof };
  }, [floors, scale]);

  useFrame((state) => {
    if (groupRef.current) {
      if (hovered || isSelected) {
        groupRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      } else {
        // Smooth transition back to original position
        const target = position[1];
        groupRef.current.position.y +=
          (target - groupRef.current.position.y) * 0.1;
      }
    }
  });

  const buildingColor = hovered
    ? "#60a5fa"
    : isSelected
      ? "#3b82f6"
      : "#1e3a8a";

  const handleFloorSelect = (floorIndex: number) => {
    onSelect(id);
    const nextFloor =
      isSelected && selectedFloor === floorIndex ? null : floorIndex;
    onFloorSelect(id, nextFloor);
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Floors */}
      {Array.from({ length: floors }).map((_, floor) => {
        const isFloorSelected = isSelected && selectedFloor === floor;
        const isFloorHovered = hoveredFloor === floor;
        const y =
          floorHeight / 2 + floor * (floorHeight + floorGap);
        return (
          <Box
            key={floor}
            args={[2 * scale[0], floorHeight, 2 * scale[2]]}
            position={[0, y, 0]}
            castShadow
            receiveShadow
            onPointerOver={(event) => {
              event.stopPropagation();
              setHovered(true);
              setHoveredFloor(floor);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              setHovered(false);
              setHoveredFloor(null);
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleFloorSelect(floor);
            }}
          >
            <meshStandardMaterial
              color={
                isFloorSelected
                  ? "#fbbf24"
                  : isFloorHovered
                    ? "#7dd3fc"
                    : buildingColor
              }
              metalness={0.35}
              roughness={0.6}
              emissive={
                isFloorSelected
                  ? "#f59e0b"
                  : isFloorHovered
                    ? "#38bdf8"
                    : "#0f172a"
              }
              emissiveIntensity={isFloorSelected ? 0.7 : isFloorHovered ? 0.35 : 0.15}
            />
          </Box>
        );
      })}

      {/* Accent Windows */}
      {Array.from({ length: floors }).map((_, floor) => {
        const y =
          floorHeight / 2 + floor * (floorHeight + floorGap);
        return (
          <group key={`windows-${floor}`}>
            {Array.from({ length: 3 }).map((_, col) => (
              <Box
                key={`${floor}-${col}`}
                args={[0.18 * scale[0], 0.22 * scale[1], 0.05]}
                position={[
                  (col - 1) * 0.55 * scale[0],
                  y,
                  1.02 * scale[2],
                ]}
              >
                <meshStandardMaterial
                  color={isSelected ? "#fde68a" : "#93c5fd"}
                  emissive={isSelected ? "#fbbf24" : "#60a5fa"}
                  emissiveIntensity={isSelected ? 0.7 : 0.4}
                />
              </Box>
            ))}
          </group>
        );
      })}

      {/* Roof */}
      <Box
        args={[2.2 * scale[0], 0.3, 2.2 * scale[2]]}
        position={[0, buildingHeight + roofHeight / 2, 0]}
        castShadow
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHovered(false);
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(id);
        }}
      >
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Info Label - Lower z-index than dashboard */}
      {isSelected && (
        <Html
          position={[0, buildingHeight + roofHeight + 0.8, 0]}
          center
          zIndexRange={[0, 50]}
        >
          <div className="bg-card border border-primary rounded-lg px-3 py-2 shadow-lg text-card-foreground text-sm whitespace-nowrap z-10">
            <div className="font-semibold">Building {id + 1}</div>
            <div className="text-muted-foreground text-xs mt-1">
              Floors: {floors} • Height: {buildingHeight.toFixed(1)}m
            </div>
            <div className="text-xs text-primary mt-1">
              Floor: {selectedFloor !== null ? selectedFloor + 1 : "None"}
            </div>
            <div className="text-xs text-green-500 mt-1">● Selected</div>
          </div>
        </Html>
      )}
    </group>
  );
}

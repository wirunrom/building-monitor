import { create } from 'zustand'

interface BuildingState {
  selectedBuilding: number | null
  selectedFloorByBuilding: Record<number, number | null>
  floorFocusRequest: { buildingId: number; floor: number } | null
  floorFocusRequestId: number
  isDrawerExpanded: boolean
  setSelectedBuilding: (id: number | null) => void
  setSelectedFloor: (buildingId: number, floor: number | null) => void
  requestFloorFocus: (buildingId: number, floor: number) => void
  setDrawerExpanded: (expanded: boolean) => void
  toggleDrawer: () => void
}

export const useBuildingStore = create<BuildingState>((set) => ({
  selectedBuilding: null,
  selectedFloorByBuilding: { 0: null, 1: null },
  floorFocusRequest: null,
  floorFocusRequestId: 0,
  isDrawerExpanded: false,
  setSelectedBuilding: (id) => set({ selectedBuilding: id }),
  setSelectedFloor: (buildingId, floor) =>
    set((state) => ({
      selectedFloorByBuilding: {
        ...state.selectedFloorByBuilding,
        [buildingId]: floor,
      },
    })),
  requestFloorFocus: (buildingId, floor) =>
    set((state) => ({
      floorFocusRequest: { buildingId, floor },
      floorFocusRequestId: state.floorFocusRequestId + 1,
    })),
  setDrawerExpanded: (expanded) => set({ isDrawerExpanded: expanded }),
  toggleDrawer: () => set((state) => ({ isDrawerExpanded: !state.isDrawerExpanded })),
}))

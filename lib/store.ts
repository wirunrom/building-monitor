import { create } from 'zustand'

interface BuildingState {
  selectedBuilding: number | null
  selectedFloorByBuilding: Record<number, number | null>
  isDrawerExpanded: boolean
  setSelectedBuilding: (id: number | null) => void
  setSelectedFloor: (buildingId: number, floor: number | null) => void
  setDrawerExpanded: (expanded: boolean) => void
  toggleDrawer: () => void
}

export const useBuildingStore = create<BuildingState>((set) => ({
  selectedBuilding: null,
  selectedFloorByBuilding: { 0: null, 1: null },
  isDrawerExpanded: false,
  setSelectedBuilding: (id) => set({ selectedBuilding: id }),
  setSelectedFloor: (buildingId, floor) =>
    set((state) => ({
      selectedFloorByBuilding: {
        ...state.selectedFloorByBuilding,
        [buildingId]: floor,
      },
    })),
  setDrawerExpanded: (expanded) => set({ isDrawerExpanded: expanded }),
  toggleDrawer: () => set((state) => ({ isDrawerExpanded: !state.isDrawerExpanded })),
}))

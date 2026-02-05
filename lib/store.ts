import { create } from 'zustand'

interface BuildingState {
  selectedBuilding: number | null
  isDrawerExpanded: boolean
  setSelectedBuilding: (id: number | null) => void
  setDrawerExpanded: (expanded: boolean) => void
  toggleDrawer: () => void
}

export const useBuildingStore = create<BuildingState>((set) => ({
  selectedBuilding: null,
  isDrawerExpanded: false,
  setSelectedBuilding: (id) => set({ selectedBuilding: id }),
  setDrawerExpanded: (expanded) => set({ isDrawerExpanded: expanded }),
  toggleDrawer: () => set((state) => ({ isDrawerExpanded: !state.isDrawerExpanded })),
}))

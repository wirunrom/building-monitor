'use client'

import { useState } from 'react'
import { BuildingScene } from '@/components/building-scene'
import { DashboardDrawer } from '@/components/dashboard-drawer'
import { Header } from '@/components/header'

export default function Page() {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Header />
      <main className="h-full w-full pt-16 pb-[25vh]">
        <BuildingScene onBuildingSelect={setSelectedBuilding} selectedBuilding={selectedBuilding} />
      </main>
      <DashboardDrawer selectedBuilding={selectedBuilding} />
    </div>
  )
}

import { BuildingScene } from '@/components/building-scene'
import { DashboardDrawer } from '@/components/dashboard-drawer'
import { Header } from '@/components/header'

export default function Page() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Header />
      <main className="h-full w-full pt-16">
        <BuildingScene />
      </main>
      <DashboardDrawer />
    </div>
  )
}

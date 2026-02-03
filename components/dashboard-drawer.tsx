'use client'

import { useState } from 'react'
import { ChevronUp, Activity, Building2, Zap, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DashboardCharts } from './dashboard-charts'

export function DashboardDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-4rem)]'
        }`}
        style={{ height: '70vh' }}
      >
        {/* Handle */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-accent"
            >
              <ChevronUp className={`h-5 w-5 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
            </Button>
            <h2 className="text-lg font-semibold text-card-foreground">Building Analytics Dashboard</h2>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">5 Buildings</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">All Active</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-muted-foreground">87.2 kW</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-4rem)] overflow-y-auto">
          {isOpen ? (
            <div className="p-6">
              <DashboardCharts />
            </div>
          ) : (
            <div className="px-6 py-3">
              <p className="text-sm text-muted-foreground">Click to expand dashboard</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

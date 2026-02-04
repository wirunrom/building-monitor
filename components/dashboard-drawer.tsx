"use client";

import { useState } from "react";
import { ChevronUp, Activity, Building2, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardCharts } from "./dashboard-charts";

interface DashboardDrawerProps {
  selectedBuilding: number | null;
}

export function DashboardDrawer({ selectedBuilding }: DashboardDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Overlay for expanded state */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Drawer - Always visible at 25vh, expands to 90vh */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? "h-[90vh]" : "h-[25vh]"
        }`}
      >
        {/* Handle */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:bg-accent"
            >
              <ChevronUp
                className={`h-5 w-5 transition-transform ${isExpanded ? "" : "rotate-180"}`}
              />
            </Button>
            <h2 className="text-base md:text-lg font-semibold text-card-foreground">
              {selectedBuilding !== null
                ? `Building ${selectedBuilding + 1} Analytics`
                : "Building Analytics Dashboard"}
            </h2>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6">
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
        <div className="h-[calc(100%-3.5rem)] overflow-hidden">
          <DashboardCharts
            selectedBuilding={selectedBuilding}
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </>
  );
}

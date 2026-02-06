"use client";

import { ChevronUp, Activity, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "./dashboard-charts";
import { useBuildingStore } from "@/lib/store";
import { AnimatePresence, motion } from "motion/react";

export function DashboardDrawer() {
  const { selectedBuilding, isDrawerExpanded, toggleDrawer } =
    useBuildingStore();

  return (
    <>
      {/* Overlay for expanded state - Lower z-index than drawer */}
      <AnimatePresence>
        {isDrawerExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-100"
            onClick={toggleDrawer}
          />
        )}
      </AnimatePresence>

      {/* Drawer - Always visible at 25vh, expands to 90vh - Highest z-index */}
      <motion.div
        initial={false}
        animate={{ height: isDrawerExpanded ? "90vh" : "25vh" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-200"
      >
        {/* Handle */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDrawer}
              className="hover:bg-accent"
            >
              <motion.div
                animate={{ rotate: isDrawerExpanded ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.div>
            </Button>
            <motion.h2
              layout
              className="text-base md:text-lg font-semibold text-card-foreground"
            >
              {selectedBuilding !== null
                ? `Building ${selectedBuilding + 1} Analytics`
                : "Building Analytics Dashboard"}
            </motion.h2>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-6"
          >
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
          </motion.div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-3.5rem)] overflow-hidden">
          <DashboardCharts />
        </div>
      </motion.div>
    </>
  );
}

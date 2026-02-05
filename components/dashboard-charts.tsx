"use client";

import { Card } from "@/components/ui/card";
import {
  Activity,
  Zap,
  Thermometer,
  Building2,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useBuildingStore } from "@/lib/store";
import { motion } from "motion/react";

// Sample data
const energyData = [
  {
    time: "00:00",
    building1: 45,
    building2: 38,
    building3: 42,
    building4: 35,
    building5: 40,
  },
  {
    time: "04:00",
    building1: 42,
    building2: 35,
    building3: 38,
    building4: 32,
    building5: 37,
  },
  {
    time: "08:00",
    building1: 65,
    building2: 58,
    building3: 62,
    building4: 55,
    building5: 60,
  },
  {
    time: "12:00",
    building1: 75,
    building2: 68,
    building3: 72,
    building4: 65,
    building5: 70,
  },
  {
    time: "16:00",
    building1: 82,
    building2: 75,
    building3: 78,
    building4: 72,
    building5: 77,
  },
  {
    time: "20:00",
    building1: 58,
    building2: 52,
    building3: 55,
    building4: 48,
    building5: 53,
  },
  {
    time: "24:00",
    building1: 48,
    building2: 42,
    building3: 45,
    building4: 38,
    building5: 43,
  },
];

const occupancyData = [
  { building: "Building 1", occupancy: 85, capacity: 100 },
  { building: "Building 2", occupancy: 72, capacity: 100 },
  { building: "Building 3", occupancy: 91, capacity: 100 },
  { building: "Building 4", occupancy: 68, capacity: 100 },
  { building: "Building 5", occupancy: 78, capacity: 100 },
];

const temperatureData = [
  { time: "00:00", temp: 22.5 },
  { time: "04:00", temp: 21.8 },
  { time: "08:00", temp: 23.2 },
  { time: "12:00", temp: 24.5 },
  { time: "16:00", temp: 25.1 },
  { time: "20:00", temp: 23.8 },
  { time: "24:00", temp: 22.9 },
];

const statsData = [
  {
    title: "Total Energy Usage",
    value: "87.2 kW",
    change: "+12.5%",
    trend: "up",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "Average Occupancy",
    value: "78.8%",
    change: "+5.2%",
    trend: "up",
    icon: Activity,
    color: "text-blue-500",
  },
  {
    title: "Avg Temperature",
    value: "23.4°C",
    change: "-1.2%",
    trend: "down",
    icon: Thermometer,
    color: "text-green-500",
  },
  {
    title: "Active Alerts",
    value: "3",
    change: "-2",
    trend: "down",
    icon: TrendingUp,
    color: "text-red-500",
  },
];

// Static chart colors - using hsl values to avoid hydration mismatch
const chartColors = {
  chart1: "hsl(221.2 83.2% 53.3%)",
  chart2: "hsl(212 95% 68%)",
  chart3: "hsl(216 92% 60%)",
  chart4: "hsl(221 83% 53%)",
  chart5: "hsl(224 76% 48%)",
};

// Building details
const buildingDetails = [
  {
    id: 0,
    name: "Building 1",
    height: "5.0m",
    floors: 5,
    occupancy: 85,
    energy: 75,
    temp: 23.5,
    status: "Operational",
    systems: { hvac: "Active", security: "Active", elevator: "Active" },
  },
  {
    id: 1,
    name: "Building 2",
    height: "6.0m",
    floors: 6,
    occupancy: 72,
    energy: 68,
    temp: 24.1,
    status: "Operational",
    systems: { hvac: "Active", security: "Active", elevator: "Maintenance" },
  },
  {
    id: 2,
    name: "Building 3",
    height: "4.5m",
    floors: 5,
    occupancy: 91,
    energy: 72,
    temp: 22.8,
    status: "Operational",
    systems: { hvac: "Active", security: "Active", elevator: "Active" },
  },
  {
    id: 3,
    name: "Building 4",
    height: "7.0m",
    floors: 7,
    occupancy: 68,
    energy: 65,
    temp: 23.9,
    status: "Operational",
    systems: { hvac: "Active", security: "Active", elevator: "Active" },
  },
  {
    id: 4,
    name: "Building 5",
    height: "5.5m",
    floors: 6,
    occupancy: 78,
    energy: 70,
    temp: 23.2,
    status: "Operational",
    systems: { hvac: "Active", security: "Active", elevator: "Active" },
  },
];

export function DashboardCharts() {
  const { selectedBuilding, isDrawerExpanded } = useBuildingStore();
  const building =
    selectedBuilding !== null ? buildingDetails[selectedBuilding] : null;

  return (
    <div
      className={`h-full p-4 md:p-6 ${isDrawerExpanded ? "overflow-y-auto" : "overflow-y-hidden"}`}
    >
      {/* Selected Building Info */}
      {building && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 mb-4 bg-primary/10 border-primary/30">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {building.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Height: {building.height} • {building.floors} Floors • Status:{" "}
                  {building.status}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Occupancy</p>
                  <p className="text-sm font-semibold">{building.occupancy}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Energy</p>
                  <p className="text-sm font-semibold">{building.energy} kW</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="text-sm font-semibold">{building.temp}°C</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Systems</p>
                  <p className="text-sm font-semibold text-green-500">
                    ● Active
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Stats Cards - Horizontal scroll when collapsed on large screens, grid when expanded */}
      <div
        className={`mb-4 ${
          isDrawerExpanded
            ? "grid grid-cols-2 lg:grid-cols-4 gap-3"
            : "hidden lg:flex lg:gap-3 lg:overflow-x-auto lg:pb-2"
        }`}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            className={!isDrawerExpanded ? "flex-shrink-0" : ""}
          >
            <Card className={`p-3 ${!isDrawerExpanded ? "w-[160px]" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-lg font-bold mt-1 text-card-foreground">
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid - Horizontal scroll when collapsed on large screens, grid when expanded */}
      <div
        className={`${
          isDrawerExpanded
            ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
            : "flex gap-4 overflow-x-auto lg:overflow-x-auto pb-2"
        }`}
      >
        {/* Energy Consumption Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={!isDrawerExpanded ? "flex-shrink-0" : ""}
        >
          <Card
            className={`p-4 ${!isDrawerExpanded ? "w-[320px] sm:w-[400px]" : ""}`}
          >
            <h3 className="text-base font-semibold mb-3 text-card-foreground">
              Energy Consumption (24h)
            </h3>
            <ChartContainer
              config={{
                building1: { label: "Building 1", color: chartColors.chart1 },
                building2: { label: "Building 2", color: chartColors.chart2 },
                building3: { label: "Building 3", color: chartColors.chart3 },
                building4: { label: "Building 4", color: chartColors.chart4 },
                building5: { label: "Building 5", color: chartColors.chart5 },
              }}
              className={`w-full aspect-auto ${isDrawerExpanded ? "h-[300px]" : "h-[180px]"}`}
            >
              <AreaChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" style={{ fontSize: "11px" }} />
                <YAxis style={{ fontSize: "11px" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="building1"
                  stackId="1"
                  stroke="var(--color-building1)"
                  fill="var(--color-building1)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="building2"
                  stackId="1"
                  stroke="var(--color-building2)"
                  fill="var(--color-building2)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="building3"
                  stackId="1"
                  stroke="var(--color-building3)"
                  fill="var(--color-building3)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="building4"
                  stackId="1"
                  stroke="var(--color-building4)"
                  fill="var(--color-building4)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="building5"
                  stackId="1"
                  stroke="var(--color-building5)"
                  fill="var(--color-building5)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </Card>
        </motion.div>

        {/* Occupancy Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={!isDrawerExpanded ? "flex-shrink-0" : ""}
        >
          <Card
            className={`p-4 ${!isDrawerExpanded ? "w-[320px] sm:w-[400px]" : ""}`}
          >
            <h3 className="text-base font-semibold mb-3 text-card-foreground">
              Building Occupancy
            </h3>
            <ChartContainer
              config={{
                occupancy: { label: "Occupancy %", color: chartColors.chart1 },
              }}
              className={`w-full aspect-auto ${isDrawerExpanded ? "h-[300px]" : "h-[180px]"}`}
            >
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="building" style={{ fontSize: "10px" }} />
                <YAxis style={{ fontSize: "11px" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="occupancy"
                  fill="var(--color-occupancy)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </Card>
        </motion.div>

        {/* Temperature Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={!isDrawerExpanded ? "flex-shrink-0" : ""}
        >
          <Card
            className={`p-4 ${!isDrawerExpanded ? "w-[320px] sm:w-[400px]" : ""}`}
          >
            <h3 className="text-base font-semibold mb-3 text-card-foreground">
              Average Temperature (24h)
            </h3>
            <ChartContainer
              config={{
                temp: { label: "Temperature (°C)", color: chartColors.chart3 },
              }}
              className={`w-full aspect-auto ${isDrawerExpanded ? "h-[300px]" : "h-[180px]"}`}
            >
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" style={{ fontSize: "11px" }} />
                <YAxis domain={[20, 26]} style={{ fontSize: "11px" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="var(--color-temp)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-temp)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </Card>
        </motion.div>

        {/* Status Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={!isDrawerExpanded ? "flex-shrink-0" : ""}
        >
          <Card
            className={`p-4 ${!isDrawerExpanded ? "w-[320px] sm:w-[400px]" : ""}`}
          >
            <h3 className="text-base font-semibold mb-3 text-card-foreground">
              System Status
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "HVAC System",
                  status: "Operational",
                  color: "bg-green-500",
                },
                {
                  name: "Security System",
                  status: "Active",
                  color: "bg-green-500",
                },
                {
                  name: "Fire Safety",
                  status: "Operational",
                  color: "bg-green-500",
                },
                {
                  name: "Elevator System",
                  status: "Maintenance",
                  color: "bg-yellow-500",
                },
                {
                  name: "Power Grid",
                  status: "Operational",
                  color: "bg-green-500",
                },
                {
                  name: "Water System",
                  status: "Operational",
                  color: "bg-green-500",
                },
              ].map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <span className="text-sm font-medium text-card-foreground">
                    {system.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className={`h-2 w-2 rounded-full ${system.color}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {system.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

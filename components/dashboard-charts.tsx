'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, Activity, Zap, Thermometer } from 'lucide-react'
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
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

// Sample data
const energyData = [
  { time: '00:00', building1: 45, building2: 38, building3: 42, building4: 35, building5: 40 },
  { time: '04:00', building1: 42, building2: 35, building3: 38, building4: 32, building5: 37 },
  { time: '08:00', building1: 65, building2: 58, building3: 62, building4: 55, building5: 60 },
  { time: '12:00', building1: 75, building2: 68, building3: 72, building4: 65, building5: 70 },
  { time: '16:00', building1: 82, building2: 75, building3: 78, building4: 72, building5: 77 },
  { time: '20:00', building1: 58, building2: 52, building3: 55, building4: 48, building5: 53 },
  { time: '24:00', building1: 48, building2: 42, building3: 45, building4: 38, building5: 43 },
]

const occupancyData = [
  { building: 'Building 1', occupancy: 85, capacity: 100 },
  { building: 'Building 2', occupancy: 72, capacity: 100 },
  { building: 'Building 3', occupancy: 91, capacity: 100 },
  { building: 'Building 4', occupancy: 68, capacity: 100 },
  { building: 'Building 5', occupancy: 78, capacity: 100 },
]

const temperatureData = [
  { time: '00:00', temp: 22.5 },
  { time: '04:00', temp: 21.8 },
  { time: '08:00', temp: 23.2 },
  { time: '12:00', temp: 24.5 },
  { time: '16:00', temp: 25.1 },
  { time: '20:00', temp: 23.8 },
  { time: '24:00', temp: 22.9 },
]

const statsData = [
  {
    title: 'Total Energy Usage',
    value: '87.2 kW',
    change: '+12.5%',
    trend: 'up',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    title: 'Average Occupancy',
    value: '78.8%',
    change: '+5.2%',
    trend: 'up',
    icon: Activity,
    color: 'text-blue-500'
  },
  {
    title: 'Avg Temperature',
    value: '23.4°C',
    change: '-1.2%',
    trend: 'down',
    icon: Thermometer,
    color: 'text-green-500'
  },
  {
    title: 'Active Alerts',
    value: '3',
    change: '-2',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-red-500'
  },
]

// Color computation for charts
const colors = {
  chart1: '#60a5fa',
  chart2: '#3b82f6',
  chart3: '#2563eb',
  chart4: '#1d4ed8',
  chart5: '#1e40af',
  grid: '#1e293b',
  text: '#94a3b8'
}

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-card-foreground">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Consumption Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Energy Consumption (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis 
                dataKey="time" 
                stroke={colors.text}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={colors.text}
                style={{ fontSize: '12px' }}
                label={{ value: 'kW', angle: -90, position: 'insideLeft', fill: colors.text }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="building1" 
                stackId="1" 
                stroke={colors.chart1} 
                fill={colors.chart1} 
                fillOpacity={0.6}
                name="Building 1"
              />
              <Area 
                type="monotone" 
                dataKey="building2" 
                stackId="1" 
                stroke={colors.chart2} 
                fill={colors.chart2} 
                fillOpacity={0.6}
                name="Building 2"
              />
              <Area 
                type="monotone" 
                dataKey="building3" 
                stackId="1" 
                stroke={colors.chart3} 
                fill={colors.chart3} 
                fillOpacity={0.6}
                name="Building 3"
              />
              <Area 
                type="monotone" 
                dataKey="building4" 
                stackId="1" 
                stroke={colors.chart4} 
                fill={colors.chart4} 
                fillOpacity={0.6}
                name="Building 4"
              />
              <Area 
                type="monotone" 
                dataKey="building5" 
                stackId="1" 
                stroke={colors.chart5} 
                fill={colors.chart5} 
                fillOpacity={0.6}
                name="Building 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Occupancy Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Building Occupancy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis 
                dataKey="building" 
                stroke={colors.text}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={colors.text}
                style={{ fontSize: '12px' }}
                label={{ value: '%', angle: -90, position: 'insideLeft', fill: colors.text }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Bar dataKey="occupancy" fill={colors.chart1} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Temperature Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Average Temperature (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis 
                dataKey="time" 
                stroke={colors.text}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={colors.text}
                style={{ fontSize: '12px' }}
                domain={[20, 26]}
                label={{ value: '°C', angle: -90, position: 'insideLeft', fill: colors.text }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke={colors.chart3} 
                strokeWidth={3}
                dot={{ fill: colors.chart3, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">System Status</h3>
          <div className="space-y-4">
            {[
              { name: 'HVAC System', status: 'Operational', color: 'bg-green-500' },
              { name: 'Security System', status: 'Active', color: 'bg-green-500' },
              { name: 'Fire Safety', status: 'Operational', color: 'bg-green-500' },
              { name: 'Elevator System', status: 'Maintenance', color: 'bg-yellow-500' },
              { name: 'Power Grid', status: 'Operational', color: 'bg-green-500' },
              { name: 'Water System', status: 'Operational', color: 'bg-green-500' },
            ].map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-card-foreground">{system.name}</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${system.color}`} />
                  <span className="text-sm text-muted-foreground">{system.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

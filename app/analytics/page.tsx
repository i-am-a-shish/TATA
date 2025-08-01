"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, BarChart3, Zap, Brain, Target, Cpu } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function AnalyticsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("v2i_logged_in")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setLoading(false)
  }, [router])

  // Mock analytics data
  const performanceData = [
    { time: "00:00", cpu: 45, memory: 62, network: 78, threats: 12 },
    { time: "04:00", cpu: 52, memory: 58, network: 82, threats: 8 },
    { time: "08:00", cpu: 78, memory: 71, network: 85, threats: 15 },
    { time: "12:00", cpu: 85, memory: 79, network: 88, threats: 22 },
    { time: "16:00", cpu: 92, memory: 85, network: 91, threats: 18 },
    { time: "20:00", cpu: 67, memory: 73, network: 86, threats: 14 },
  ]

  const threatAnalysis = [
    { category: "Traffic Anomalies", value: 35, color: "#06B6D4" },
    { category: "Network Intrusions", value: 28, color: "#F59E0B" },
    { category: "System Failures", value: 22, color: "#EF4444" },
    { category: "Sensor Malfunctions", value: 15, color: "#8B5CF6" },
  ]

  const neuralEfficiency = [
    { subject: "Processing Speed", A: 92, fullMark: 100 },
    { subject: "Accuracy", A: 88, fullMark: 100 },
    { subject: "Reliability", A: 95, fullMark: 100 },
    { subject: "Adaptability", A: 78, fullMark: 100 },
    { subject: "Scalability", A: 85, fullMark: 100 },
    { subject: "Security", A: 96, fullMark: 100 },
  ]

  const regionPerformance = [
    { region: "Downtown", messages: 1250, efficiency: 94, threats: 8 },
    { region: "Highway A", messages: 980, efficiency: 87, threats: 12 },
    { region: "Industrial", messages: 750, efficiency: 91, threats: 5 },
    { region: "Residential", messages: 650, efficiency: 89, threats: 3 },
    { region: "Airport", messages: 1100, efficiency: 96, threats: 7 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-cyan-400 font-mono">ANALYZING NEURAL PATTERNS...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg"
              >
                <Brain className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NEURAL ANALYTICS
                </h1>
                <p className="text-xs text-gray-400 font-mono">ADVANCED INTELLIGENCE METRICS</p>
              </div>
            </motion.div>

            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
              <Zap className="h-3 w-3 mr-1" />
              REAL-TIME ANALYSIS
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center font-mono">
                <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
                SYSTEM PERFORMANCE MATRIX
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.9)",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stackId="1"
                    stroke="#06B6D4"
                    fill="url(#colorCpu)"
                    name="CPU Usage"
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stackId="2"
                    stroke="#F59E0B"
                    fill="url(#colorMemory)"
                    name="Memory Usage"
                  />
                  <Area
                    type="monotone"
                    dataKey="network"
                    stackId="3"
                    stroke="#10B981"
                    fill="url(#colorNetwork)"
                    name="Network Load"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Threat Analysis */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-mono">
                  <Target className="h-5 w-5 mr-2 text-cyan-400" />
                  THREAT CLASSIFICATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={threatAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="category" stroke="rgba(255,255,255,0.7)" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(6, 182, 212, 0.3)",
                        borderRadius: "8px",
                        color: "white",
                      }}
                    />
                    <Bar dataKey="value" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Neural Efficiency Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-mono">
                  <Cpu className="h-5 w-5 mr-2 text-cyan-400" />
                  NEURAL EFFICIENCY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={neuralEfficiency}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
                    />
                    <Radar
                      name="Efficiency"
                      dataKey="A"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Region Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center font-mono">
                <BarChart3 className="h-5 w-5 mr-2 text-cyan-400" />
                REGIONAL PERFORMANCE ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyan-500/20">
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">REGION</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">MESSAGES</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">EFFICIENCY</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">THREATS</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionPerformance.map((region, index) => (
                      <motion.tr
                        key={region.region}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
                      >
                        <td className="py-4 px-4 text-white font-mono">{region.region}</td>
                        <td className="py-4 px-4 text-gray-300 font-mono">{region.messages.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${region.efficiency}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                              />
                            </div>
                            <span className="text-white font-mono text-sm">{region.efficiency}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`font-mono ${
                              region.threats <= 5
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : region.threats <= 10
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {region.threats}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`font-mono ${
                              region.efficiency >= 90
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : region.efficiency >= 80
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {region.efficiency >= 90 ? "OPTIMAL" : region.efficiency >= 80 ? "STABLE" : "DEGRADED"}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

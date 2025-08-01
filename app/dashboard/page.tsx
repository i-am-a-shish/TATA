"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  LogOut,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Users,
  Clock,
  Settings,
  HelpCircle,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

interface V2IMessage {
  _id: string
  vehicleId: string
  sensorType: string
  status: string
  severity: "Normal" | "Warning" | "Critical"
  timestamp: string
  region: string
  messageDescription: string
  location: string
}

interface DashboardStats {
  totalMessages: number
  criticalAlerts: number
  warningAlerts: number
  normalMessages: number
  regionsActive: number
  activeVehicles: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<V2IMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<V2IMessage[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    criticalAlerts: 0,
    warningAlerts: 0,
    normalMessages: 0,
    regionsActive: 0,
    activeVehicles: 0,
  })
  const [filters, setFilters] = useState({
    severity: "All severities",
    vehicleId: "",
    region: "All regions",
    dateRange: "today",
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showTour, setShowTour] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const messagesPerPage = 10

  // Chart data
  const [chartData, setChartData] = useState({
    timeline: [],
    severity: [],
    regions: [],
  })

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("v2i_logged_in")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Check if first time user
    const hasSeenTour = localStorage.getItem("v2i_tour_completed")
    if (!hasSeenTour) {
      setShowTour(true)
    }

    // Start data simulation
    startSimulation()

    // Fetch initial data
    fetchMessages()

    // Set up real-time updates
    const interval = setInterval(fetchMessages, 3000)

    return () => clearInterval(interval)
  }, [router])

  useEffect(() => {
    applyFilters()
  }, [messages, filters])

  const startSimulation = async () => {
    try {
      await fetch("/api/simulate-messages", { method: "POST" })
    } catch (error) {
      console.error("Failed to start simulation:", error)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages/latest")
      const data = await response.json()

      if (response.ok) {
        setMessages(data.messages)
        setStats(data.stats)
        setChartData(data.chartData)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...messages]

    if (filters.severity !== "All severities") {
      filtered = filtered.filter((msg) => msg.severity === filters.severity)
    }

    if (filters.vehicleId) {
      filtered = filtered.filter((msg) => msg.vehicleId.toLowerCase().includes(filters.vehicleId.toLowerCase()))
    }

    if (filters.region !== "All regions") {
      filtered = filtered.filter((msg) => msg.region === filters.region)
    }

    if (filters.dateRange === "hour") {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      filtered = filtered.filter((msg) => new Date(msg.timestamp) > oneHourAgo)
    }

    setFilteredMessages(filtered)
    setCurrentPage(1)
  }

  const handleLogout = () => {
    localStorage.removeItem("v2i_logged_in")
    localStorage.removeItem("v2i_user")
    router.push("/login")
  }

  const startTour = () => {
    setShowTour(true)
    setTourStep(0)
  }

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1)
    } else {
      setShowTour(false)
      localStorage.setItem("v2i_tour_completed", "true")
    }
  }

  const tourSteps = [
    {
      target: "stats-cards",
      title: "Neural Statistics Hub",
      description: "Monitor real-time V2I communication metrics with quantum-speed processing.",
    },
    {
      target: "charts-section",
      title: "Predictive Analytics",
      description: "AI-powered charts showing traffic patterns and threat analysis.",
    },
    {
      target: "filters-section",
      title: "Advanced Filtering",
      description: "Use neural filters to analyze specific data patterns and anomalies.",
    },
    {
      target: "messages-table",
      title: "Live Data Stream",
      description: "Real-time V2I messages with intelligent threat classification.",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-gradient-to-r from-red-500 to-red-600"
      case "Warning":
        return "bg-gradient-to-r from-yellow-500 to-orange-500"
      case "Normal":
        return "bg-gradient-to-r from-cyan-500 to-blue-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <XCircle className="h-4 w-4" />
      case "Warning":
        return <AlertTriangle className="h-4 w-4" />
      case "Normal":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage)
  const startIndex = (currentPage - 1) * messagesPerPage
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + messagesPerPage)

  const regions = [...new Set(messages.map((msg) => msg.region))]

  const COLORS = ["#06B6D4", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"]

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-cyan-400 font-mono">INITIALIZING NEURAL NETWORKS...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Tour Overlay */}
      <AnimatePresence>
        {showTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 border border-cyan-500/30 rounded-xl p-8 max-w-md mx-4 backdrop-blur-xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tourSteps[tourStep].title}</h3>
                <p className="text-gray-400 mb-6">{tourSteps[tourStep].description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-mono">
                    {tourStep + 1} / {tourSteps.length}
                  </span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowTour(false)
                        localStorage.setItem("v2i_tour_completed", "true")
                      }}
                      className="border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={nextTourStep}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      {tourStep === tourSteps.length - 1 ? "Complete" : "Next"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg"
              >
                <Shield className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  V2I WATCHTOWER
                </h1>
                <p className="text-xs text-gray-400 font-mono">NEURAL INFRASTRUCTURE MONITOR</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
                  NEURAL LINK ACTIVE
                </Badge>
              </motion.div>

              <Button
                onClick={startTour}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Tour
              </Button>

              <Button
                onClick={() => router.push("/settings")}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
              >
                <Settings className="h-4 w-4" />
              </Button>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div id="stats-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          {[
            {
              title: "Neural Messages",
              value: stats.totalMessages,
              icon: Activity,
              color: "from-blue-400 to-cyan-600",
              change: "+12%",
            },
            {
              title: "Critical Threats",
              value: stats.criticalAlerts,
              icon: XCircle,
              color: "from-red-500 to-red-600",
              change: "-5%",
            },
            {
              title: "Warnings",
              value: stats.warningAlerts,
              icon: AlertTriangle,
              color: "from-yellow-500 to-orange-500",
              change: "+8%",
            },
            {
              title: "Normal Status",
              value: stats.normalMessages,
              icon: CheckCircle,
              color: "from-cyan-500 to-blue-600",
              change: "+15%",
            },
            {
              title: "Active Zones",
              value: stats.regionsActive,
              icon: MapPin,
              color: "from-purple-500 to-purple-600",
              change: "0%",
            },
            {
              title: "Neural Nodes",
              value: stats.activeVehicles,
              icon: Users,
              color: "from-indigo-500 to-indigo-600",
              change: "+3%",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs font-mono ${stat.change.startsWith("+") ? "text-cyan-400 border-cyan-500/30" : stat.change.startsWith("-") ? "text-red-400 border-red-500/30" : "text-gray-400 border-gray-500/30"}`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium font-mono">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Timeline Chart */}
          <Card className="lg:col-span-2 bg-black/60 backdrop-blur-xl border border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center font-mono">
                <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
                NEURAL TRAFFIC ANALYSIS
                <Badge className="ml-auto bg-cyan-500/20 text-cyan-400 font-mono">REAL-TIME</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData.timeline}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1} />
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
                    dataKey="messages"
                    stroke="#06B6D4"
                    fillOpacity={1}
                    fill="url(#colorMessages)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Severity Distribution */}
          <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center font-mono">
                <BarChart3 className="h-5 w-5 mr-2 text-cyan-400" />
                THREAT CLASSIFICATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.severity}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.severity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.9)",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card id="filters-section" className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center font-mono">
                <Filter className="h-5 w-5 mr-2 text-cyan-400" />
                NEURAL FILTERS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">THREAT LEVEL</label>
                  <Select
                    value={filters.severity}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger className="bg-black/60 border-cyan-500/30 text-white hover:border-cyan-500/50">
                      <SelectValue placeholder="All severities" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-cyan-500/30">
                      <SelectItem value="All severities">All severities</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Warning">Warning</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">NEURAL NODE ID</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search neural node..."
                      value={filters.vehicleId}
                      onChange={(e) => setFilters((prev) => ({ ...prev, vehicleId: e.target.value }))}
                      className="pl-10 bg-black/60 border-cyan-500/30 text-white placeholder:text-gray-400 hover:border-cyan-500/50 focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">ZONE</label>
                  <Select
                    value={filters.region}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, region: value }))}
                  >
                    <SelectTrigger className="bg-black/60 border-cyan-500/30 text-white hover:border-cyan-500/50">
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-cyan-500/30">
                      <SelectItem value="All regions">All regions</SelectItem>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">TIME RANGE</label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
                  >
                    <SelectTrigger className="bg-black/60 border-cyan-500/30 text-white hover:border-cyan-500/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-cyan-500/30">
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="hour">Last Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Messages Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card id="messages-table" className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between font-mono">
                <span className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-cyan-400" />
                  NEURAL DATA STREAM ({filteredMessages.length})
                </span>
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
                      <Zap className="h-3 w-3 mr-1" />
                      LIVE FEED
                    </Badge>
                  </motion.div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyan-500/20">
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">STATUS</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">NODE</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">SENSOR</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">MESSAGE</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">ZONE</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-medium font-mono">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {paginatedMessages.map((message, index) => (
                        <motion.tr
                          key={message._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors group"
                        >
                          <td className="py-4 px-4">
                            <Badge
                              className={`${getSeverityColor(message.severity)} text-white flex items-center w-fit shadow-lg group-hover:scale-105 transition-transform font-mono`}
                            >
                              {getSeverityIcon(message.severity)}
                              <span className="ml-2">{message.severity}</span>
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-white font-mono bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">
                              {message.vehicleId}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300 font-mono">{message.sensorType}</td>
                          <td className="py-4 px-4 text-gray-300 max-w-xs font-mono">
                            <div className="truncate" title={message.messageDescription}>
                              {message.messageDescription}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="text-gray-300 border-gray-500/30 font-mono">
                              <MapPin className="h-3 w-3 mr-1" />
                              {message.region}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-sm">
                            <div className="flex items-center font-mono">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="text-white border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 font-mono"
                  >
                    Previous
                  </Button>
                  <span className="text-gray-300 px-4 py-2 bg-cyan-500/10 rounded border border-cyan-500/30 font-mono">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="text-white border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 font-mono"
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

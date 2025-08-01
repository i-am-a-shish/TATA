"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Settings,
  Bell,
  Monitor,
  Database,
  Network,
  Zap,
  Save,
  RotateCcw,
  User,
  Lock,
  Globe,
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    notifications: {
      criticalAlerts: true,
      warningAlerts: true,
      systemUpdates: false,
      emailNotifications: true,
    },
    display: {
      theme: "dark",
      refreshRate: "3000",
      showAnimations: true,
      compactMode: false,
    },
    system: {
      autoBackup: true,
      dataRetention: "30",
      maxConnections: "100",
      debugMode: false,
    },
  })

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("v2i_logged_in")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Load saved settings
    const savedSettings = localStorage.getItem("v2i_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [router])

  const handleSave = () => {
    localStorage.setItem("v2i_settings", JSON.stringify(settings))
    // Show success message (you could add a toast here)
    console.log("Settings saved successfully")
  }

  const handleReset = () => {
    const defaultSettings = {
      notifications: {
        criticalAlerts: true,
        warningAlerts: true,
        systemUpdates: false,
        emailNotifications: true,
      },
      display: {
        theme: "dark",
        refreshRate: "3000",
        showAnimations: true,
        compactMode: false,
      },
      system: {
        autoBackup: true,
        dataRetention: "30",
        maxConnections: "100",
        debugMode: false,
      },
    }
    setSettings(defaultSettings)
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
                <Settings className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NEURAL SETTINGS
                </h1>
                <p className="text-xs text-gray-400 font-mono">SYSTEM CONFIGURATION</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notifications Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-mono">
                  <Bell className="h-5 w-5 mr-2 text-cyan-400" />
                  ALERT SYSTEM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Critical Alerts</label>
                    <p className="text-sm text-gray-400">Immediate threat notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.criticalAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, criticalAlerts: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Warning Alerts</label>
                    <p className="text-sm text-gray-400">Medium priority notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.warningAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, warningAlerts: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">System Updates</label>
                    <p className="text-sm text-gray-400">Neural network updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, systemUpdates: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Email Notifications</label>
                    <p className="text-sm text-gray-400">External communication</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailNotifications: checked },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Display Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-mono">
                  <Monitor className="h-5 w-5 mr-2 text-cyan-400" />
                  DISPLAY MATRIX
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white font-mono mb-2 block">Theme Mode</label>
                  <Select
                    value={settings.display.theme}
                    onValueChange={(value) =>
                      setSettings((prev) => ({ ...prev, display: { ...prev.display, theme: value } }))
                    }
                  >
                    <SelectTrigger className="bg-black/60 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-cyan-500/30">
                      <SelectItem value="dark">Dark Neural</SelectItem>
                      <SelectItem value="light">Light Matrix</SelectItem>
                      <SelectItem value="auto">Auto Adaptive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white font-mono mb-2 block">Refresh Rate (ms)</label>
                  <Select
                    value={settings.display.refreshRate}
                    onValueChange={(value) =>
                      setSettings((prev) => ({ ...prev, display: { ...prev.display, refreshRate: value } }))
                    }
                  >
                    <SelectTrigger className="bg-black/60 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-cyan-500/30">
                      <SelectItem value="1000">1000ms (Fast)</SelectItem>
                      <SelectItem value="3000">3000ms (Normal)</SelectItem>
                      <SelectItem value="5000">5000ms (Slow)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Neural Animations</label>
                    <p className="text-sm text-gray-400">Enhanced visual effects</p>
                  </div>
                  <Switch
                    checked={settings.display.showAnimations}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, display: { ...prev.display, showAnimations: checked } }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Compact Mode</label>
                    <p className="text-sm text-gray-400">Minimal interface layout</p>
                  </div>
                  <Switch
                    checked={settings.display.compactMode}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, display: { ...prev.display, compactMode: checked } }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-mono">
                  <Database className="h-5 w-5 mr-2 text-cyan-400" />
                  CORE SYSTEM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Auto Backup</label>
                    <p className="text-sm text-gray-400">Automatic data preservation</p>
                  </div>
                  <Switch
                    checked={settings.system.autoBackup}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, system: { ...prev.system, autoBackup: checked } }))
                    }
                  />
                </div>

                <div>
                  <label className="text-white font-mono mb-2 block">Data Retention (days)</label>
                  <Input
                    type="number"
                    value={settings.system.dataRetention}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, system: { ...prev.system, dataRetention: e.target.value } }))
                    }
                    className="bg-black/60 border-cyan-500/30 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-white font-mono mb-2 block">Max Neural Connections</label>
                  <Input
                    type="number"
                    value={settings.system.maxConnections}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, system: { ...prev.system, maxConnections: e.target.value } }))
                    }
                    className="bg-black/60 border-cyan-500/30 text-white font-mono"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-mono">Debug Mode</label>
                    <p className="text-sm text-gray-400">Advanced diagnostic mode</p>
                  </div>
                  <Switch
                    checked={settings.system.debugMode}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, system: { ...prev.system, debugMode: checked } }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Network Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-black/60 backdrop-blur-xl border border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-mono">
                  <Network className="h-5 w-5 mr-2 text-cyan-400" />
                  NETWORK STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-mono">Neural Link Status</span>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
                    <Zap className="h-3 w-3 mr-1" />
                    ACTIVE
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-mono">Quantum Encryption</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono">
                    <Lock className="h-3 w-3 mr-1" />
                    SECURED
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-mono">Global Sync</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-mono">
                    <Globe className="h-3 w-3 mr-1" />
                    SYNCED
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-mono">Neural Nodes</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-mono">
                    <User className="h-3 w-3 mr-1" />8 ACTIVE
                  </Badge>
                </div>

                <div className="pt-4 border-t border-cyan-500/20">
                  <div className="text-sm text-gray-400 font-mono space-y-1">
                    <div>Uptime: 99.97%</div>
                    <div>Latency: 12ms</div>
                    <div>Throughput: 1.2GB/s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

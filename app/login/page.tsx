"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, User, AlertCircle, Building2, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })
  const [userCredentials, setUserCredentials] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("admin")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent, userType: "admin" | "user") => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const credentials = userType === "admin" ? adminCredentials : userCredentials

    // Admin login
    if (userType === "admin" && credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("v2i_logged_in", "true")
      localStorage.setItem("v2i_user", "admin")
      localStorage.setItem("v2i_user_role", "admin")
      setTimeout(() => router.push("/dashboard"), 1500)
    }
    // User login
    else if (userType === "user" && credentials.username === "user" && credentials.password === "user123") {
      localStorage.setItem("v2i_logged_in", "true")
      localStorage.setItem("v2i_user", "user")
      localStorage.setItem("v2i_user_role", "user")
      setTimeout(() => router.push("/user-dashboard"), 1500)
    } else {
      setError("Invalid credentials - Access denied")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-green-500/30 shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <CardTitle className="text-3xl font-bold text-white">V2I WATCHTOWER</CardTitle>
              <p className="text-gray-400 mt-2 text-lg font-mono">SECURE ACCESS PORTAL</p>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className="bg-red-500/20 border-red-500/50 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-mono">{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-green-500/20">
                <TabsTrigger
                  value="admin"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-gray-400"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-gray-400"
                >
                  <Users className="h-4 w-4 mr-2" />
                  User
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-6 mt-6">
                <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300 font-mono">ADMIN ID</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                      <Input
                        type="text"
                        placeholder="Enter admin ID"
                        value={adminCredentials.username}
                        onChange={(e) => setAdminCredentials((prev) => ({ ...prev, username: e.target.value }))}
                        className="pl-12 h-12 bg-black/60 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 rounded-lg font-mono"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300 font-mono">PASSWORD</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))}
                        className="pl-12 h-12 bg-black/60 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 rounded-lg font-mono"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-green-500/25"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="font-mono">AUTHENTICATING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-5 w-5" />
                          <span className="font-mono">ADMIN ACCESS</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm text-green-400 font-medium font-mono mb-1">ADMIN CREDENTIALS</p>
                  <p className="text-xs text-gray-400 font-mono">ID: admin | PASS: admin123</p>
                </div>
              </TabsContent>

              <TabsContent value="user" className="space-y-6 mt-6">
                <form onSubmit={(e) => handleLogin(e, "user")} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300 font-mono">USER ID</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                      <Input
                        type="text"
                        placeholder="Enter user ID"
                        value={userCredentials.username}
                        onChange={(e) => setUserCredentials((prev) => ({ ...prev, username: e.target.value }))}
                        className="pl-12 h-12 bg-black/60 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 rounded-lg font-mono"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300 font-mono">PASSWORD</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={userCredentials.password}
                        onChange={(e) => setUserCredentials((prev) => ({ ...prev, password: e.target.value }))}
                        className="pl-12 h-12 bg-black/60 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 rounded-lg font-mono"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-green-500/25"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="font-mono">AUTHENTICATING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span className="font-mono">USER ACCESS</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm text-green-400 font-medium font-mono mb-1">USER CREDENTIALS</p>
                  <p className="text-xs text-gray-400 font-mono">ID: user | PASS: user123</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

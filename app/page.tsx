"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Play, Globe, Activity, BarChart3, CheckCircle, Car, Cpu, Network, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showStartup, setShowStartup] = useState(true)
  const [startupPhase, setStartupPhase] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    const isLoggedIn = localStorage.getItem("v2i_logged_in")
    if (isLoggedIn) {
      router.push("/dashboard")
    }
  }, [router])

  useEffect(() => {
    if (showStartup) {
      const phases = [
        { duration: 2000, phase: 0 },
        { duration: 1500, phase: 1 },
        { duration: 1500, phase: 2 },
        { duration: 1000, phase: 3 },
      ]

      let currentPhaseIndex = 0
      const phaseTimer = () => {
        if (currentPhaseIndex < phases.length) {
          setStartupPhase(phases[currentPhaseIndex].phase)
          setTimeout(() => {
            currentPhaseIndex++
            if (currentPhaseIndex < phases.length) {
              phaseTimer()
            } else {
              setTimeout(() => setShowStartup(false), 1000)
            }
          }, phases[currentPhaseIndex].duration)
        }
      }
      phaseTimer()
    }
  }, [showStartup])

  useEffect(() => {
    if (!showStartup) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 4)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [showStartup])

  if (!mounted) return null

  const features = [
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Advanced V2I communication tracking with enterprise-grade processing capabilities",
      color: "from-green-400 to-green-600",
      stats: "99.99% Uptime",
    },
    {
      icon: BarChart3,
      title: "Analytics Engine",
      description: "AI-powered insights with machine learning for traffic pattern analysis",
      color: "from-emerald-400 to-green-600",
      stats: "8ms Response",
    },
    {
      icon: Shield,
      title: "Security Protocol",
      description: "Enterprise-grade encryption with zero-trust architecture for infrastructure",
      color: "from-green-500 to-emerald-600",
      stats: "256-bit Security",
    },
  ]

  const steps = ["Detection", "Processing", "Analysis", "Response"]

  // TATA-Style Startup Screen
  if (showStartup) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
        {/* Professional Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* TATA-Style Logo */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                    "0 0 40px rgba(34, 197, 94, 0.8)",
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Shield className="h-16 w-16 text-white" />
              </motion.div>

              {/* Corner Elements */}
              {[0, 90, 180, 270].map((angle, index) => (
                <motion.div
                  key={index}
                  className="absolute w-4 h-4 bg-green-500 rounded-sm"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px) rotate(-${angle}deg)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: startupPhase >= 0 ? 1 : 0,
                    scale: startupPhase >= 0 ? 1 : 0,
                  }}
                  transition={{ delay: index * 0.2 }}
                />
              ))}
            </div>

            <motion.h1
              className="text-6xl font-bold text-white mb-4 tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              V2I WATCHTOWER
            </motion.h1>

            <motion.p
              className="text-xl text-green-400 font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ENTERPRISE INFRASTRUCTURE MONITORING
            </motion.p>
          </motion.div>

          {/* Status Messages */}
          <motion.div
            className="space-y-4 text-green-400 font-mono text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <AnimatePresence mode="wait">
              {startupPhase === 0 && (
                <motion.div
                  key="init"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  INITIALIZING CORE SYSTEMS...
                </motion.div>
              )}
              {startupPhase === 1 && (
                <motion.div
                  key="network"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  ESTABLISHING NETWORK CONNECTIONS...
                </motion.div>
              )}
              {startupPhase === 2 && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  ACTIVATING SECURITY PROTOCOLS...
                </motion.div>
              )}
              {startupPhase === 3 && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-green-300"
                >
                  SYSTEM READY - WELCOME
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-80 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((startupPhase + 1) / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  // Main Onboarding Screen - TATA Style
  return (
    <div className="min-h-screen bg-black">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-green-500/20 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">V2I WATCHTOWER</h1>
                  <p className="text-sm text-green-400 font-mono">Enterprise Infrastructure Monitoring</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                SYSTEM ONLINE
              </Badge>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h2
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Smart City
                  <span className="block text-green-400">Infrastructure</span>
                  <span className="block text-gray-300">Monitoring</span>
                </motion.h2>

                <motion.p
                  className="text-xl text-gray-400 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Enterprise-grade Vehicle-to-Infrastructure communication monitoring system with real-time analytics,
                  predictive insights, and comprehensive security protocols.
                </motion.p>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-6 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    { label: "Uptime", value: "99.99%" },
                    { label: "Response", value: "8ms" },
                    { label: "Cities", value: "50+" },
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-bold text-green-400">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-mono">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Button
                  onClick={() => router.push("/login")}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  <Play className="mr-3 h-5 w-5" />
                  ACCESS SYSTEM
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm bg-transparent"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  LEARN MORE
                </Button>
              </motion.div>

              {/* Process Steps */}
              <motion.div
                className="pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <p className="text-gray-400 mb-6 font-mono text-sm">PROCESSING PIPELINE</p>
                <div className="flex items-center space-x-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <motion.div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                          index <= currentStep
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : "border-gray-600 text-gray-500"
                        }`}
                        animate={index === currentStep ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </motion.div>
                      <div className="ml-3">
                        <div
                          className={`text-sm font-mono ${index <= currentStep ? "text-green-400" : "text-gray-500"}`}
                        >
                          {step}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <motion.div
                          className={`w-16 h-0.5 mx-4 transition-all duration-500 ${
                            index < currentStep ? "bg-green-500" : "bg-gray-600"
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: index < currentStep ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[600px] flex items-center justify-center">
                {/* Central Hub */}
                <motion.div
                  className="absolute z-20 w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(34, 197, 94, 0.5)",
                      "0 0 60px rgba(34, 197, 94, 0.8)",
                      "0 0 30px rgba(34, 197, 94, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Zap className="h-12 w-12 text-white" />
                </motion.div>

                {/* Network Nodes */}
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20 + index * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gray-800 border border-green-500/30 rounded-lg flex items-center justify-center shadow-lg"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
                      }}
                      animate={{
                        borderColor: ["rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.8)", "rgba(34, 197, 94, 0.3)"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                      }}
                    >
                      {index % 3 === 0 ? (
                        <Car className="h-8 w-8 text-green-400" />
                      ) : index % 3 === 1 ? (
                        <Cpu className="h-8 w-8 text-green-400" />
                      ) : (
                        <Network className="h-8 w-8 text-green-400" />
                      )}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Connection Lines */}
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <motion.div
                    key={`line-${index}`}
                    className="absolute w-0.5 h-24 bg-gradient-to-t from-green-500/80 to-transparent"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "bottom center",
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scaleY: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                  />
                ))}

                {/* Outer Ring */}
                <motion.div
                  className="absolute w-80 h-80 border border-green-500/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-3 text-xl">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                    <div className="text-green-400 font-mono text-sm font-semibold">{feature.stats}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

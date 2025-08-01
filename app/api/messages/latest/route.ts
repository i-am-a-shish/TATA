import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
let messages: any[] = []

// Generate sample V2I messages
const generateSampleMessage = () => {
  const vehicleIds = ["VH001", "VH002", "VH003", "VH004", "VH005", "VH006", "VH007", "VH008", "VH009", "VH010"]
  const sensorTypes = [
    "Traffic Light",
    "Road Sensor",
    "Speed Camera",
    "Parking Sensor",
    "Weather Station",
    "Emergency Beacon",
  ]
  const severities = ["Normal", "Warning", "Critical"]
  const regions = [
    "Downtown",
    "Highway A",
    "Industrial Zone",
    "Residential Area",
    "Airport District",
    "Business Center",
  ]
  const statuses = ["OK", "Issue Detected", "Maintenance Required", "Offline", "Active"]

  const messageTemplates = {
    Normal: [
      "Vehicle communication established successfully",
      "Traffic flow normal - optimal conditions",
      "All systems operational and responsive",
      "Speed within acceptable limits",
      "Parking space available",
      "Weather conditions normal",
      "Emergency systems on standby",
      "Infrastructure health check passed",
    ],
    Warning: [
      "Traffic congestion detected in area",
      "Sensor response delayed - investigating",
      "Weather conditions affecting visibility",
      "Parking space nearly at capacity",
      "Minor system anomaly detected",
      "Network latency above normal",
      "Maintenance window approaching",
      "Vehicle speed approaching limit",
    ],
    Critical: [
      "Traffic signal not responding - immediate attention required",
      "Unauthorized access attempt detected",
      "Sensor timeout - backup protocols activated",
      "Abnormal vehicle speed detected - safety alert",
      "System failure - emergency protocols engaged",
      "Communication breakdown with infrastructure",
      "Emergency vehicle priority override active",
      "Critical infrastructure component offline",
    ],
  }

  const severity = severities[Math.floor(Math.random() * severities.length)]
  const templates = messageTemplates[severity as keyof typeof messageTemplates]

  return {
    _id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    vehicleId: vehicleIds[Math.floor(Math.random() * vehicleIds.length)],
    sensorType: sensorTypes[Math.floor(Math.random() * sensorTypes.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    severity,
    timestamp: new Date().toISOString(),
    region: regions[Math.floor(Math.random() * regions.length)],
    messageDescription: templates[Math.floor(Math.random() * templates.length)],
    location: `Intersection ${Math.floor(Math.random() * 100) + 1}`,
  }
}

// Initialize with sample data
if (messages.length === 0) {
  for (let i = 0; i < 75; i++) {
    const msg = generateSampleMessage()
    // Adjust timestamp to spread over last 24 hours
    const hoursAgo = Math.random() * 24
    msg.timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
    messages.push(msg)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Sort messages by timestamp (newest first)
    const sortedMessages = messages
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 100)

    // Calculate stats
    const stats = {
      totalMessages: messages.length,
      criticalAlerts: messages.filter((m) => m.severity === "Critical").length,
      warningAlerts: messages.filter((m) => m.severity === "Warning").length,
      normalMessages: messages.filter((m) => m.severity === "Normal").length,
      regionsActive: new Set(messages.map((m) => m.region)).size,
      activeVehicles: new Set(messages.map((m) => m.vehicleId)).size,
    }

    // Generate timeline data for last 24 hours
    const now = new Date()
    const timelineData = []

    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000)
      const hourStart = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), hour.getHours())
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000)

      const messagesInHour = messages.filter((m) => {
        const msgTime = new Date(m.timestamp)
        return msgTime >= hourStart && msgTime < hourEnd
      }).length

      timelineData.push({
        time: hourStart.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        messages: messagesInHour,
      })
    }

    // Severity distribution data
    const severityData = [
      { name: "Normal", value: stats.normalMessages },
      { name: "Warning", value: stats.warningAlerts },
      { name: "Critical", value: stats.criticalAlerts },
    ].filter((item) => item.value > 0)

    // Region data
    const regionCounts = messages.reduce(
      (acc, msg) => {
        acc[msg.region] = (acc[msg.region] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const regionData = Object.entries(regionCounts).map(([region, count]) => ({
      region,
      messages: count,
    }))

    const chartData = {
      timeline: timelineData,
      severity: severityData,
      regions: regionData,
    }

    return NextResponse.json({
      messages: sortedMessages,
      stats,
      chartData,
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ message: "Failed to fetch messages" }, { status: 500 })
  }
}

// Add new message (used by simulation)
export async function POST(request: NextRequest) {
  try {
    const newMessage = generateSampleMessage()
    messages.unshift(newMessage)

    // Keep only latest 1000 messages to prevent memory issues
    if (messages.length > 1000) {
      messages = messages.slice(0, 1000)
    }

    return NextResponse.json({ message: "Message added", data: newMessage })
  } catch (error) {
    console.error("Error adding message:", error)
    return NextResponse.json({ message: "Failed to add message" }, { status: 500 })
  }
}

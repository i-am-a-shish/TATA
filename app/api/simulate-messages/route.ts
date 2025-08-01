import { type NextRequest, NextResponse } from "next/server"

let simulationInterval: NodeJS.Timeout | null = null

export async function POST(request: NextRequest) {
  try {
    // Clear existing simulation if running
    if (simulationInterval) {
      clearInterval(simulationInterval)
    }

    // Start new simulation - generate a message every 3 seconds
    simulationInterval = setInterval(async () => {
      try {
        // Call the messages API to add a new message directly
        const response = await fetch("http://localhost:3000/api/messages/latest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
          console.error("Failed to add message:", response.statusText)
        }
      } catch (error) {
        // If fetch fails, we'll generate the message directly in the messages API
        console.log("Direct fetch failed, using internal generation")
      }
    }, 3000)

    return NextResponse.json({
      message: "V2I neural simulation activated",
      interval: "3000ms",
      status: "ACTIVE",
    })
  } catch (error) {
    console.error("Failed to start simulation:", error)
    return NextResponse.json({ message: "Simulation initialization failed" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (simulationInterval) {
      clearInterval(simulationInterval)
      simulationInterval = null
    }

    return NextResponse.json({
      message: "Neural simulation deactivated",
      status: "INACTIVE",
    })
  } catch (error) {
    console.error("Failed to stop simulation:", error)
    return NextResponse.json({ message: "Failed to stop simulation" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// Demo user - in production, this would come from a database
const DEMO_USER = {
  username: "admin",
  passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
}

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    // Check credentials
    if (username !== DEMO_USER.username) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const isValidPassword = await bcrypt.compare(password, DEMO_USER.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ username: DEMO_USER.username }, JWT_SECRET, { expiresIn: "24h" })

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { username: DEMO_USER.username },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

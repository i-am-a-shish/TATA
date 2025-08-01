# 🚨 V2I Watchtower – Real-Time Dashboard for Vehicle-to-Infrastructure Communication Monitoring

## 🧠 Project Overview

V2I Watchtower is a MERN-based real-time web application designed to monitor, visualize, and alert on Vehicle-to-Infrastructure (V2I) communication data. Built as part of Tata Technologies InnoVent 2026 under the “Connected Mobility & Secure Communication” track, this dashboard enhances traffic safety and optimizes infrastructure response by simulating and processing V2I event streams in real time.

## 🚗 Problem Statement

Vehicle-to-Infrastructure (V2I) communication is critical for enabling smart traffic control, incident detection, and responsive mobility systems. However, the current lack of accessible tools for visualizing, monitoring, and managing V2I data poses a challenge to city planners and engineers.

🔍 We aim to address:
- Real-time visualization of vehicle-infrastructure alerts
- Secure data transmission from simulated V2I devices to a central dashboard
- Smart filtering, data logging, and alert prioritization

## 🎯 Objectives

- Simulate V2I data such as vehicle speed, location, braking, emergency alerts, etc.
- Develop a responsive admin dashboard for real-time monitoring
- Incorporate alert thresholds, graphs, and status indicators
- Secure cloud-vehicle communication via REST APIs & MongoDB backend
- Provide admin authentication and access control

## 🛠️ Tech Stack

- 🔷 Frontend: React.js, Tailwind CSS, Chart.js, Framer Motion
- ⚙️ Backend: Node.js, Express.js
- 🗄️ Database: MongoDB Atlas
- ☁️ Real-time Simulation: Node-based event emitters + socket.io / REST
- 🛡️ Authentication: JWT (JSON Web Tokens)
- 📦 Tools: Postman, GitHub, Render / Railway / Vercel (for deployment)

## 📸 Dashboard Features

- ✅ Admin Login & Role-based Access
- 📊 Real-time graphs (speed, status, alert frequency)
- 🚨 Alert feed (e.g., "Emergency Braking Ahead", "Slippery Road")
- 🔍 Filtering & sorting based on severity, timestamp
- 🌐 Map integration (future scope)
- 🪄 Introductory onboarding animation

## 📁 Project Structure


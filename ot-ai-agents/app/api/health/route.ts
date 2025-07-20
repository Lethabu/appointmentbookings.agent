import { NextResponse } from "next/server"
import { config } from "../../../lib/config";

export async function GET() {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: config.app.version,
    environment: process.env.VERCEL_ENV || "development",
    services: {
      database: "connected", // You can add actual health checks here
      ai: "connected",
      ehr: "connected",
    },
    features: config.features,
  }

  return NextResponse.json(healthCheck)
}

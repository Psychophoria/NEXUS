// Replace the entire file with this implementation that handles both login and dashboard in a single page

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { verifyLogin } from "@/lib/auth"
import { Facebook, Linkedin, Youtube, Phone, Mail } from "lucide-react"
import { SplashScreen } from "@/components/splash-screen"
import Dashboard from "./dashboard/page"

export default function MainPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showingSplash, setShowingSplash] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        setUserData(parsedUser)
        setIsAuthenticated(true)
      } catch (e) {
        console.error("Error parsing user data:", e)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Show splash screen immediately before any authentication
      setShowingSplash(true)

      // Check for training account
      if (username === "training911" && password === "learning6214") {
        const user = { username, isTraining: true }
        localStorage.setItem("user", JSON.stringify(user))

        // Set user data but don't set isAuthenticated yet
        // The splash screen's onComplete callback will handle that
        setUserData(user)
        return
      }

      // Verify with ReadyMode API
      const result = await verifyLogin(username, password)

      if (result.success) {
        const user = { username, isTraining: false }
        localStorage.setItem("user", JSON.stringify(user))

        // Set user data but don't set isAuthenticated yet
        // The splash screen's onComplete callback will handle that
        setUserData(user)
      } else {
        setError("Invalid username or password")
        setLoading(false)
        setShowingSplash(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
      setLoading(false)
      setShowingSplash(false)
    }
  }

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return <Dashboard />
  }

  // If showing splash screen, render only that
  if (showingSplash) {
    return (
      <SplashScreen
        onComplete={() => {
          // This ensures we transition to the dashboard after the splash screen completes
          if (userData) {
            setIsAuthenticated(true)
          } else {
            // If somehow we don't have user data, go back to login
            setShowingSplash(false)
            setLoading(false)
          }
        }}
      />
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0e0e0e] text-white">
      {/* Top Bar */}
      <div className="storm-top-bar">
        <a
          href="https://assurecalldev-uvf2577.slack.com/team/U08EU3T34EA"
          className="flex items-center gap-1 text-sm hover:text-gray-200"
        >
          <Phone className="h-4 w-4" />
          <span>Contact on Slack</span>
        </a>
        <a href="#" className="flex items-center gap-1 text-sm hover:text-gray-200">
          <Mail className="h-4 w-4" />
          <span>softwaredevmanager@assurecall.com</span>
        </a>
        <div className="ml-4 flex items-center gap-3">
          <a href="#" className="text-white hover:text-gray-200">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/storm911-qW5C0asnLOqOrnBEWkhSz61RuqZGcT.png"
              alt="STORM911 Logo"
              width={180}
              height={60}
              priority
              className="mr-8"
            />
          </div>

          <div className="hidden md:block">{/* Navigation removed as requested */}</div>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/storm911-qW5C0asnLOqOrnBEWkhSz61RuqZGcT.png"
              alt="STORM911 Logo"
              width={250}
              height={80}
              priority
              className="mb-2"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assurecall-ZMEqhImpQWx5en9wkHxz7FnUWwbJkO.png"
              alt="AssureCall Logo"
              width={150}
              height={50}
              priority
              className="mb-6"
            />
            <h2 className="text-2xl font-bold text-[#ff5e00]">NEXUS SYSTEM LOGIN</h2>
          </div>

          <div className="mt-8 bg-[#1a1a1a] p-8 rounded-lg border border-gray-800 shadow-xl">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-gray-300">
                    ReadyMode Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 bg-[#2a2a2a] border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 bg-[#2a2a2a] border-gray-700 text-white"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full storm-button" disabled={loading}>
                {loading ? "Logging in..." : "Login to NEXUS"}
              </Button>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>© {new Date().getFullYear()} STORM911 & ASSURECALL. All rights reserved.</p>
            <p className="mt-1">Professional Telemarketing System for Roofing and Storm Damage Contractors</p>
          </div>
        </div>
      </div>
    </div>
  )
}


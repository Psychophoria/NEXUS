"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MoonIcon, SunIcon, PhoneCall, User, LogOut, Phone, Mail, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { StatusBadge } from "@/components/status-badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState("")
  const [username, setUsername] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentYear(new Date().getFullYear().toString())

    // Check if user is logged in
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      router.push("/")
      return
    }

    try {
      const user = JSON.parse(userStr)
      setUsername(user.username || "Agent")
    } catch (e) {
      console.error("Error parsing user data:", e)
      router.push("/")
    }
  }, [router])

  // If not mounted or no user, show loading state
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e0e0e]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5e00] mx-auto"></div>
          <p className="mt-4 text-lg text-white">Loading NEXUS System...</p>
        </div>
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white" suppressHydrationWarning>
      {/* Top Bar */}
      <div className="storm-top-bar">
        <a href="#" className="flex items-center gap-1 text-sm hover:text-gray-200">
          <Phone className="h-4 w-4" />
          <span>https://university-assurcall.slack.com/team/U08HLNSBTS7</span>
        </a>
        <a href="#" className="flex items-center gap-1 text-sm hover:text-gray-200">
          <Mail className="h-4 w-4" />
          <span>softwaredevmanager@assurecall.com</span>
        </a>
      </div>

      {/* Main Header */}
      <header className="bg-[#0e0e0e] border-b border-gray-800 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assurecall-ZMEqhImpQWx5en9wkHxz7FnUWwbJkO.png"
              alt="ASSURECALL Logo"
              width={150}
              height={50}
              priority
              className="mr-4"
            />
            <div className="hidden md:flex items-center border-l border-gray-700 pl-4 ml-4">
              <PhoneCall className="h-5 w-5 mr-2 text-[#ff5e00]" />
              <span className="text-sm font-medium text-gray-300">NEXUS Call System</span>
            </div>
          </div>

          <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/storm911-qW5C0asnLOqOrnBEWkhSz61RuqZGcT.png"
              alt="STORM911 Logo"
              width={180}
              height={60}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <StatusBadge />

            <div className="flex items-center mr-4 bg-[#1a1a1a] px-3 py-1.5 rounded-md border border-gray-800">
              <User className="h-4 w-4 mr-2 text-[#ff5e00]" />
              <span className="text-sm font-medium text-gray-300">{username}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:bg-[#1a1a1a] rounded-full"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-white hover:bg-[#1a1a1a] rounded-full"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a1a1a] text-white border-gray-800">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-[#ff5e00]" />
                      <span className="font-medium">{username}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-white">
                      {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-[#ff5e00] hover:bg-[#2a2a2a]"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">{children}</main>

      <footer className="bg-[#0e0e0e] border-t border-gray-800 py-4 px-6 text-center text-xs text-gray-300">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div>
              <span className="font-semibold text-[#ff6600]">STORM911</span> NEXUS - Professional Telemarketing System ©{" "}
              {currentYear} <span className="font-semibold text-[#ff6600]">STORM911</span> & ASSURECALL. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


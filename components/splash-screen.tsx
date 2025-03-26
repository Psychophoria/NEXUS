"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Start immediately with no delay
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Increment by smaller amounts for smoother animation
        const increment = prevProgress >= 90 ? 1 : 5
        const newProgress = prevProgress + increment

        if (newProgress >= 100) {
          clearInterval(timer)
          setIsCompleted(true)
          return 100
        }
        return newProgress
      })
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Only trigger onComplete after progress reaches 100% and a small delay
  useEffect(() => {
    if (isCompleted && onComplete) {
      // Add a delay to ensure the user sees 100% before transitioning
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 500) // 500ms delay after reaching 100%

      return () => clearTimeout(completeTimer)
    }
  }, [isCompleted, onComplete])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0e0e0e] z-[9999]">
      <div className="flex flex-col items-center max-w-md text-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/storm911-qW5C0asnLOqOrnBEWkhSz61RuqZGcT.png"
          alt="STORM911 Logo"
          width={300}
          height={100}
          priority
          className="mb-8 animate-pulse"
        />

        <h2 className="text-2xl font-bold text-[#ff5e00] mb-2">NEXUS SYSTEM</h2>
        <p className="text-gray-400 mb-6">Professional Telemarketing Platform</p>

        <div className="w-full h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff5e00] to-[#e62e00] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-500 text-sm">Loading system components... {Math.floor(progress)}%</p>

        <div className="mt-8 flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assurecall-ZMEqhImpQWx5en9wkHxz7FnUWwbJkO.png"
            alt="AssureCall Logo"
            width={120}
            height={40}
            priority
          />
          <span className="text-gray-600 text-xs">Powered by AssureCall</span>
        </div>
      </div>
    </div>
  )
}


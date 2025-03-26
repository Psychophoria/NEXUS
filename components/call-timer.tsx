"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface CallTimerProps {
  startTime?: Date
  className?: string
  isActive?: boolean
}

export function CallTimer({ startTime, className, isActive = true }: CallTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      if (!timerStarted) {
        setTimerStarted(true)
        setElapsedTime(0)
      }

      interval = setInterval(() => {
        if (startTime) {
          const now = new Date()
          const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
          setElapsedTime(elapsed)
        } else {
          setElapsedTime((prev) => prev + 1)
        }
      }, 1000)
    } else if (timerStarted) {
      setTimerStarted(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, startTime, timerStarted])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md",
        isActive ? "bg-green-600/20 text-green-500" : "bg-gray-600/20 text-gray-500",
        className,
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>{formatTime(elapsedTime)}</span>
    </div>
  )
}


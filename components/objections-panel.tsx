"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus, Search, X, AlertTriangle, Maximize2, Settings, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn

interface ObjectionsPanelProps {
  onButtonClick: (windowId: string) => void
  agentData?: {
    agentName: string
    companyName: string
  }
  onUpdateAgentData?: (data: any) => void
}

export function ObjectionsPanel({
  onButtonClick,
  agentData = { agentName: "", companyName: "Storm911" },
  onUpdateAgentData,
}: ObjectionsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [localAgentData, setLocalAgentData] = useState(agentData)

  // Group 1 objections with exact names and window IDs from the flowcharts
  const group1Objections = [
    { label: "30 SECOND OBJECTION", windowId: "W-2" },
    { label: "ALREADY INSPECTED", windowId: "W-28" },
    { label: "ASK MY SPOUSE", windowId: "W-90" },
    { label: "BAD EXPERIENCE BEFORE", windowId: "W-115" },
    { label: "CAN'T CALL YOU BACK", windowId: "W-108" },
    { label: "DECIDING NOT NOW", windowId: "W-112" },
    { label: "ESTIMATE-INSURANCE", windowId: "W-116" },
    { label: "ESTIMATE- NON INS", windowId: "W-68" }, // Further shortened
    { label: "GET MY NUMBER", windowId: "W-105" },
    { label: "HAS CONTRACTOR", windowId: "W-85" },
    { label: "HOW DID I FAIL", windowId: "W-103" },
    { label: "INSURANCE DENIED", windowId: "W-109" },
    { label: "INSURANCE ALREADY INSPECTED", windowId: "W-288" }, // Shortened name
  ]

  // Group 2 objections with exact names and window IDs from the flowcharts
  const group2Objections = [
    { label: "METAL ROOF", windowId: "W-111" },
    { label: "NO DAMAGE", windowId: "W-75" },
    { label: "NO INSURANCE", windowId: "W-68" },
    { label: "NOTHING IS FREE", windowId: "W-107" },
    { label: "PHONE SPAM", windowId: "W-110" },
    { label: "NOT INTERESTED", windowId: "W-7" },
    { label: "NO TIME", windowId: "W-4" },
    { label: "NOT OWNER", windowId: "W-3" },
    { label: "SELLING HOME", windowId: "W-113" },
    { label: "WHO IS NIRC", windowId: "W-106" },
    { label: "WHAT NEIGHBOR", windowId: "W-114" },
  ]

  // Filter objections based on search term
  const filteredGroup1 = group1Objections.filter((obj) => obj.label.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredGroup2 = group2Objections.filter((obj) => obj.label.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate button heights based on number of buttons
  const calculateButtonHeight = (group: any[]) => {
    // Make buttons more compact with a smaller fixed height
    return "28px" // Even smaller fixed height for all buttons
  }

  // Handle text size adjustment
  const handleTextSizeChange = (increase: boolean) => {
    if (panelRef.current) {
      const elements = panelRef.current.querySelectorAll("button, h3, div")
      elements.forEach((el) => {
        const currentSize = window.getComputedStyle(el).fontSize
        const currentSizeNum = Number.parseFloat(currentSize)

        if (increase) {
          ;(el as HTMLElement).style.fontSize = `${currentSizeNum * 1.1}px`
        } else {
          ;(el as HTMLElement).style.fontSize = `${currentSizeNum * 0.9}px`
        }
      })
    }
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (panelRef.current) {
      if (!isFullscreen) {
        if (panelRef.current.requestFullscreen) {
          panelRef.current.requestFullscreen()
          setIsFullscreen(true)
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          setIsFullscreen(false)
        }
      }
    }
  }

  // Handle agent data changes
  const handleAgentDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalAgentData((prev) => ({ ...prev, [name]: value }))
  }

  // Save agent data
  const saveAgentData = () => {
    if (onUpdateAgentData) {
      onUpdateAgentData(localAgentData)
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Update local state when agentData prop changes
  useEffect(() => {
    setLocalAgentData(agentData)
  }, [agentData])

  // Calculate button heights
  const group1ButtonHeight = calculateButtonHeight(filteredGroup1)
  const group2ButtonHeight = calculateButtonHeight(filteredGroup2)

  return (
    // Request #1: Dark mode panel styling
    <div ref={panelRef} className="h-full flex flex-col storm-panel bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
      <div className="objection-header py-1 px-3 flex justify-between items-center flex-shrink-0">
        <div className="w-24">
          {/* Left side controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={() => handleTextSizeChange(false)}
              title="Decrease text size"
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease text size</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={() => handleTextSizeChange(true)}
              title="Increase text size"
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase text size</span>
            </Button>
          </div>
        </div>

        <h2 className="text-base font-bold text-white">OBJECTIONS</h2>

        <div className="w-24 flex justify-end">
          {/* Right side controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 text-white mr-1"
            onClick={() => setShowSettings(!showSettings)}
            title="Agent Settings"
          >
            <Settings className="h-3 w-3" />
            <span className="sr-only">Agent Settings</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Maximize2 className="h-3 w-3" />
            <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</span>
          </Button>
        </div>
      </div>

      {/* Adjusted dark border */}
      <div className="p-1 border-b border-gray-300 dark:border-gray-500 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search objections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // Adjusted dark mode input
            className="pl-7 pr-7 py-1 h-7 bg-white dark:bg-gray-200 border-gray-300 dark:border-gray-500 text-black dark:text-black text-xs"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 hover:bg-gray-200 dark:hover:bg-gray-300" // Adjusted dark hover
              onClick={() => setSearchTerm("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-1" style={{ minHeight: 0 }}>
        {searchTerm && filteredGroup1.length === 0 && filteredGroup2.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mb-2" />
            {/* Adjusted dark text */}
            <p className="text-gray-500 dark:text-gray-300">No objections found matching "{searchTerm}"</p>
            <Button variant="link" className="mt-2 text-[#ff5e00]" onClick={() => setSearchTerm("")}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 h-full">
            {/* Group 1 */}
            <div className="flex flex-col h-full">
              <h3 className="font-bold text-xs uppercase tracking-wide text-center bg-red-600 text-white py-0.5 rounded-t-md shadow-md mb-2">
                GROUP 1
              </h3>
              <div className="flex flex-col gap-1 flex-1 overflow-y-auto objection-buttons-container mt-1">
                {filteredGroup1.map((objection, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start bg-gradient-to-b from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9d0208] text-white border border-[#9d0208] h-auto py-0.5 text-[10px] font-medium shadow-sm hover:shadow-md transition-all w-full objection-button text-left"
                    style={{ minHeight: group1ButtonHeight }}
                    onClick={() => {
                      console.log("Objection button clicked:", objection.label, objection.windowId)
                      onButtonClick(objection.windowId)
                    }}
                  >
                    {objection.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Group 2 */}
            <div className="flex flex-col h-full">
              <h3 className="font-bold text-xs uppercase tracking-wide text-center bg-red-600 text-white py-0.5 rounded-t-md shadow-md mb-2">
                GROUP 2
              </h3>
              <div className="flex flex-col gap-1 flex-1 overflow-y-auto objection-buttons-container mt-1">
                {filteredGroup2.map((objection, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start bg-gradient-to-b from-[#e63946] to-[#c1121f] hover:from-[#c1121f] hover:to-[#9d0208] text-white border border-[#9d0208] h-auto py-0.5 text-[10px] font-medium shadow-sm hover:shadow-md transition-all w-full objection-button text-left"
                    style={{ minHeight: group2ButtonHeight }}
                    onClick={() => {
                      console.log("Objection button clicked:", objection.label, objection.windowId)
                      onButtonClick(objection.windowId)
                    }}
                  >
                    {objection.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agent Settings Section */}
      {/* Adjusted dark border and background */}
      <div
        className={cn(
            `border-t border-gray-300 dark:border-gray-600 transition-all duration-300 flex-shrink-0`,
            showSettings ? "max-h-60" : "max-h-6 overflow-hidden"
        )}
      >
        <div
          className="p-1 flex justify-between items-center cursor-pointer bg-gray-100 dark:bg-gray-600" // Adjusted dark bg
          onClick={() => setShowSettings(!showSettings)}
        >
          {/* Adjusted dark text */}
          <h3 className="font-bold text-xs text-gray-700 dark:text-gray-300">AGENT SETTINGS</h3>
          <ChevronDown className={cn("h-3 w-3 text-gray-700 dark:text-gray-300", showSettings && "rotate-180")} /> {/* Adjusted icon color */}
        </div>

        {showSettings && (
          <div className="p-2 space-y-2">
            <div className="space-y-1">
              {/* Adjusted dark text */}
              <Label htmlFor="agentName" className="text-xs text-gray-700 dark:text-gray-300">
                Agent Name
              </Label>
              <Input
                id="agentName"
                name="agentName"
                value={localAgentData.agentName}
                onChange={handleAgentDataChange}
                placeholder="Enter your name"
                // Adjusted dark mode input
                className="h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500"
              />
            </div>

            <div className="space-y-1">
              {/* Adjusted dark text */}
              <Label htmlFor="companyName" className="text-xs text-gray-700 dark:text-gray-300">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={localAgentData.companyName}
                onChange={handleAgentDataChange}
                placeholder="Storm911"
                // Adjusted dark mode input
                className="h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500"
              />
            </div>

            <Button
              variant="outline"
              className="w-full bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-2 border-green-700 text-xs py-1"
              onClick={saveAgentData}
            >
              Save Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
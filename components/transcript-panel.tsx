"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, PhoneOff, Maximize2 } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { replacePlaceholders } from "@/lib/format-utils"
import { cn } from "@/lib/utils" // Import cn utility

interface TranscriptPanelProps {
  currentPage: number
  pages: Record<string, any>
  callerData: any
  onButtonClick: (windowId: string) => void
  onNextPage: () => void
  onPreviousPage: () => void // Changed back to onPreviousPage for clarity, maps to handleGoBack in parent
  onReset: () => void
  onEndCall: () => void
  progress: number
  onUpdateCallerData?: (data: any) => void
}

export function TranscriptPanel({
  currentPage,
  pages,
  callerData,
  onButtonClick,
  onNextPage,
  onPreviousPage, // Renamed prop
  onReset,
  onEndCall,
  progress,
  onUpdateCallerData,
}: TranscriptPanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(15) // Slightly smaller default font size for better fit
  const [editingField, setEditingField] = useState<{ field: string; value: string } | null>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)
  const [formattedContent, setFormattedContent] = useState("")

  // Get current page data
  let currentPageKey = `PG${Math.floor(currentPage)}`

  // Handle special decimal page numbers
  if (floatEquals(currentPage, 5.1)) {
    currentPageKey = "PG5B"
  } else if (floatEquals(currentPage, 5.2)) {
    currentPageKey = "PG5C"
  }

  const currentPageData = pages[currentPageKey]

  // Helper function to check if two floating point numbers are equal
  function floatEquals(a: number, b: number): boolean {
    return Math.abs(a - b) < 0.001
  }

  // Format content when page changes
  useEffect(() => {
    if (currentPageData?.text) {
      try {
        // Format the content
        const formatted = replacePlaceholders(currentPageData.text, callerData)
        setFormattedContent(formatted)
      } catch (error) {
        console.error("Error formatting transcript content:", error)
        // Fallback to raw content if formatting fails
        setFormattedContent(currentPageData.text)
      }
    } else {
        setFormattedContent("") // Clear content if no page data
    }
  }, [currentPage, currentPageData, callerData]) // Added currentPageData dependency

  // Function to resize text to fit available space (Removed as auto-resizing was causing issues)
  // const resizeText = () => { ... }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (panelRef.current) {
      if (!isFullscreen) {
        if (panelRef.current.requestFullscreen) {
          panelRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement
      setIsFullscreen(isNowFullscreen)
      // Removed resizeText calls
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Determine if the current page is the START page
  const isStartPage = currentPage === 0

  return (
    <div
      ref={panelRef}
      className="h-full flex flex-col storm-panel bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" // Adjusted dark mode bg
    >
      {/* Header */}
      <div className="transcript-header py-1 px-3 flex justify-between items-center flex-shrink-0">
        <div className="w-24">
          {/* Left side controls - buttons removed */}
          <div className="flex items-center space-x-1">{/* Plus and Minus buttons removed */}</div>
        </div>

        <h2 className="text-base font-bold text-center flex-1">TRANSCRIPT</h2> {/* Centered Title */}

        <div className="w-24 flex justify-end">
          {/* Right side controls */}
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

      {/* Page Title */}
      {!isStartPage && ( // Hide title bar on start page
        <div className="bg-gray-100 dark:bg-gray-600 px-3 py-0.5 border-t border-b border-gray-300 dark:border-gray-500 flex-shrink-0">
          <div className="flex justify-between items-center">
            {/* Request #7: Center Title */}
            <h3 className="font-bold text-lg text-black dark:text-gray-100 text-center flex-1">
              {currentPageData?.title || "Loading..."}
            </h3>
            <StatusBadge status={currentPage === 0 ? "idle" : "active"} />
          </div>
        </div>
      )}

      {/* Main content container - using flex to push navigation to bottom */}
      <div className={cn("flex-1 flex flex-col", isStartPage ? "items-center justify-center" : "")}> {/* Center content on start page */}
        {/* Scrollable content area */}
        <div ref={scrollContainerRef} className={cn("flex-grow flex flex-col overflow-auto", isStartPage ? "overflow-visible" : "")} style={{ minHeight: 0 }}>
          {/* Content */}
          <div className={cn("flex-grow px-2 pt-1 pb-1", isStartPage ? "text-center" : "")}> {/* Center text on start page */}
            <div
              ref={contentRef}
              className="transcript-content whitespace-pre-line text-black dark:text-black leading-relaxed h-full mt-0 pt-0" // Ensure text is black
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {/* Page Buttons - Inside the scrollable area */}
          {currentPageData?.buttons && currentPageData.buttons.length > 0 && (
            <div ref={buttonsRef} className={cn("px-2 pb-1 space-y-1 mt-auto", isStartPage ? "mt-4 flex justify-center" : "mt-1")}> {/* Center button on start page, move up */}
              {!isStartPage && ( // Hide response options title on start page
                <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                  Response Options:
                </h4>
              )}
              <div className={cn("grid gap-1", isStartPage ? "grid-cols-1 max-w-xs" : "md:grid-cols-2")}> {/* Adjust grid for start page */}
                {currentPageData.buttons.map((button: any, index: number) => {
                  // Determine button style based on label/action
                  let buttonStyle = ""
                  if (button.windowId === "NEXT_PAGE" || button.windowId.startsWith("GOTO_PAGE_")) {
                    buttonStyle =
                      "bg-gradient-to-b from-[#1EBB58] to-[#19a34d] hover:from-[#19a34d] hover:to-[#158c42] text-white border-2 border-[#158c42]"
                  } else if (button.windowId === "PREVIOUS_PAGE") {
                    // Request #5: Previous Button Color
                    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
                  } else if (button.windowId === "END_CALL") {
                     // Request #6: End Call Button Color
                    buttonStyle = "bg-gray-700 hover:bg-gray-800 text-white border-2 border-gray-800"
                  } else if (button.label.includes("START")) {
                    buttonStyle =
                      "bg-gradient-to-b from-[#3173F1] to-[#2a65d8] hover:from-[#2a65d8] hover:to-[#2456bc] text-white border-2 border-[#2456bc]"
                  } else {
                    // Default for objection buttons etc.
                    buttonStyle =
                      "bg-gradient-to-b from-[#3173F1] to-[#2a65d8] hover:from-[#2a65d8] hover:to-[#2456bc] text-white border-2 border-[#2456bc]"
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={cn(
                        `justify-start h-auto py-1 text-xs font-bold shadow-md hover:shadow-lg transition-all ${buttonStyle} transcript-button`,
                        isStartPage ? "justify-center text-lg px-6 py-3" : "" // Larger button on start page
                      )}
                      onClick={() => onButtonClick(button.windowId)}
                    >
                      {button.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Navigation & Actions Panel - Hide on start page */}
        {!isStartPage && (
            <div className="p-1 border-t border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-600 flex-shrink-0 mt-auto">
            <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                <Button
                    variant="outline"
                    // Request #5: Previous Button Color
                    className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400 py-1.5 px-2 text-xs h-9"
                    onClick={onPreviousPage} // Use the passed handler
                    disabled={currentPage === 0 && !currentPageData?.buttons?.some((b:any) => b.windowId === "PREVIOUS_PAGE")} // Disable if truly at start
                >
                    <ChevronLeft className="mr-1 h-3 w-3" /> Previous
                </Button>
                <Button
                    variant="outline"
                    className="bg-gradient-to-b from-[#1EBB58] to-[#19a34d] hover:from-[#19a34d] hover:to-[#158c42] text-white border-2 border-[#158c42] py-1.5 px-2 text-xs h-9"
                    onClick={onNextPage}
                    disabled={!currentPageData || currentPage >= 19} // Disable at last page
                >
                    Next <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
                </div>
                <div className="flex space-x-1">
                <Button
                    variant="outline"
                    className="bg-gradient-to-b from-[#FFDE0C] to-[#e6c80b] hover:from-[#e6c80b] hover:to-[#ccb20a] text-black border-2 border-[#ccb20a] py-1.5 px-2 text-xs h-9"
                    onClick={onReset}
                >
                    <RotateCcw className="mr-1 h-3 w-3" /> Reset
                </Button>
                <Button
                    variant="outline"
                    // Request #6: End Call Button Color
                    className="bg-gray-700 hover:bg-gray-800 text-white border-2 border-gray-800 py-1.5 px-2 text-xs h-9"
                    onClick={onEndCall}
                >
                    <PhoneOff className="mr-1 h-3 w-3" /> End Call
                </Button>
                </div>
            </div>
            </div>
        )}
      </div>

      {/* Progress Bar - Hide on start page */}
      {!isStartPage && (
        <div className="px-3 py-1 border-t border-gray-300 dark:border-gray-500 flex-shrink-0">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-black dark:text-gray-100">
              TRANSCRIPT PROGRESS ({Math.round(progress)}%)
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2"
            indicatorClassName={`${progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-green-500"}`}
          />
        </div>
      )}
    </div>
  )
}


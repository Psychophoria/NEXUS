"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef, useCallback } from "react" // Added useCallback
import { CallerDataPanel } from "@/components/caller-data-panel"
import { TranscriptPanel } from "@/components/transcript-panel"
import { ObjectionsPanel } from "@/components/objections-panel"
import { HelpSystem } from "@/components/help-system"
import { DialogWindow } from "@/components/dialog-window"
import { CallTimer } from "@/components/call-timer"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { transcriptPages, objectionWindows } from "@/lib/transcript-data"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  Info,
  HelpCircle,
  Phone,
  Mail,
  LogOut,
  SunIcon,
  MoonIcon,
  Menu,
  Keyboard,
  User,
} from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Define type for navigation history items (Request #9)
type NavigationHistoryItem = {
  type: "page" | "window"
  id: number | string
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0) // Start at page 0 (START page)
  const [currentWindow, setCurrentWindow] = useState<string | null>(null)
  // const [previousPage, setPreviousPage] = useState<number | null>(null) // Replaced by navigationHistory
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistoryItem[]>([]) // Request #9
  const [callerData, setCallerData] = useState({})
  const [callerDataVisible, setCallerDataVisible] = useState(true)
  const [transcriptProgress, setTranscriptProgress] = useState(0)
  const [dataEntryProgress, setDataEntryProgress] = useState(0)
  const [agentData, setAgentData] = useState({
    agentName: "",
    companyName: "Storm911",
  })
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const dialogContainerRef = useRef<HTMLDivElement>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    type: "reset" | "endCall" | "logout" | null
    title: string
    description: string
  }>({
    open: false,
    type: null,
    title: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false) // Changed to false since we handle loading in the parent
  const [error, setError] = useState<string | null>(null)
  const [showTip, setShowTip] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const [callStartTime, setCallStartTime] = useState<Date | null>(null)
  const [currentCallId, setCurrentCallId] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false) // Add state to prevent multiple rapid clicks
  const [randomDigits, setRandomDigits] = useState<string | null>(null) // Store random digits at component level
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  // Initialize the dashboard
  useEffect(() => {
    try {
      // Check if user is logged in
      const user = localStorage.getItem("user")
      if (!user) {
        // Instead of redirecting, we'll handle this in the parent component
        return
      }

      // Show tip after a short delay
      setTimeout(() => {
        setShowTip(true)
      }, 1000)
    } catch (err) {
      console.error("Dashboard initialization error:", err)
      setError("Failed to initialize dashboard. Please try logging in again.")
    }
  }, [])

  // Calculate transcript progress based on current page
  useEffect(() => {
    // Skip page 0 (START page) in progress calculation
    const progress = Math.min(((currentPage - 1) / 18) * 100, 100)
    setTranscriptProgress(currentPage > 0 ? progress : 0)

    // Start call timer when moving from page 0 to page 1
    // Check previous history item instead of previousPage state
    const lastHistoryItem = navigationHistory[navigationHistory.length - 1]
    if (currentPage === 1 && lastHistoryItem?.type === "page" && lastHistoryItem?.id === 0) {
      startCall()
    }
  }, [currentPage, navigationHistory]) // Depend on navigationHistory

  // Auto-scale dialog text when window changes
  useEffect(() => {
    if (currentWindow && dialogContentRef.current && dialogContainerRef.current) {
      // Use a longer delay to ensure dialog is fully rendered
      setTimeout(() => {
        // Force a minimum font size for dialog content
        dialogContentRef.current.style.fontSize = "1rem"
      }, 150)
    }
  }, [currentWindow, callerData])

  // Generate random digits - only once per call
  const generateRandomDigits = () => {
    let digits = ""
    for (let i = 0; i < 3; i++) {
      digits += Math.floor(Math.random() * 10).toString()
    }
    return digits
  }

  // Start a new call
  const startCall = () => {
    const newCallId = Date.now().toString()
    setCurrentCallId(newCallId)
    setCallActive(true)
    setCallStartTime(new Date())
    setNavigationHistory([]) // Clear history on new call

    // Generate random digits once at the start of the call
    setRandomDigits(generateRandomDigits())
  }

  // End the current call
  const endCall = () => {
    setCallActive(false)
    setCurrentPage(0)
    setCurrentWindow(null)
    setNavigationHistory([]) // Clear history on end call

    // Clear the random digits when ending a call
    setRandomDigits(null)

    // Save call data to history if we have customer information
    if (currentCallId && callerData && (callerData as any).firstName) {
      const callDuration = callStartTime ? Math.floor((Date.now() - callStartTime.getTime()) / 1000) : 0
      const minutes = Math.floor(callDuration / 60)
      const seconds = callDuration % 60
      const formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      const callRecord = {
        id: currentCallId,
        customerName:
          `${(callerData as any).firstName || ""} ${(callerData as any).lastName || ""}`.trim() || "Unknown Customer",
        phoneNumber: (callerData as any).phoneNumber || "Unknown",
        date: new Date().toISOString().split("T")[0],
        duration: formattedDuration,
        status: "completed" as const,
        notes: `Roof Age: ${(callerData as any).roofAge || "Unknown"}, Roofing Type: ${(callerData as any).roofingType || "Unknown"}`,
      }

      // Save to local storage
      const savedCalls = localStorage.getItem("call-history")
      const calls = savedCalls ? JSON.parse(savedCalls) : []
      localStorage.setItem("call-history", JSON.stringify([callRecord, ...calls]))
    }

    // Reset call data
    setCurrentCallId(null)
    setCallStartTime(null)
  }

  // Helper function to check if two floating point numbers are approximately equal
  const floatEquals = (a: number, b: number, epsilon = 0.001) => {
    return Math.abs(a - b) < epsilon
  }

  // Helper function for exact integer comparison
  const isExactPage = (page: number, target: number) => {
    return Math.abs(page - target) < 0.0001
  }

  // --- Navigation Logic with History (Request #9) ---

  // Function to update history before navigation
  const updateHistory = useCallback(() => {
    const currentItem: NavigationHistoryItem = currentWindow
      ? { type: "window", id: currentWindow }
      : { type: "page", id: currentPage }

    // Avoid pushing duplicates if navigating back and forth quickly
    const lastItem = navigationHistory[navigationHistory.length - 1]
    if (lastItem?.type !== currentItem.type || lastItem?.id !== currentItem.id) {
      setNavigationHistory((prev) => [...prev, currentItem])
    }
  }, [currentPage, currentWindow, navigationHistory])

  // Navigate to a specific page
  const goToPage = useCallback(
    (pageNumber: number) => {
      if (isNavigating) return
      setIsNavigating(true)
      updateHistory() // Update history before changing page
      setCurrentPage(pageNumber)
      setCurrentWindow(null) // Close any open window when navigating pages
      setTimeout(() => setIsNavigating(false), 50)
    },
    [isNavigating, updateHistory],
  )

  // Navigate to a specific window
  const goToWindow = useCallback(
    (windowId: string) => {
      if (isNavigating) return
      setIsNavigating(true)
      updateHistory() // Update history before changing window
      setCurrentWindow(windowId)
      setTimeout(() => setIsNavigating(false), 50)
    },
    [isNavigating, updateHistory],
  )

  // Handle NEXT navigation
  const handleNextPage = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)

    let nextPage = currentPage

    // Special handling for page 5 to 5B
    if (isExactPage(currentPage, 5)) {
      nextPage = 5.1 // Use 5.1 to represent 5B
    }
    // Special handling for page 5B to 5C or 7 based on roof age (simplified to 5C for now)
    else if (floatEquals(currentPage, 5.1)) {
      nextPage = 5.2 // Use 5.2 to represent 5C
    }
    // Special handling for page 5C to 7
    else if (floatEquals(currentPage, 5.2)) {
      nextPage = 7
    }
    // Special handling to skip page 15 if NOT OWNER button was pressed (handled by GOTO_PAGE_16)
    // Normal page increment
    else if (currentPage < 19) {
      nextPage = Math.floor(currentPage) + 1
    }

    if (nextPage !== currentPage) {
      updateHistory()
      setCurrentPage(nextPage)
      setCurrentWindow(null)
    }

    setTimeout(() => setIsNavigating(false), 50)
  }, [currentPage, isNavigating, updateHistory])

  // Handle PREVIOUS navigation using history (Request #9)
  const handleGoBack = useCallback(() => {
    if (isNavigating || navigationHistory.length === 0) return
    setIsNavigating(true)

    const historyCopy = [...navigationHistory]
    const lastItem = historyCopy.pop() // Get the previous location

    setNavigationHistory(historyCopy) // Update the history state

    if (lastItem) {
      if (lastItem.type === "page") {
        setCurrentPage(lastItem.id as number)
        setCurrentWindow(null)
      } else {
        // If going back to a window, we might need the page context it came from.
        // For simplicity now, just open the window. The page context might be lost.
        // A more robust solution might store page context with window history.
        const pageBeforeWindow = historyCopy.findLast((item) => item.type === "page")
        if (pageBeforeWindow) {
          setCurrentPage(pageBeforeWindow.id as number)
        }
        setCurrentWindow(lastItem.id as string)
      }
    } else {
      // If history is empty, go to start page
      setCurrentPage(0)
      setCurrentWindow(null)
    }

    setTimeout(() => setIsNavigating(false), 50)
  }, [isNavigating, navigationHistory])

  // --- End Navigation Logic ---

  // Reset the call to the beginning
  const resetCall = () => {
    setConfirmDialog({
      open: true,
      type: "reset",
      title: "Reset Call",
      description: "Are you sure you want to reset this call? All progress will be lost.",
    })
  }

  // Handle caller data updates
  const updateCallerData = (data: any) => {
    setCallerData(data)

    // Calculate data entry progress
    const requiredFields = ["firstName", "lastName", "address", "city", "state", "zip", "phoneNumber"]
    const filledFields = requiredFields.filter((field) => data[field] && data[field].trim() !== "")
    const progress = Math.round((filledFields.length / requiredFields.length) * 100)
    setDataEntryProgress(progress)
  }

  // Handle agent data updates
  const handleAgentDataUpdate = (data: any) => {
    setAgentData(data)
  }

  // Handle logout
  const logout = () => {
    setConfirmDialog({
      open: true,
      type: "logout",
      title: "Logout",
      description: "Are you sure you want to logout?",
    })
  }

  // Handle confirm dialog actions
  const handleConfirmAction = () => {
    if (confirmDialog.type === "reset") {
      setCurrentPage(0)
      setCurrentWindow(null)
      setNavigationHistory([]) // Clear history
      setCallActive(false)
      setCallStartTime(null)
      setCurrentCallId(null)
      setRandomDigits(null) // Clear random digits
    } else if (confirmDialog.type === "endCall") {
      endCall()
    } else if (confirmDialog.type === "logout") {
      localStorage.removeItem("user")
      router.push("/")
    }

    setConfirmDialog({
      open: false,
      type: null,
      title: "",
      description: "",
    })
  }

  // Handle Cancel action in confirmation dialog (Request #11)
  const handleCancelAction = () => {
    // Close the dialog first
    setConfirmDialog({
      open: false,
      type: null,
      title: "",
      description: "",
    })
    // Go back using history
    // handleGoBack(); // Let's not automatically go back, just close the dialog. User can press Previous if needed.
  }

  // Get current page key
  const getCurrentPageKey = () => {
    if (floatEquals(currentPage, 5.1)) {
      return "PG5B"
    } else if (floatEquals(currentPage, 5.2)) {
      return "PG5C"
    } else {
      return `PG${Math.floor(currentPage)}`
    }
  }

  // Add the missing callerDataVisible toggle function
  const toggleCallerDataVisibility = () => {
    setCallerDataVisible(!callerDataVisible)
  }

  // Update the keyboard shortcuts to use the new format
  // Register keyboard shortcuts
  useKeyboardShortcuts({
    "Alt+n": () => {
      if (currentPage > 0) {
        handleNextPage()
      }
    },
    "Alt+p": () => { // Changed from Alt+p to Alt+b for back/previous
      if (currentPage > 0 || currentWindow) { // Allow going back from window too
        handleGoBack()
      }
    },
    "Alt+r": () => {
      if (currentPage > 0) {
        resetCall()
      }
    },
    "Alt+e": () => {
      if (currentPage > 0) {
        setConfirmDialog({
          open: true,
          type: "endCall",
          title: "End Call",
          description: "Are you sure you want to end this call?",
        })
      }
    },
    "Alt+k": () => {
      setShowKeyboardShortcuts(true)
    },
    "Alt+h": () => {
      setShowHelp(true)
    },
    "Alt+t": () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    },
    "Alt+d": () => {
      toggleCallerDataVisibility()
    },
  })

  // Get current window data
  const currentWindowData = currentWindow ? objectionWindows[currentWindow] : null

  // Combine caller data with agent data and random digits for transcript
  const combinedData = {
    ...callerData,
    ...agentData,
    randomDigits: randomDigits || "",
  }

  // Handle objection button click - Updated for history (Request #9)
  const handleObjectionButtonClick = useCallback(
    (windowName: string) => {
      if (windowName === "END_CALL") {
        setConfirmDialog({
          open: true,
          type: "endCall",
          title: "End Call",
          description: "Are you sure you want to end this call?",
        })
        return
      }
      if (windowName === "PREVIOUS_PAGE") {
        handleGoBack()
        return
      }
      if (windowName === "BACK_TO_SCRIPT") {
        // Find the last page in history and go there
        const historyCopy = [...navigationHistory]
        const lastPage = historyCopy.reverse().find((item) => item.type === "page")
        if (lastPage) {
          updateHistory() // Save current window before going back
          setCurrentPage(lastPage.id as number)
          setCurrentWindow(null)
        } else {
          handleGoBack() // Fallback to normal back if no page found
        }
        return
      }
      // For regular objection windows, use goToWindow
      goToWindow(windowName)
    },
    [goToWindow, handleGoBack, navigationHistory, updateHistory],
  )

  // Handle transcript button click - Updated for history (Request #9)
  const handleTranscriptButtonClick = useCallback(
    (windowId: string) => {
      console.log("Transcript button clicked with windowId:", windowId)

      // Handle special navigation window IDs
      if (windowId === "NEXT_PAGE") {
        handleNextPage()
      } else if (windowId === "PREVIOUS_PAGE") {
        handleGoBack()
      } else if (windowId === "END_CALL") {
        setConfirmDialog({
          open: true,
          type: "endCall",
          title: "End Call",
          description: "Are you sure you want to end this call?",
        })
      } else if (windowId.startsWith("GOTO_PAGE_")) {
        const pageNumberStr = windowId.split("_").pop() || "0"
        let pageNumber: number | null = null

        // Handle potential decimal page numbers like "5.1"
        if (pageNumberStr.includes('.')) {
            pageNumber = Number.parseFloat(pageNumberStr)
        } else {
            pageNumber = Number.parseInt(pageNumberStr, 10)
        }

        if (pageNumber !== null && !isNaN(pageNumber) && pageNumber >= 0 && pageNumber <= 19) {
          goToPage(pageNumber) // Use goToPage for history update
        }
      } else {
        // For regular objection windows, use goToWindow
        goToWindow(windowId)
      }
    },
    [handleNextPage, handleGoBack, goToPage, goToWindow],
  )

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-[#121212] text-white py-2 px-4 flex justify-between items-center shadow-md border-b border-gray-800">
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/storm911-qW5C0asnLOqOrnBEWkhSz61RuqZGcT.png"
              alt="STORM911 Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="h-6 w-px bg-gray-600 mx-3"></div>
          <div className="flex items-center text-sm font-medium">
            <Phone className="h-4 w-4 mr-2 text-[#ff5e00]" />
            <span className="text-gray-300">NEXUS Call System</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {callActive && callStartTime && (
            <CallTimer
              startTime={callStartTime}
              isActive={callActive}
              className="mr-2 bg-black/20 px-2 py-1 rounded text-white text-xs"
            />
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <h2 className="text-lg font-bold mb-4">STORM911 NEXUS</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Theme</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant={resolvedTheme === "light" ? "default" : "outline"}
                        size="sm"
                        className="flex items-center"
                        onClick={() => setTheme("light")}
                      >
                        <SunIcon className="h-4 w-4 mr-1" />
                        Light
                      </Button>
                      <Button
                        variant={resolvedTheme === "dark" ? "default" : "outline"}
                        size="sm"
                        className="flex items-center"
                        onClick={() => setTheme("dark")}
                      >
                        <MoonIcon className="h-4 w-4 mr-1" />
                        Dark
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Help & Support</h3>
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="justify-start" onClick={() => setShowHelp(true)}>
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help Guide
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => setShowKeyboardShortcuts(true)}
                      >
                        <Keyboard className="h-4 w-4 mr-2" />
                        Keyboard Shortcuts
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact</h3>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        as="a"
                        href="https://assurecalldev-uvf2577.slack.com/team/U08EU3T34EA"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-xs truncate">Contact on Slack</span>
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        softwaredevmanager@assurecall.com
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button variant="destructive" size="sm" className="w-full justify-start" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setShowKeyboardShortcuts(true)}
          >
            <Keyboard className="h-4 w-4" />
            <span className="sr-only">Keyboard shortcuts</span>
          </Button>

          <div className="flex items-center bg-[#1a1a1a] px-2 py-1 rounded border border-gray-800">
            <User className="h-3.5 w-3.5 mr-1.5 text-[#ff5e00]" />
            <span className="text-xs font-mono text-gray-300">training911</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-2 gap-2">
        {/* Caller Data Panel */}
        {callerDataVisible && ( // Conditionally render based on visibility state
            <div className="md:w-1/4 h-full flex flex-col">
            <CallerDataPanel
                callerData={callerData}
                onUpdateCallerData={updateCallerData}
                progress={dataEntryProgress}
                onToggleVisibility={toggleCallerDataVisibility} // Pass toggle function
            />
            </div>
        )}

        {/* Transcript Panel */}
        <div className={`h-full flex flex-col ${callerDataVisible ? 'md:w-2/4' : 'md:w-3/4'}`}> {/* Adjust width */}
          <TranscriptPanel
            currentPage={currentPage}
            pages={transcriptPages}
            callerData={combinedData}
            onButtonClick={handleTranscriptButtonClick}
            onNextPage={handleNextPage}
            onPreviousPage={handleGoBack} // Use handleGoBack
            onReset={resetCall}
            onEndCall={() =>
              setConfirmDialog({
                open: true,
                type: "endCall",
                title: "End Call",
                description: "Are you sure you want to end this call?",
              })
            }
            progress={transcriptProgress}
          />
        </div>

        {/* Objections Panel */}
        <div className={`h-full flex flex-col ${callerDataVisible ? 'md:w-1/4' : 'md:w-1/4'}`}> {/* Adjust width */}
          <ObjectionsPanel
            onButtonClick={handleObjectionButtonClick}
            agentData={agentData}
            onUpdateAgentData={handleAgentDataUpdate}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#121212] border-t border-gray-800 py-2 px-4 text-xs text-gray-300 shadow-inner">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="font-semibold text-[#ff5e00]">STORM911 NEXUS</span> - Professional Telemarketing System
          </div>
          <div>© 2025 STORM911 & ASSURECALL. All rights reserved.</div>
        </div>
      </footer>

      {/* Objection Window */}
      {currentWindowData && (
        <DialogWindow
          open={!!currentWindow}
          onOpenChange={(open) => {
            if (!open) {
              // If closing a window, go back in history if the current state is that window
              if (currentWindow) {
                 handleGoBack(); // Use history to go back
              } else {
                 setCurrentWindow(null); // Should not happen if currentWindow is set, but as fallback
              }
            }
          }}
          title={currentWindowData.title}
          content={currentWindowData.text}
          buttons={currentWindowData.buttons}
          onButtonClick={handleObjectionButtonClick} // Use objection handler
          callerData={combinedData}
        />
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            handleCancelAction() // Use cancel handler
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
            <DialogDescription>{confirmDialog.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400" // Light gray for Cancel (Request #5 implies Previous/Cancel are similar)
              onClick={handleCancelAction} // Use cancel handler
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-gray-700 hover:bg-gray-800 text-white border-2 border-gray-800" // Dark gray for Confirm/End Call (Request #6)
              onClick={handleConfirmAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Help System */}
      <HelpSystem open={showHelp} onOpenChange={setShowHelp} />

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span>Next Page</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + N</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Previous Page/Window</span> {/* Updated label */}
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + P</kbd> {/* Changed back to P for consistency */}
            </div>
            <div className="flex items-center justify-between">
              <span>Reset Call</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + R</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>End Call</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + E</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Toggle Theme</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + T</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Help Guide</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + H</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Keyboard Shortcuts</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + K</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Toggle Caller Data</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Alt + D</kbd>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="bg-gradient-to-b from-[#3173F1] to-[#2a65d8] hover:from-[#2a65d8] hover:to-[#2456bc] text-white border-2 border-[#2456bc]"
              onClick={() => setShowKeyboardShortcuts(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Loading...</h2>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we prepare your call system.</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-start mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold">Error</h2>
                <p className="text-gray-500 dark:text-gray-400">{error}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setError(null)}>Dismiss</Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick tip */}
      <Dialog open={showTip} onOpenChange={setShowTip}>
        <DialogContent className="sm:max-w-[425px] border-2 border-[#ff5e00]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-500" />
              Welcome!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Welcome to the STORM911 NEXUS Call System!</p>
          </div>
          <DialogFooter>
            <Button
              className="bg-gradient-to-b from-[#3173F1] to-[#2a65d8] hover:from-[#2a65d8] hover:to-[#2456bc] text-white border-2 border-[#2456bc]"
              onClick={() => setShowTip(false)}
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}



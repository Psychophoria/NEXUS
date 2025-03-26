"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { replacePlaceholders } from "@/lib/format-utils"
import { cn } from "@/lib/utils" // Import cn

interface DialogWindowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  content: string
  buttons: Array<{
    label: string
    action: string
    variant?: string // Keep variant for potential future use, but override based on action
  }>
  onButtonClick: (action: string) => void
  callerData: any
}

export function DialogWindow({
  open,
  onOpenChange,
  title,
  content,
  buttons,
  onButtonClick,
  callerData,
}: DialogWindowProps) {
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const [formattedContent, setFormattedContent] = useState<string>("")

  // Format content only once when dialog opens or content changes
  useEffect(() => {
    if (open && content) {
      try {
        // Format the content
        const formatted = replacePlaceholders(content, callerData)
        setFormattedContent(formatted)
      } catch (error) {
        console.error("Error formatting content:", error)
        // Fallback to raw content if formatting fails
        setFormattedContent(content)
      }
    }
  }, [open, content, callerData])

  // Update the onButtonClick handler to properly handle all navigation actions
  const handleButtonClick = (action: string) => {
    // Always close the dialog first for navigation actions
    if (action === "END_CALL" || action === "NEXT_PAGE" || action === "PREVIOUS_PAGE" || action.startsWith("GOTO_PAGE_") || action === "BACK_TO_SCRIPT") {
        onOpenChange(false);
        // Use setTimeout to allow the dialog to close before triggering the parent action
        setTimeout(() => {
            onButtonClick(action);
        }, 50); // Short delay
    } else {
        // For actions that might open another window immediately, just call the handler
        onButtonClick(action);
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Request #1: Dark mode dialog background */}
      <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 commercial-dialog">
        {/* Request #7: Center Title */}
        <DialogHeader className="storm-dialog-header py-0.5 text-center">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-1 px-3 border-t border-b border-gray-300 dark:border-gray-600 max-h-[75vh] overflow-auto dialog-content-container">
          {/* Content container without animations */}
          <div
            ref={dialogContentRef}
            className="whitespace-pre-line text-base text-black dark:text-gray-100 leading-relaxed" // Ensure text is readable in dark mode
            style={{ fontSize: "0.95rem" }}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
        <div className="flex flex-wrap gap-1 justify-end pt-1">
          {buttons.map((button, index) => {
            // Determine button style based on action
            let buttonStyle = ""

            if (button.action === "NEXT_PAGE" || button.action.startsWith("GOTO_PAGE_")) {
              buttonStyle =
                "bg-gradient-to-b from-[#1EBB58] to-[#19a34d] hover:from-[#19a34d] hover:to-[#158c42] text-white border-2 border-[#158c42]"
            } else if (button.action === "PREVIOUS_PAGE" || button.action === "BACK_TO_SCRIPT") {
              // Request #5: Previous Button Color
              buttonStyle = "bg-gray-300 hover:bg-gray-400 text-black border-2 border-gray-400"
            } else if (button.action === "END_CALL") {
              // Request #6: End Call Button Color
              buttonStyle = "bg-gray-700 hover:bg-gray-800 text-white border-2 border-gray-800"
            } else {
              // Default style for other actions
              buttonStyle =
                "bg-gradient-to-b from-[#3173F1] to-[#2a65d8] hover:from-[#2a65d8] hover:to-[#2456bc] text-white border-2 border-[#2456bc]"
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                    `font-bold py-1 h-auto min-h-[2.5rem] text-xs md:text-sm whitespace-pre-line shadow-md hover:shadow-lg transition-all dialog-button`,
                    buttonStyle // Apply determined style
                )}
                onClick={() => handleButtonClick(button.action)}
              >
                {button.label}
              </Button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useEffect } from "react"

type ShortcutMap = {
  [key: string]: () => void
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input field or contenteditable element
      const activeElement = document.activeElement
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return
      }

      // Check for Alt + key combinations
      if (event.altKey) {
        const key = `Alt+${event.key.toLowerCase()}`
        if (shortcuts[key]) {
          event.preventDefault()
          shortcuts[key]()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [shortcuts])

  // No need to return anything as we're just setting up event listeners
  return null
}


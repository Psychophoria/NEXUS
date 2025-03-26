import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status?: "idle" | "active" | "completed" | "error"
  className?: string
}

export function StatusBadge({ status = "idle", className }: StatusBadgeProps) {
  const statusClasses = {
    idle: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    active: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300",
    completed: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    error: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const statusText = {
    idle: "Idle",
    active: "Active",
    completed: "Completed",
    error: "Error",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusClasses[status],
        className,
      )}
      data-status={status}
    >
      <span
        className={`w-2 h-2 mr-1.5 rounded-full ${status === "idle" ? "bg-gray-500" : status === "active" ? "bg-green-500 animate-pulse" : status === "completed" ? "bg-blue-500" : "bg-red-500"}`}
        aria-hidden="true"
      ></span>
      {statusText[status]}
    </span>
  )
}


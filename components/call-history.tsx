"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { History, Search, Phone, Calendar, Clock, User, X, FileText, ArrowUpRight } from "lucide-react"
import { formatDate } from "@/lib/format-utils"

interface CallRecord {
  id: string
  customerName: string
  phoneNumber: string
  date: string
  duration: string
  status: "completed" | "scheduled" | "no-answer" | "callback"
  notes?: string
}

interface CallHistoryProps {
  onSelectCall?: (call: CallRecord) => void
}

export function CallHistory({ onSelectCall }: CallHistoryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [calls, setCalls] = useState<CallRecord[]>([])

  // Load call history from localStorage
  useEffect(() => {
    const savedCalls = localStorage.getItem("call-history")
    if (savedCalls) {
      try {
        setCalls(JSON.parse(savedCalls))
      } catch (error) {
        console.error("Error loading call history:", error)
      }
    } else {
      // Sample data for demonstration
      const sampleCalls: CallRecord[] = [
        {
          id: "1",
          customerName: "John Smith",
          phoneNumber: "(555) 123-4567",
          date: "2023-06-15",
          duration: "08:42",
          status: "completed",
          notes: "Customer agreed to schedule an inspection. Roof is approximately 10 years old.",
        },
        {
          id: "2",
          customerName: "Sarah Johnson",
          phoneNumber: "(555) 987-6543",
          date: "2023-06-14",
          duration: "05:18",
          status: "scheduled",
          notes: "Appointment scheduled for June 20th at 2:00 PM.",
        },
        {
          id: "3",
          customerName: "Michael Brown",
          phoneNumber: "(555) 456-7890",
          date: "2023-06-13",
          duration: "00:45",
          status: "no-answer",
          notes: "No answer. Will try again tomorrow.",
        },
        {
          id: "4",
          customerName: "Emily Davis",
          phoneNumber: "(555) 789-0123",
          date: "2023-06-12",
          duration: "03:21",
          status: "callback",
          notes: "Customer requested callback on June 16th.",
        },
      ]
      setCalls(sampleCalls)
      localStorage.setItem("call-history", JSON.stringify(sampleCalls))
    }
  }, [])

  // Filter calls based on search term
  const filteredCalls = calls.filter(
    (call) =>
      call.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phoneNumber.includes(searchTerm) ||
      call.date.includes(searchTerm),
  )

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "no-answer":
        return <Badge className="bg-red-500">No Answer</Badge>
      case "callback":
        return <Badge className="bg-yellow-500">Callback</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  // Handle call selection
  const handleSelectCall = (call: CallRecord) => {
    if (onSelectCall) {
      onSelectCall(call)
    }
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-2 border-purple-700 h-8"
        onClick={() => setIsOpen(true)}
      >
        <History className="mr-1 h-4 w-4" /> Call History
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-white dark:bg-gray-800 text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <History className="mr-2 h-5 w-5" /> Call History
            </DialogTitle>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, phone, or date..."
              className="pl-10 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>

          <ScrollArea className="h-[400px]">
            {filteredCalls.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500 dark:text-gray-400">
                <History className="h-12 w-12 mb-2 opacity-50" />
                <p className="text-lg font-medium">No calls found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCalls.map((call) => (
                  <div
                    key={call.id}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-500" />
                          {call.customerName}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Phone className="h-3.5 w-3.5 mr-1" />
                          {call.phoneNumber}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(call.status)}
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(call.date)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                          <Clock className="h-3 w-3 mr-1" />
                          {call.duration}
                        </div>
                      </div>
                    </div>

                    {call.notes && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <FileText className="h-3.5 w-3.5 mr-1 mt-0.5 text-gray-400" />
                        <p className="line-clamp-2">{call.notes}</p>
                      </div>
                    )}

                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSelectCall(call)}
                      >
                        <ArrowUpRight className="h-3 w-3 mr-1" /> Load Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}


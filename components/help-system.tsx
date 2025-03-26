"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Info, HelpCircle, FileText, MessageSquare, AlertTriangle } from "lucide-react"

interface HelpSystemProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpSystem({ open, onOpenChange }: HelpSystemProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <HelpCircle className="mr-2 h-5 w-5" /> STORM911 NEXUS Help System
          </DialogTitle>
          <DialogDescription>
            Learn how to use the STORM911 NEXUS application to guide your calls effectively.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="objections">Objections</TabsTrigger>
            <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="overview" className="p-4 min-h-[400px]">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Info className="h-6 w-6 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Welcome to STORM911 NEXUS</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      NEXUS is a comprehensive call management system designed for STORM911 telemarketing agents. It
                      guides you through calls with potential customers, helping you navigate conversations effectively
                      and handle objections professionally.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Main Components:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Caller Data Panel:</strong> Record and manage customer information, roofing details, and
                        appointment scheduling.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Transcript Panel:</strong> Follow the script for each stage of the call, with buttons to
                        navigate based on customer responses.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Objections Panel:</strong> Quick access to responses for common customer objections,
                        organized in two groups.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Getting Started</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      To begin a new call, click the START button on the transcript panel. As you progress through the
                      call, fill in the caller data panel with information gathered from the customer. Use the
                      objections panel to handle any objections that arise during the call.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="p-4 min-h-[400px]">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FileText className="h-6 w-6 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Using the Transcript Panel</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      The transcript panel guides you through each stage of the call with a structured script. It
                      highlights important instructions and questions to help you navigate the conversation effectively.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Page Navigation:</strong> Use the Previous and Next buttons to move between script
                        pages.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Response Options:</strong> Click on the appropriate button based on the customer's
                        response to navigate to the next relevant script page or objection window.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Text Formatting:</strong> Important instructions are highlighted in red, questions in
                        blue, and key points in bold to guide your attention.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Progress Tracking:</strong> The progress bar at the bottom shows how far you've advanced
                        in the call script.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Important Notes</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Always follow the script closely, especially the parts highlighted in red that instruct you to
                      pause and wait for customer responses. This ensures you're giving the customer time to process
                      information and respond naturally.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="objections" className="p-4 min-h-[400px]">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Handling Objections</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      The objections panel provides quick access to responses for common customer objections. These are
                      organized into two groups for easy navigation.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Using the Objections Panel:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Accessing Objections:</strong> Click on the appropriate objection button when a customer
                        raises a concern or objection during the call.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Following the Script:</strong> Read the objection response script carefully, paying
                        attention to instructions highlighted in red.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Returning to the Main Script:</strong> Use the "BACK TO SCRIPT" button to return to the
                        main transcript after handling an objection.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Searching Objections:</strong> Use the search bar at the top of the objections panel to
                        quickly find specific objections.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Group 1 Objections:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>30 SECOND OBJECTION</li>
                      <li>ALREADY INSPECTED</li>
                      <li>ASK MY SPOUSE</li>
                      <li>BAD EXPERIENCE BEFORE</li>
                      <li>CAN'T CALL YOU BACK</li>
                      <li>DECIDING NOT NOW</li>
                      <li>ESTIMATE-INSURANCE</li>
                      <li>ESTIMATE- NON INSURANCE</li>
                      <li>GET MY NUMBER</li>
                      <li>HAS CONTRACTOR</li>
                      <li>HOW DID I FAIL</li>
                      <li>INSURANCE DENIED</li>
                      <li>INSURANCE ALREADY INSPECTED</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Group 2 Objections:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>METAL ROOF</li>
                      <li>NO DAMAGE</li>
                      <li>NO INSURANCE</li>
                      <li>NOTHING IS FREE</li>
                      <li>PHONE SPAM</li>
                      <li>NOT INTERESTED</li>
                      <li>NO TIME</li>
                      <li>NOT OWNER</li>
                      <li>SELLING HOME</li>
                      <li>WHO IS NIRC</li>
                      <li>WHAT NEIGHBOR</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="p-4 min-h-[400px]">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Info className="h-6 w-6 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Tips & Best Practices</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Follow these tips to maximize your effectiveness with the STORM911 NEXUS system.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">General Tips:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Follow the Script:</strong> Stick to the script as closely as possible, especially the
                        parts highlighted in red that instruct you to pause and wait for customer responses.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Enter Data Promptly:</strong> Fill in the caller data panel as you gather information to
                        ensure accuracy and completeness.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Be Prepared for Objections:</strong> Familiarize yourself with common objections and
                        their responses so you can handle them confidently when they arise.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                      <span>
                        <strong>Use Text Size Controls:</strong> Adjust the text size in each panel to ensure
                        comfortable reading during calls.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Keyboard Shortcuts:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between">
                      <span>Next Page:</span>
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + →</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Previous Page:</span>
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + ←</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Toggle Caller Data:</span>
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + D</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>End Call:</span>
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + E</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reset Call:</span>
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + R</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Help:</span>
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">F1</kbd>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Common Pitfalls to Avoid</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                        <span>
                          <strong>Rushing Through the Script:</strong> Take your time and follow the pauses indicated in
                          the script.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                        <span>
                          <strong>Neglecting Data Entry:</strong> Incomplete customer data can lead to problems later in
                          the process.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 mr-1 text-orange-500 flex-shrink-0" />
                        <span>
                          <strong>Ignoring Objections:</strong> Always address objections directly using the provided
                          scripts.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>Close Help</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


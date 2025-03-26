"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, FileText, Plus, Trash2, Edit, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  content: string
  timestamp: Date
  isImportant?: boolean
}

interface CallNotesProps {
  callId?: string
  onSaveNotes?: (notes: Note[]) => void
}

export function CallNotes({ callId, onSaveNotes }: CallNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load saved notes when component mounts
  useEffect(() => {
    if (callId) {
      const savedNotes = localStorage.getItem(`call-notes-${callId}`)
      if (savedNotes) {
        try {
          setNotes(JSON.parse(savedNotes))
        } catch (error) {
          console.error("Error loading saved notes:", error)
        }
      }
    }
  }, [callId])

  // Save notes when they change
  useEffect(() => {
    if (callId && notes.length > 0) {
      localStorage.setItem(`call-notes-${callId}`, JSON.stringify(notes))
      if (onSaveNotes) {
        onSaveNotes(notes)
      }
    }
  }, [notes, callId, onSaveNotes])

  // Focus textarea when dialog opens
  useEffect(() => {
    if (isDialogOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [isDialogOpen])

  const addNote = () => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote.trim(),
        timestamp: new Date(),
      }
      setNotes((prev) => [...prev, newNote])
      setCurrentNote("")
      setIsDialogOpen(false)
    }
  }

  const updateNote = (id: string, content: string) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, content, timestamp: new Date() } : note)))
    setEditingNoteId(null)
  }

  const deleteNote = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes((prev) => prev.filter((note) => note.id !== id))
    }
  }

  const toggleImportant = (id: string) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, isImportant: !note.isImportant } : note)))
  }

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-blue-700 h-8"
        onClick={() => setIsDialogOpen(true)}
      >
        <FileText className="mr-1 h-4 w-4" /> Call Notes
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-gray-800 text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" /> Call Notes
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                placeholder="Type your note here..."
                className="min-h-[100px] bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    addNote()
                  }
                }}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400">Press Ctrl+Enter to save note</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Saved Notes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => {
                    setCurrentNote("")
                    textareaRef.current?.focus()
                  }}
                >
                  <Plus className="mr-1 h-3 w-3" /> New Note
                </Button>
              </div>

              <ScrollArea className="h-[200px] rounded-md border border-gray-200 dark:border-gray-700">
                {notes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500 dark:text-gray-400">
                    <FileText className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">No notes yet</p>
                    <p className="text-xs">Add your first note above</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className={cn(
                          "p-2 rounded-md border text-sm",
                          note.isImportant
                            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                        )}
                      >
                        {editingNoteId === note.id ? (
                          <div className="space-y-2">
                            <Textarea
                              className="min-h-[60px] text-sm bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                              value={note.content}
                              onChange={(e) =>
                                setNotes((prev) =>
                                  prev.map((n) => (n.id === note.id ? { ...n, content: e.target.value } : n)),
                                )
                              }
                              autoFocus
                            />
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => setEditingNoteId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => updateNote(note.id, note.content)}
                              >
                                <Check className="mr-1 h-3 w-3" /> Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="whitespace-pre-wrap break-words">{note.content}</div>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{formatTimestamp(note.timestamp)}</span>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => toggleImportant(note.id)}
                                  title={note.isImportant ? "Unmark as important" : "Mark as important"}
                                >
                                  <span className="sr-only">
                                    {note.isImportant ? "Unmark as important" : "Mark as important"}
                                  </span>
                                  {note.isImportant ? "⭐" : "☆"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-blue-600 dark:text-blue-400"
                                  onClick={() => setEditingNoteId(note.id)}
                                >
                                  <Edit className="h-3 w-3" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-red-600 dark:text-red-400"
                                  onClick={() => deleteNote(note.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-300 dark:border-gray-600"
            >
              Close
            </Button>
            <Button onClick={addNote} disabled={!currentNote.trim()}>
              <Save className="mr-1 h-4 w-4" /> Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


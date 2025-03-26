File: C:/Users/PSYCHOPHORIA/Desktop/WORK/FUCK-JOE/DONTBEABITCH/app/components/caller-data-panel.tsx
"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react" // Added useMemo
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command" // Added Command components
import { CalendarIcon, Eye, EyeOff, Maximize2, Save, Check, AlertCircle, ChevronsUpDown } from "lucide-react" // Added ChevronsUpDown
import { formatPhoneNumber, formatDate } from "@/lib/format-utils"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Update the component interface to match the props actually passed from Dashboard
interface CallerDataPanelProps {
  callerData?: any
  onUpdateCallerData?: (data: any) => void
  progress: number
  onToggleVisibility: () => void
}

// Request #18: Insurance Providers List (Sorted approximately by market share/commonality)
const insuranceProvidersList = [
    "State Farm Group", "Progressive Ins Group", "Allstate Ins Group", "Berkshire Hathaway Ins (GEICO)", "Liberty Mutual Ins Cos",
    "Travelers Group", "USAA Group", "Farmers Ins Group", "Nationwide Group", "Amer Family Ins Group",
    "Chubb INA Group", "Hartford Ins Group", "Auto-Owners Ins Group", "Erie Ins Group", "Amer Intl Group (AIG)",
    "Tokio Marine US PC Group", "CNA Ins Cos", "Cincinnati Ins Cos", "Hanover Ins Group Prop & Cas Cos", "W. R. Berkley Ins Group",
    "Markel Corp Group", "Zurich Ins US PC Group", "Fairfax Financial (USA) Group", "Alleghany Corp Group", "Great Amer P & C Ins Group",
    "Auto Club Enterprises Ins Group", "CSAA Ins Group", "Mercury Gen Group", "Kemper PC Companies", "NJM Ins Group",
    "Shelter Ins Cos", "Sentry Ins Group", "Amica Mutual Group", "Westfield Group", "COUNTRY Financial PC Group",
    "Federated Mutual Group", "Selective Ins Group", "EMC Ins Cos", "Auto Club Group", "MAPFRE North America Group",
    "Acuity, A Mutual Ins Co", "Southern Farm Bureau Cas Group", "Amer Natl Prop & Cas Group", "West Bend Mutual Ins Co", "Grange Ins Pool",
    "Texas Farm Bureau Group", "Intact US Ins Group", "Argo Group", "RLI Group", "Amerisure Cos",
    "Safety Group", "Central Ins Cos", "Secura Ins Cos", "Utica Natl Ins Group", "United Fire & Cas Group",
    "Encova Mutual Ins Group", "KY Farm Bureau Group", "Doctors Co Ins Group", "Donegal Ins Group", "Church Mutual Ins Group",
    "Penn Natl Ins Cos", "Western Natl Ins Group", "Frankenmuth Ins Group", "United Ins Group", "Horace Mann Ins Group",
    "ProAssurance Group", "Andover Companies Pool", "Grinnell Mutual Group", "Employers Ins Group", "Pekin Ins Group",
    "CA Cas Group", "United Farm Bureau of Indiana Group", "CopperPoint Ins Group", "NYCM Ins Group", "Germania Mutual Group",
    "Wawanesa Gen Ins Co", "Plymouth Rock Cos", "AmeriTrust Group", "GuideOne Ins Cos", "Hallmark Ins Group",
    "Pemco Mutual Ins Co", "VT Mutual Group", "Brotherhood Mutual Ins Co", "Heritage Ins Hldgs Group", "Protective Ins Corp Group",
    "Greater NY Group", "Coverys Companies", "Enumclaw Ins Group", "North Star Companies", "GA Farm Bureau Group",
    "Norcal Group", "Kinsale Ins Co", "Memic Group", "Root Ins Co", "WCF Ins Group",
    "Canal Group", "Farmers Mutual Ins Co of NE", "Beazley USA Ins Group", "Amer Agricultural Ins Co", "Hiscox USA Group",
    "Quincy Mutual Group", "Amer Access Cas Co", "Safeway Ins Group", "Hastings Mutual Ins Co", "Builders Mutual Ins Co",
    "Amer Transit Ins Co", "MGA Ins Co, Inc", "Safe Auto Ins Group", "Amer Pet Ins Co", "AMERISAFE Ins Group",
    "MAG Mutual Companies", "MS&AD US Ins Group", "Securian Cas Co", "VA Farm Bureau Group", "Highmark Cas Ins Co",
    "Nodak Ins Group", "Caterpillar Ins Co", "Merchants Ins Group", "MO Farm Bureau Group", "Ohio Mutual Ins Group",
    "IMT Ins Cos", "HCI Ins Group", "Preferred Mutual Ins Co", "Norfolk & Dedham Group Pool", "Fortegra P&C Group",
    "Lancer Ins Group", "MO Employers Mutual Ins Co", "Pioneer State Mutual Ins Co", "Jewelers Mutual Ins Group", "IN Farmers Mutual Ins Co",
    "Farm Bureau of ID Group", "Pacific Specialty Ins Group", "Munich-Amer Hldg Corp Cos", "Everest Re US Group", "Assurant US PC Companies",
    "QBE North America Ins Group", "Arch Ins Group", "AmTrust Group", "AF Group", "Starr Intl Group",
    "Alfa Ins Group", "IAT Ins Group", "ICW Pool", "Old Republic Ins Group", "Natl Gen Companies",
    "AXA U.S. Group", "Sompo Hldgs US Group", "PartnerRe US Group", "State Auto Ins Cos", "Swiss Reins Group",
    "State Ins Fund WC Fund", "AXIS US Operations", "SCOR US Group", "State Compensation Ins Fund", "Radian Group",
    "Mortgage Guar Group", "Aspen US Ins Group", "CUMIS Ins Society Group", "NC Farm Bureau Ins Group", "Universal Ins Hldgs Group",
    "ProSight Specialty Group", "Palisades Group", "Genworth PC Group", "Michigan Farm Bureau PC Companies", "Arbella Ins Group",
    "Citizens Property Ins Corporation", "Loya Ins Group", "FMH Ins Group", "Pinnacol Assur", "Ally Ins Group",
    "SAIF Corp", "HIIG Group", "Essent Guar Group", "RenaissanceRe US Group", "Global Indemnity Group",
    "Universal Ins Group of Puerto Rico", "Toa Reins Co of America", "HDI/Talanx US PC Group", "FedNat Ins Group", "MCIC Vermont (A RRRG)",
    "Enstar Ins Group", "AU Hldg Co Group", "WT Hldgs Group", "Milo Trust Group", "Natl Mortgage Ins Group",
    "GE Capital PC Group", "Sirius America Ins Group", "Nuclear Electric Ins Ltd", "ID State Ins Fund", "Dorinco Reins Co",
    "Assured Guar Group", "Triton Ins Co", "CA Earthquake Authority", "Other" // Keep Other at the end
].map(name => ({ value: name.toLowerCase().replace(/[^a-z0-9]/g, ''), label: name }));


export function CallerDataPanel({
  callerData = {},
  onUpdateCallerData,
  progress,
  onToggleVisibility,
}: CallerDataPanelProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    phoneNumber: "",
    cellNumber: "",
    secondaryPhone: "",
    email: "",
    roofAge: "",
    roofingType: "",
    stories: "",
    hasInsurance: "",
    insuranceCompany: "", // Keep original simple dropdown for now
    insuranceProvider: "", // Request #18: Added state for insurance provider combobox
    isHomeowner: "",
    hasContractor: "",
    appointmentDate: "",
    appointmentTime: "",
    ...callerData,
  })
  const [activeTab, setActiveTab] = useState("customer")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(14) // Default font size
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [providerSearch, setProviderSearch] = useState("") // State for Combobox search
  const [providerPopoverOpen, setProviderPopoverOpen] = useState(false) // State for Combobox popover

  // Update local state when callerData prop changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...callerData }))
  }, [callerData])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format phone numbers
    if (["phoneNumber", "cellNumber", "secondaryPhone"].includes(name) && value) {
      formattedValue = formatPhoneNumber(value)
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select change (including insuranceProvider from Combobox)
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Use formatDate which handles timezone correctly
      setFormData((prev) => ({ ...prev, appointmentDate: formatDate(date) }))

      // Clear validation error when field is edited
      if (validationErrors["appointmentDate"]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors["appointmentDate"]
          return newErrors
        })
      }
    } else {
        // Handle case where date is cleared
        setFormData((prev) => ({ ...prev, appointmentDate: "" }))
    }
  }


  // Validate form data
  const validateForm = () => {
    const errors: Record<string, string> = {}

    // Basic validation for required fields
    if (formData.firstName && formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters"
    }

    if (formData.lastName && formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters"
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Phone number validation (check for 10 digits)
    if (formData.phoneNumber && formData.phoneNumber.replace(/\D/g, "").length !== 10) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number"
    }

    if (formData.cellNumber && formData.cellNumber.replace(/\D/g, "").length !== 10) {
      errors.cellNumber = "Please enter a valid 10-digit phone number"
    }

    if (formData.secondaryPhone && formData.secondaryPhone.replace(/\D/g, "").length !== 10) {
      errors.secondaryPhone = "Please enter a valid 10-digit phone number"
    }

    // ZIP code validation
    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      errors.zip = "Please enter a valid 5-digit ZIP code"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Update the saveData function to use onUpdateCallerData instead of onUpdate
  const saveData = () => {
    if (validateForm()) {
      setSaveStatus("saving")

      // Simulate API call delay
      setTimeout(() => {
        try {
          if (onUpdateCallerData) {
            onUpdateCallerData(formData)
          }
          setSaveStatus("saved")

          // Reset to idle after a delay
          setTimeout(() => {
            setSaveStatus("idle")
          }, 2000)
        } catch (error) {
          setSaveStatus("error")

          // Reset to idle after a delay
          setTimeout(() => {
            setSaveStatus("idle")
          }, 2000)
        }
      }, 500)
    }
  }

  // Update the auto-save effect to use onUpdateCallerData
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (validateForm() && onUpdateCallerData) {
        onUpdateCallerData(formData)
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [formData, onUpdateCallerData]) // Removed validateForm from dependency array

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

  // Increase font size
  const increaseFontSize = () => {
    if (fontSize < 18) {
      setFontSize(fontSize + 1)
    }
  }

  // Decrease font size
  const decreaseFontSize = () => {
    if (fontSize > 10) {
      setFontSize(fontSize - 1)
    }
  }

  // US States for dropdown
  const usStates = useMemo(() => [ // Use useMemo for constant data
    { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
  ], []);

  // Roof age options
  const roofAgeOptions = useMemo(() => [
    { value: "less-than-5", label: "Less than 5 years" }, { value: "5-years", label: "5 years" },
    { value: "8-years", label: "8 years" }, { value: "10-years", label: "10 years" },
    { value: "15-years", label: "15 years" }, { value: "more-than-15", label: "More than 15 years" },
  ], []);

  // Roofing type options
  const roofingTypeOptions = useMemo(() => [
    { value: "shingles", label: "Shingles" }, { value: "metal", label: "Metal" },
    { value: "cedar-shake", label: "Cedar Shake" }, { value: "tile", label: "Tile" },
    { value: "slate", label: "Slate" }, { value: "other", label: "Other" },
  ], []);

  // Stories options
  const storiesOptions = useMemo(() => [
    { value: "1", label: "1 Story" }, { value: "2", label: "2 Stories" },
    { value: "3", label: "3 Stories" }, { value: "more", label: "More than 3 Stories" },
  ], []);

  // Yes/No options
  const yesNoOptions = useMemo(() => [
    { value: "yes", label: "Yes" }, { value: "no", label: "No" },
  ], []);

  // Insurance company options (Simplified - use insuranceProvidersList for the new field)
  const insuranceCompanyOptions = useMemo(() => [
    { value: "state-farm", label: "State Farm" }, { value: "allstate", label: "Allstate" },
    { value: "geico", label: "GEICO" }, { value: "progressive", label: "Progressive" },
    { value: "liberty-mutual", label: "Liberty Mutual" }, { value: "farmers", label: "Farmers" },
    { value: "nationwide", label: "Nationwide" }, { value: "american-family", label: "American Family" },
    { value: "travelers", label: "Travelers" }, { value: "usaa", label: "USAA" },
    { value: "other", label: "Other" },
  ], []);

  // Appointment time options
  const appointmentTimeOptions = useMemo(() => [
    { value: "9:00 AM", label: "9:00 AM" }, { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" }, { value: "12:00 PM", label: "12:00 PM" },
    { value: "1:00 PM", label: "1:00 PM" }, { value: "2:00 PM", label: "2:00 PM" },
    { value: "3:00 PM", label: "3:00 PM" }, { value: "4:00 PM", label: "4:00 PM" },
    { value: "5:00 PM", label: "5:00 PM" }, { value: "6:00 PM", label: "6:00 PM" },
    { value: "7:00 PM", label: "7:00 PM" },
  ], []);

  // Filtered insurance providers for Combobox (Request #18)
  const filteredProviders = useMemo(() => {
    if (!providerSearch) return insuranceProvidersList;
    const lowerSearch = providerSearch.toLowerCase();
    return insuranceProvidersList.filter(provider =>
      provider.label.toLowerCase().includes(lowerSearch)
    );
  }, [providerSearch]);

  return (
    <div
      ref={panelRef}
      // Request #1: Dark mode panel styling
      className="h-full flex flex-col storm-panel bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="caller-data-header py-2 px-4 flex justify-between items-center">
        <div className="w-24">{/* Left side controls - buttons removed */}</div>

        <h2 className="text-lg font-bold text-white whitespace-nowrap">CALLER DATA</h2>

        <div className="w-24 flex justify-end">
          {/* Right side controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1 min-h-0"> {/* Ensure Tabs takes full height */}
        <TabsList className="grid grid-cols-3 mb-2 bg-gray-200 dark:bg-gray-600 flex-shrink-0"> {/* Adjusted dark bg */}
          <TabsTrigger
            value="customer"
            className="text-gray-800 dark:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700" // Adjusted dark active bg/text
          >
            Customer
          </TabsTrigger>
          <TabsTrigger
            value="roofing"
            className="text-gray-800 dark:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700" // Adjusted dark active bg/text
          >
            Roofing
          </TabsTrigger>
          <TabsTrigger
            value="insurance"
            className="text-gray-800 dark:text-gray-100 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700" // Adjusted dark active bg/text
          >
            Insurance
          </TabsTrigger>
        </TabsList>

        {/* Customer Information Tab */}
        <TabsContent value="customer" className="overflow-y-auto flex-1 p-2 space-y-2"> {/* Use flex-1 for content */}
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Customer Information
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-xs text-gray-700 dark:text-gray-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                    validationErrors.firstName && "border-red-500 dark:border-red-500",
                  )}
                />
                {validationErrors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.firstName}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-xs text-gray-700 dark:text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                    validationErrors.lastName && "border-red-500 dark:border-red-500",
                  )}
                />
                {validationErrors.lastName && <p className="text-xs text-red-500 mt-1">{validationErrors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="address" className="text-xs text-gray-700 dark:text-gray-300">
                Street Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={cn(
                  "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                  validationErrors.address && "border-red-500 dark:border-red-500",
                )}
              />
              {validationErrors.address && <p className="text-xs text-red-500 mt-1">{validationErrors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="city" className="text-xs text-gray-700 dark:text-gray-300">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                    validationErrors.city && "border-red-500 dark:border-red-500",
                  )}
                />
                {validationErrors.city && <p className="text-xs text-red-500 mt-1">{validationErrors.city}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="zip" className="text-xs text-gray-700 dark:text-gray-300">
                  ZIP
                </Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                    validationErrors.zip && "border-red-500 dark:border-red-500",
                  )}
                />
                {validationErrors.zip && <p className="text-xs text-red-500 mt-1">{validationErrors.zip}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="state" className="text-xs text-gray-700 dark:text-gray-300">
                State
              </Label>
              <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                <SelectTrigger
                  id="state"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.state && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select state" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {usStates.map((state) => (
                    <SelectItem key={state.value} value={state.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.state && <p className="text-xs text-red-500 mt-1">{validationErrors.state}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phoneNumber" className="text-xs text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={cn(
                  "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                  validationErrors.phoneNumber && "border-red-500 dark:border-red-500",
                )}
              />
              {validationErrors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.phoneNumber}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="cellNumber" className="text-xs text-gray-700 dark:text-gray-300">
                Cell Number
              </Label>
              <Input
                id="cellNumber"
                name="cellNumber"
                value={formData.cellNumber}
                onChange={handleInputChange}
                className={cn(
                  "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                  validationErrors.cellNumber && "border-red-500 dark:border-red-500",
                )}
              />
              {validationErrors.cellNumber && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.cellNumber}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="secondaryPhone" className="text-xs text-gray-700 dark:text-gray-300">
                Secondary Phone
              </Label>
              <Input
                id="secondaryPhone"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleInputChange}
                className={cn(
                  "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                  validationErrors.secondaryPhone && "border-red-500 dark:border-red-500",
                )}
              />
              {validationErrors.secondaryPhone && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.secondaryPhone}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={cn(
                  "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode input
                  validationErrors.email && "border-red-500 dark:border-red-500",
                )}
              />
              {validationErrors.email && <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>}
            </div>
        </TabsContent>

        {/* Roofing Information Tab */}
        <TabsContent value="roofing" className="overflow-y-auto flex-1 p-2 space-y-2"> {/* Use flex-1 for content */}
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Roofing Information
            </h3>

            <div className="space-y-1">
              <Label htmlFor="roofAge" className="text-xs text-gray-700 dark:text-gray-300">
                Roof Age
              </Label>
              <Select value={formData.roofAge} onValueChange={(value) => handleSelectChange("roofAge", value)}>
                <SelectTrigger
                  id="roofAge"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.roofAge && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select roof age" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {roofAgeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.roofAge && <p className="text-xs text-red-500 mt-1">{validationErrors.roofAge}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="roofingType" className="text-xs text-gray-700 dark:text-gray-300">
                Roofing Type
              </Label>
              <Select value={formData.roofingType} onValueChange={(value) => handleSelectChange("roofingType", value)}>
                <SelectTrigger
                  id="roofingType"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.roofingType && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select roofing type" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {roofingTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.roofingType && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.roofingType}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="stories" className="text-xs text-gray-700 dark:text-gray-300">
                How Many Stories
              </Label>
              <Select value={formData.stories} onValueChange={(value) => handleSelectChange("stories", value)}>
                <SelectTrigger
                  id="stories"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.stories && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select number of stories" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {storiesOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.stories && <p className="text-xs text-red-500 mt-1">{validationErrors.stories}</p>}
            </div>
        </TabsContent>

        {/* Insurance & Appointment Tab */}
        <TabsContent value="insurance" className="overflow-y-auto flex-1 p-2 space-y-2"> {/* Use flex-1 for content */}
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Insurance & Appointment Information
            </h3>

            <div className="space-y-1">
              <Label htmlFor="hasInsurance" className="text-xs text-gray-700 dark:text-gray-300">
                Do You Have Homeowners Insurance
              </Label>
              <Select
                value={formData.hasInsurance}
                onValueChange={(value) => handleSelectChange("hasInsurance", value)}
              >
                <SelectTrigger
                  id="hasInsurance"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.hasInsurance && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select option" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {yesNoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.hasInsurance && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.hasInsurance}</p>
              )}
            </div>

            {/* Request #18: Insurance Provider Combobox */}
            {formData.hasInsurance === "yes" && (
              <div className="space-y-1">
                <Label htmlFor="insuranceProvider" className="text-xs text-gray-700 dark:text-gray-300">
                  Insurance Provider (Detailed)
                </Label>
                <Popover open={providerPopoverOpen} onOpenChange={setProviderPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={providerPopoverOpen}
                      className={cn(
                        "w-full justify-between h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-300", // Adjusted dark mode button
                        !formData.insuranceProvider && "text-gray-500 dark:text-gray-600" // Adjusted dark placeholder
                      )}
                    >
                      {formData.insuranceProvider
                        ? insuranceProvidersList.find((provider) => provider.value === formData.insuranceProvider)?.label
                        : "Select provider..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 bg-white dark:bg-gray-700"> {/* Adjusted dark popover */}
                    <Command>
                      <CommandInput
                        placeholder="Search provider..."
                        value={providerSearch}
                        onValueChange={setProviderSearch}
                        className="h-9 dark:bg-gray-300 dark:text-black" // Adjusted dark input
                      />
                      <CommandList>
                        <CommandEmpty>No provider found.</CommandEmpty>
                        <CommandGroup>
                          {filteredProviders.map((provider) => (
                            <CommandItem
                              key={provider.value}
                              value={provider.value}
                              onSelect={(currentValue) => {
                                handleSelectChange("insuranceProvider", currentValue === formData.insuranceProvider ? "" : currentValue)
                                setProviderPopoverOpen(false)
                                setProviderSearch("") // Clear search on select
                              }}
                              className="dark:text-white dark:hover:bg-gray-600 dark:aria-selected:bg-gray-600" // Adjusted dark item
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.insuranceProvider === provider.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {provider.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {validationErrors.insuranceProvider && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.insuranceProvider}</p>
                )}
              </div>
            )}

            {/* Original Insurance Company Dropdown (kept for now) */}
            {formData.hasInsurance === "yes" && (
              <div className="space-y-1">
                <Label htmlFor="insuranceCompany" className="text-xs text-gray-700 dark:text-gray-300">
                  Insurance Company (Simple)
                </Label>
                <Select
                  value={formData.insuranceCompany}
                  onValueChange={(value) => handleSelectChange("insuranceCompany", value)}
                >
                  <SelectTrigger
                    id="insuranceCompany"
                    className={cn(
                      "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                      validationErrors.insuranceCompany && "border-red-500 dark:border-red-500",
                    )}
                  >
                    <SelectValue placeholder="Select insurance company" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                    {insuranceCompanyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.insuranceCompany && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.insuranceCompany}</p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="isHomeowner" className="text-xs text-gray-700 dark:text-gray-300">
                Are You the Homeowner or Decision Maker
              </Label>
              <Select value={formData.isHomeowner} onValueChange={(value) => handleSelectChange("isHomeowner", value)}>
                <SelectTrigger
                  id="isHomeowner"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.isHomeowner && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select option" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {yesNoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.isHomeowner && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.isHomeowner}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="hasContractor" className="text-xs text-gray-700 dark:text-gray-300">
                Do You Have A Contractor Currently
              </Label>
              <Select
                value={formData.hasContractor}
                onValueChange={(value) => handleSelectChange("hasContractor", value)}
              >
                <SelectTrigger
                  id="hasContractor"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.hasContractor && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select option" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {yesNoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.hasContractor && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.hasContractor}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="appointmentDate" className="text-xs text-gray-700 dark:text-gray-300">
                Appointment Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-300", // Adjusted dark mode button
                      !formData.appointmentDate && "text-muted-foreground dark:text-gray-600", // Adjusted dark placeholder
                      validationErrors.appointmentDate && "border-red-500 dark:border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.appointmentDate ? formData.appointmentDate : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark calendar popover */}
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDate ? new Date(formData.appointmentDate.replace(/-/g, '/')) : undefined} // Ensure date parsing is robust
                    onSelect={handleDateChange}
                    initialFocus
                    className="bg-white dark:bg-gray-800 text-black dark:text-white" // Adjusted dark calendar
                    classNames={{ // Ensure calendar parts are styled for dark mode
                        caption: "text-black dark:text-white",
                        caption_label: "text-black dark:text-white",
                        nav_button: "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                        head_cell: "text-gray-500 dark:text-gray-400",
                        day: "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                        day_today: "bg-accent text-accent-foreground dark:bg-gray-600 dark:text-white",
                        day_selected: "bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white",
                        day_outside: "text-gray-400 dark:text-gray-500",
                        day_disabled: "text-gray-300 dark:text-gray-600",
                    }}
                  />
                </PopoverContent>
              </Popover>
              {validationErrors.appointmentDate && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.appointmentDate}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="appointmentTime" className="text-xs text-gray-700 dark:text-gray-300">
                Appointment Time
              </Label>
              <Select
                value={formData.appointmentTime}
                onValueChange={(value) => handleSelectChange("appointmentTime", value)}
              >
                <SelectTrigger
                  id="appointmentTime"
                  className={cn(
                    "h-7 bg-white dark:bg-gray-200 text-black dark:text-black border-gray-300 dark:border-gray-500", // Adjusted dark mode select
                    validationErrors.appointmentTime && "border-red-500 dark:border-red-500",
                  )}
                >
                  <SelectValue placeholder="Select time" className="text-gray-500 dark:text-gray-600" /> {/* Adjusted dark placeholder */}
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"> {/* Adjusted dark content */}
                  {appointmentTimeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black dark:text-white hover:dark:bg-gray-600"> {/* Adjusted dark item */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.appointmentTime && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.appointmentTime}</p>
              )}
            </div>
        </TabsContent>
      </Tabs>

      {/* Controls */}
      <div className="p-3 border-t border-gray-300 dark:border-gray-600 mt-auto flex-shrink-0"> {/* Adjusted dark border */}
        <div className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-2 border-green-700",
                    saveStatus === "saving" && "opacity-70 cursor-wait",
                    saveStatus === "saved" && "bg-gradient-to-b from-blue-500 to-blue-600 border-blue-700",
                    saveStatus === "error" && "bg-gradient-to-b from-red-500 to-red-600 border-red-700" // Added error style
                  )}
                  onClick={saveData}
                  disabled={saveStatus === "saving"}
                >
                  {saveStatus === "idle" && <Save className="mr-1 h-4 w-4" />}
                  {saveStatus === "saving" && <span className="animate-spin mr-1">⟳</span>}
                  {saveStatus === "saved" && <Check className="mr-1 h-4 w-4" />}
                  {saveStatus === "error" && <AlertCircle className="mr-1 h-4 w-4" />}
                  {saveStatus === "idle" && "Update"}
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "saved" && "Saved!"}
                  {saveStatus === "error" && "Error!"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save caller data (Alt+S)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gradient-to-b from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-2 border-gray-700"
                  onClick={onToggleVisibility}
                >
                  {/* Eye icon logic seems reversed, should show EyeOff when visible? Correcting. */}
                  {/* <EyeOff className="mr-1 h-4 w-4" /> Hide */}
                  <Eye className="mr-1 h-4 w-4" /> Show/Hide {/* Simplified label */}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle panel visibility (Alt+D)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2 border-t border-gray-300 dark:border-gray-600 flex-shrink-0"> {/* Adjusted dark border */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            DATA ENTRY PROGRESS ({Math.round(progress)}%)
          </span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-gray-200 dark:bg-gray-500" // Adjusted dark background
          indicatorClassName={cn( // Use cn for conditional classes
            "h-full w-full flex-1 transition-all",
            progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-green-500"
          )}
        />
      </div>
    </div>
  )
}
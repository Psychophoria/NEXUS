/**
 * Utility functions for formatting text in the STORM911 NEXUS application
 */

// Format text with special formatting for instructions, questions, etc.
export function formatText(text: string): string {
  if (!text) return ""

  // Apply formatting rules in a specific order to avoid conflicts
  let formattedText = text
    // Request #4: Uppercase "BUT" Formatting
    .replace(/\bBUT\b/g, '<strong class="text-black dark:text-white" style="font-size: 2em;">BUT</strong>')

    // Request #16: Custom Formatting Markers
    .replace(
      /HIGHLIGHT_CYAN\((.*?)\)/g,
      '<span class="bg-cyan-200 dark:bg-cyan-800 px-1 text-black dark:text-white">$1</span>',
    )
    .replace(
      /BLUE_BOLD_2X\((.*?)\)/g,
      '<span class="text-blue-600 dark:text-blue-400 font-bold" style="font-size: 2em;">$1</span>',
    )
    .replace(
      /RED_BOLD_2X\((.*?)\)/g,
      '<span class="text-red-600 dark:text-red-400 font-bold" style="font-size: 2em;">$1</span>',
    )
    .replace(
      /BLACK_BOLD_2X\((.*?)\)/g,
      '<strong class="text-black dark:text-white" style="font-size: 2em;">$1</strong>',
    )

    // Original formatting rules, adjusted for size
    .replace(
      /\*\*(.*?)\*\*/g,
      '<span class="bg-yellow-200 dark:bg-yellow-800 px-1 font-medium text-black dark:text-white">$1</span>',
    ) // Yellow highlight for **text**
    .replace(/__(.*?)__/g, '<strong class="text-black dark:text-white">$1</strong>') // Bold for __text__
    .replace(/_(.*?)_/g, '<em class="text-black dark:text-white">$1</em>') // Italic for _text_

    // Request #3: Blue/Bold/2x for Questions
    .replace(/([^.!?]*\?)/g, '<span class="text-blue-600 dark:text-blue-400 font-bold" style="font-size: 2em;">$1</span>')

    // Request #2: Red/Bold/2x for Instructions
    .replace(
      /(PAUSE AND WAIT.*?!!!|WAIT FOR A RESPONSE.*?!!!|WAIT FOR AN ANSWER.*?!!!|PLEASE STAND BY.*?!!!|THEN GO BACK TO THE SCRIPT|END CALL.*|END THE CALL.*|STEPS TO FOLLOW NEXT:|TRY AND SET THE DATE.*|SCHEDULE APPOINTMENT.*)/gi,
      '<span class="text-red-600 dark:text-red-400 font-bold" style="font-size: 2em;">$1</span>',
    )

    // Request #10: Highlighter for Disposition
    .replace(
      /(END CALL-CALL DISPOSITION-.*?)(?=\n|<br|$)/gi,
      '<span class="bg-yellow-200 dark:bg-yellow-800 px-1 text-black dark:text-white">$1</span>',
    )

    // Line breaks
    .replace(/\n/g, "<br />")

  return `<div class="text-black dark:text-white text-base">
    ${formattedText}
  </div>`
}

// Replace placeholders in text with actual data
export function replacePlaceholders(text: string, data: any): string {
  if (!text) return ""

  // First, handle the problematic patterns directly with string replacement
  // This ensures these specific patterns are always replaced correctly
  let processedText = text

  // Handle (Lead.LastName) - exact string replacement
  const lastNameValue = data.lastName
    ? createEditableField("lastName", data.lastName)
    : createMissingPlaceholder("lastName", "Last Name")

  // Use a while loop to replace all occurrences
  while (processedText.includes("(Lead.LastName)")) {
    processedText = processedText.replace("(Lead.LastName)", lastNameValue)
  }
  // Also handle (Last_Name)
  while (processedText.includes("(Last_Name)")) {
    processedText = processedText.replace("(Last_Name)", lastNameValue)
  }

  // Handle (Lead.ZIP) - exact string replacement
  const zipValue = data.zip ? createEditableField("zip", data.zip) : createMissingPlaceholder("zip", "ZIP")

  // Use a while loop to replace all occurrences
  while (processedText.includes("(Lead.ZIP)")) {
    processedText = processedText.replace("(Lead.ZIP)", zipValue)
  }

  // Handle random digits - use the randomDigits from the data object
  // This will be set at the component level and passed down
  while (processedText.includes("(3.Random.Digits)")) {
    const randomDigitsValue = data.randomDigits
      ? createEditableField("randomDigits", data.randomDigits)
      : createMissingPlaceholder("randomDigits", "Random Digits")

    processedText = processedText.replace("(3.Random.Digits)", randomDigitsValue)
  }

  // For backward compatibility, also handle (3.Random.Numbers)
  while (processedText.includes("(3.Random.Numbers)")) {
    const randomDigitsValue = data.randomDigits
      ? createEditableField("randomDigits", data.randomDigits)
      : createMissingPlaceholder("randomDigits", "Random Digits")

    processedText = processedText.replace("(3.Random.Numbers)", randomDigitsValue)
  }

  // Create a mapping of placeholder patterns to data fields
  const placeholderMap = {
    // Lead/Caller data placeholders (using more specific regex to avoid partial matches)
    "\\(Lead\\.FirstName\\)": { field: "firstName", label: "First Name" },
    "\\(First_Name\\)": { field: "firstName", label: "First Name" },
    "\\(Lead\\.Address\\)": { field: "address", label: "Address" },
    "\\(Lead\\.City\\)": { field: "city", label: "City" },
    "\\(Lead\\.State\\)": { field: "state", label: "State" },
    "\\(Profile\\.FirstName\\)": { field: "firstName", label: "First Name" },
    "\\(Profile\\.LastName\\)": { field: "lastName", label: "Last Name" },
    "\\(Profile\\.First Name\\)": { field: "firstName", label: "First Name" },
    "\\(Appointment date and time\\)": { field: "appointment", label: "Appointment Date & Time" },

    // Agent data placeholders
    "\\(Agent\\.Name\\)": { field: "agentName", label: "Agent Name" },
    "\\(Agent\\.Company\\)": { field: "companyName", label: "Company Name" },
  }

  // Process each placeholder pattern
  for (const [pattern, info] of Object.entries(placeholderMap)) {
    const regex = new RegExp(pattern, "g")
    processedText = processedText.replace(regex, (match) => {
      const value = data[info.field]
      if (value && value.trim() !== "") {
        // Special handling for appointment
        if (info.field === "appointment") {
          return createEditableField(
            "appointment",
            `${data.appointmentDate || "Date"} at ${data.appointmentTime || "Time"}`,
          )
        }
        return createEditableField(info.field, value)
      } else {
        return createMissingPlaceholder(info.field, info.label)
      }
    })
  }

  // Handle special patterns that might not fit the map easily
  processedText = processedText
    // Replace "My name is ______ with" pattern
    .replace(
      /My name is ______ with/g,
      `My name is ${data.agentName ? createEditableField("agentName", data.agentName) : createMissingPlaceholder("agentName", "Agent Name")} with ${data.companyName ? createEditableField("companyName", data.companyName) : createMissingPlaceholder("companyName", "Company Name")}`,
    )
    // Replace "with ______ on" pattern
    .replace(
      /with ______ on/g,
      `with ${data.companyName ? createEditableField("companyName", data.companyName) : createMissingPlaceholder("companyName", "Company Name")} on`,
    )
    // Replace "Hello, is Mr._ available?" pattern
    .replace(
      /Hello, is Mr\._+ available\?/g,
      `Hello, is ${data.lastName ? createEditableField("lastName", `Mr. ${data.lastName}`) : createMissingPlaceholder("lastName", "Mr. Last Name")} available?`,
    )
    // Replace "Hello, is" pattern (more general case) - Be careful not to double-replace
    .replace(/Hello, is (.*?) available\?/g, (match, p1) => {
      if (p1.includes("Mr.") && p1.includes("editable-field")) return match // Already replaced
      if (p1.includes("Mrs.") && p1.includes("editable-field")) return match // Already replaced
      if (p1.includes("Mr._") || p1.includes("Mrs._")) {
        return `Hello, is ${data.lastName ? createEditableField("lastName", `Mr. ${data.lastName}`) : createMissingPlaceholder("lastName", "Mr. Last Name")} available?`
      }
      return match
    })
    // Replace "I have your name as" pattern (Profile)
    .replace(
      /I have your name as \$\$Profile\.FirstName\$\$ and your \$\$Profile\.LastName\$\$/g,
      `I have your name as ${data.firstName ? createEditableField("firstName", data.firstName) : createMissingPlaceholder("firstName", "First Name")} and your ${data.lastName ? createEditableField("lastName", data.lastName) : createMissingPlaceholder("lastName", "Last Name")}`,
    )
    // Replace "I have your name as" pattern (Lead)
    .replace(
      /I have your name as \$\$Lead\.FirstName\$\$ and your \$\$Lead\.LastName\$\$/g,
      `I have your name as ${data.firstName ? createEditableField("firstName", data.firstName) : createMissingPlaceholder("firstName", "First Name")} and your ${data.lastName ? createEditableField("lastName", data.lastName) : createMissingPlaceholder("lastName", "Last Name")}`,
    )
    // Replace address confirmation pattern
    .replace(
      /I have \$\$Address\$\$ \$\$City\$\$ \$\$State\$\$ \$\$Zip\$\$/g,
      `I have ${data.address ? createEditableField("address", data.address) : createMissingPlaceholder("address", "Address")} ${data.city ? createEditableField("city", data.city) : createMissingPlaceholder("city", "City")} ${data.state ? createEditableField("state", data.state) : createMissingPlaceholder("state", "State")} ${data.zip ? createEditableField("zip", data.zip) : createMissingPlaceholder("zip", "ZIP")}`,
    )
    // Replace "Well (Profile.First Name)" pattern
    .replace(
      /Well \$\$Profile\.First Name\$\$/g,
      `Well ${data.firstName ? createEditableField("firstName", data.firstName) : createMissingPlaceholder("firstName", "First Name")}`,
    )
    // Replace "Well (Lead.FirstName)" pattern
    .replace(
      /Well \$\$Lead\.FirstName\$\$/g,
      `Well ${data.firstName ? createEditableField("firstName", data.firstName) : createMissingPlaceholder("firstName", "First Name")}`,
    )

  // Replace remaining $$ placeholders with editable spans
  const replacedText = processedText
    // First Name
    .replace(
      /\$\$Profile\.FirstName\$\$|\$\$Profile\.First Name\$\$|\$\$Lead\.FirstName\$\$/g,
      data.firstName
        ? createEditableField("firstName", data.firstName)
        : createMissingPlaceholder("firstName", "First Name"),
    )
    // Last Name
    .replace(
      /\$\$Profile\.LastName\$\$|\$\$Profile\.Last Name\$\$|\$\$Lead\.LastName\$\$/g,
      data.lastName
        ? createEditableField("lastName", data.lastName)
        : createMissingPlaceholder("lastName", "Last Name"),
    )
    // Address
    .replace(
      /\$\$Address\$\$/g,
      data.address ? createEditableField("address", data.address) : createMissingPlaceholder("address", "Address"),
    )
    // City
    .replace(/\$\$City\$\$/g, data.city ? createEditableField("city", data.city) : createMissingPlaceholder("city", "City"))
    // State
    .replace(
      /\$\$State\$\$/g,
      data.state ? createEditableField("state", data.state) : createMissingPlaceholder("state", "State"),
    )
    // ZIP
    .replace(/\$\$Zip\$\$/g, data.zip ? createEditableField("zip", data.zip) : createMissingPlaceholder("zip", "ZIP"))
    // Agent Name
    .replace(
      /\$\$AgentName\$\$/g,
      data.agentName
        ? createEditableField("agentName", data.agentName)
        : createMissingPlaceholder("agentName", "Agent Name"),
    )
    // Company Name
    .replace(
      /\$\$CompanyName\$\$/g,
      data.companyName
        ? createEditableField("companyName", data.companyName)
        : createMissingPlaceholder("companyName", "Company Name"),
    )
    // Appointment date and time
    .replace(
      /\$\$Appointment date and time\$\$/g,
      data.appointmentDate && data.appointmentTime
        ? createEditableField("appointment", `${data.appointmentDate} at ${data.appointmentTime}`)
        : createMissingPlaceholder("appointment", "Appointment Date & Time"),
    )
    // Handle Mr./Mrs. with last name
    .replace(/Mr\._+/g, data.lastName ? `Mr. ${data.lastName}` : createMissingPlaceholder("lastName", "Mr. Last Name"))
    .replace(
      /Mrs\._+/g,
      data.lastName ? `Mrs. ${data.lastName}` : createMissingPlaceholder("lastName", "Mrs. Last Name"),
    )
    // Handle any remaining blank fields with underscores
    .replace(/______/g, createMissingPlaceholder("customField", "Fill in"))

  // Apply main formatting after placeholder replacement
  return formatText(replacedText)
}

// Create an editable field with data binding
function createEditableField(fieldName: string, value: string): string {
  // Ensure value is properly escaped to prevent XSS if contenteditable is misused, though React handles this better normally.
  // For dangerouslySetInnerHTML, basic escaping is wise.
  const escapedValue = value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return `<span
    class="editable-field px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 text-black dark:text-gray-800"
    data-field="${fieldName}"
    contenteditable="false"
    title="Field: ${fieldName}"
  >${escapedValue}</span>` // Set contenteditable to false, editing should happen in the CallerDataPanel
}

// Create a placeholder for missing data (red and underlined)
function createMissingPlaceholder(fieldName: string, label: string): string {
  const escapedLabel = label.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return `<span
    class="editable-field px-1 py-0.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 underline decoration-red-600 dark:decoration-red-400 rounded cursor-pointer hover:bg-red-200 dark:hover:bg-red-800"
    data-field="${fieldName}"
    contenteditable="false"
    title="Missing Field: ${fieldName}"
  >${escapedLabel}</span>` // Set contenteditable to false
}

// Format phone number as (XXX) XXX-XXXX
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return ""

  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "")

  // Check if the input is valid
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }

  // Allow partial input formatting
  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }
}

// Format date as MM/DD/YYYY
export function formatDate(date: string | Date): string {
  if (!date) return ""

  try {
    const parsedDate = typeof date === "string" ? new Date(date) : date
    // Check if parsedDate is valid
    if (isNaN(parsedDate.getTime())) {
      return typeof date === "string" ? date : "" // Return original string or empty if Date object was invalid
    }
    // Adjust for potential timezone issues by using UTC methods
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0")
    const day = String(parsedDate.getUTCDate()).padStart(2, "0")
    const year = parsedDate.getUTCFullYear()

    return `${month}/${day}/${year}`
  } catch (error) {
    return typeof date === "string" ? date : "" // Return original string or empty on error
  }
}

// Highlight search terms in text
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!text || !searchTerm) return text

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  return text.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-800">$1</span>')
}


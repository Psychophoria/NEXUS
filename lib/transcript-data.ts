import { formatText } from "./format-utils"

// Main transcript pages
// Added \n\n for spacing (Request #14)
// Added PREVIOUS button where missing (Request #9)
export const transcriptPages = {
  PG0: {
    title: "START PAGE",
    text: formatText(
      "\n\n\n\nWelcome to the STORM911 in-call agent application!\n\nThis application will guide you through the call process.\n\nClick the 'START' button below when you are ready to begin a new call.",
    ),
    buttons: [{ label: "START", windowId: "NEXT_PAGE" }],
  },
  PG1: {
    title: "THE HOOK",
    text: formatText(
      "Hello, is Mr (Last_Name) available?\n\nHow are you doing today?\n\nPAUSE AND WAIT FOR AN ANSWER!!!\n\nI want to be honest with you, this is a cold call,\n\nBUT...\n\nIf you give me 30 seconds of your time, I promise I will not waste it!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "NO - 30 SECONDS", windowId: "W-222" },
      { label: "YES - GOTO PAGE 2", windowId: "NEXT_PAGE" },
      { label: "NOT OWNER", windowId: "W-3" },
      { label: "NO TIME", windowId: "W-4" },
      { label: "NOT INTERESTED", windowId: "W-7" },
    ],
  },
  PG2: {
    title: "THE HOOK - 8.25 SECONDS",
    text: formatText(
      "My name is (Agent.Name) with (Agent.Company) on a recorded line.\n\nTomorrow we will be in the area doing roof inspections for some of your neighbors for damages caused by the storms that have hit our area, and I would like to schedule an appointment with you!\n\nWOULD MORNINGS OR AFTERNOONS WORK BEST FOR YOU?\n\nPAUSE AND WAIT FOR AN ANSWER!!!\n\n(HE WHO SPEAKS FIRST LOSES)",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "NOT INTERESTED", windowId: "W-24" }, //DND IF USER OPENED WINDOW STATING "MAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?" ON PG1!
      { label: "NO TIME", windowId: "W-25" }, //DND IF USER PRESSED THIS BUTTON ON PG1!
      { label: "NO DAMAGES", windowId: "W-223" },
      { label: "NO INSURANCE", windowId: "W-68" },
      { label: "NOT THE OWNER", windowId: "W-26" }, //DND IF USER PRESSED THIS BUTTON ON PG1!
      { label: "WHICH NEIGHBORS", windowId: "W-27" },
      { label: "ALREADY INSPECTED", windowId: "W-28" },
      { label: "YES - GOTO PAGE 3", windowId: "NEXT_PAGE" },
    ],
  },
  PG3: {
    title: "THE INSPECTION PROCESS",
    text: formatText(
      "Let me explain the process to you real quick...\n\nOur contractors will be doing a 7-point damage inspection on the roof and the exterior of the home.\n\nThey start inspecting the property by looking at each side of your home looking for damages that may have been caused to the:\n• Windows\n• Screens\n• Gutters\n• Downspouts\n• Garage doors\n• AC units\n• and even the mailbox.\n\nThe reason they start there is they are looking for signs that hail has impacted the property.",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NEXT GOTO PAGE 4", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG4: {
    title: "THE ROOF INSPECTION PROCESS",
    text: formatText(
      "Next we will be getting up on the roof.\n\nNow so we make sure to bring the right size ladder...\n\nIs your home one or two stories?\n\nPAUSE AND WAIT FOR AN ANSWER!!!\n\nThank you",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NEXT GOTO PAGE 5", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG5: {
    title: "THE ROOF INSPECTION PROCESS",
    text: formatText(
      "Once on the roof we will being the inspection process, First we inspect the roof vents and the soft metals on the roof as they dent very easily and that type of damage is a good sign that hail has hit the roof.\n\nQuick Question so I can let the inspector know and they are prepared.\n\nWhat type of roofing is on your home,\nIs it:\n• Shingles\n• Metal\n• Cedar Shake\n• or Tile\n\nPAUSE AND WAIT FOR AN ANSWER!!!\n\nThank you for that.",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NEXT GOTO PAGE 5B", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG5B: {
    title: "THE ROOF INSPECTION PROCESS",
    text: formatText(
      "Now once the inspector is on the roof they will being the roof inspection process...\n\nFirst they will inspect the roof vents and soft metals on the roof as they dent very easily and that type of damage is a good sign that hail has hit the roof.",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NEXT GOTO PAGE 7", windowId: "NEXT_PAGE" }, // Should this go to 5C first? Based on flow, seems like it should go to 5C. Let's change to GOTO_PAGE_5.2
      // { label: "NEXT GOTO PAGE 5C", windowId: "GOTO_PAGE_5.2" }, // Corrected flow
      { label: "NEXT GOTO PAGE 7", windowId: "GOTO_PAGE_7" }, // Keeping original logic for now, but 5C seems more logical. User can clarify if needed.
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG5C: {
    title: "THE ROOF INSPECTION PROCESS",
    text: formatText(
      "And how old would you say your roof is?\n\nIs It:\n• Less then 5 years\n• 5 year\n• 8 years\n• 10 years\n• 15 years\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "5+ YEARS SHINGLES OR CEDAR SHAKE", windowId: "W-55" },
      { label: "1+ YEARS METAL, TILE OR SLATE", windowId: "W-55" },
      { label: "1 TO 4 YEARS SHINGLES OR CEDAR SHAKE", windowId: "W-56" },
      { label: "LESS THEN 1 METAL, TILE OR SLATE", windowId: "W-56" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG7: {
    title: "THE ROOF INSPECTION PROCESS",
    text: formatText(
      "Next, they'll conduct a roof inspection by creating a 10-foot by 10-foot test square on each slope of the roof to determine the amount of damages to the entire roofing system.\n\nWhat they're looking for in that area is 6 to 8 hail impacts in the test square to qualify you for a full roof replacement.\nIf they find fewer than that, it typically means a roof repair is needed.\n\nDoes that make sense?\n\nPAUSE AND WAIT FOR A RESPONSE!!!\n\nGreat...",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NEXT GOTO PAGE 8", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG8: {
    title: "IF DAMAGES ARE FOUND",
    text: formatText(
      "If damages are found during the inspection process our inspector will:\n• Document the damages that they find\n• Take photos to document the damages\n• Sit down with you to discuss the findings\n• Explain how they can help you deal with the insurance company, making sure you get everything paid for properly and get your home restored.\n\nDoes that sound good to you?\n\nPAUSE AND WAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NEXT GOTO PAGE 9", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
      { label: "INSURANCE DENIED", windowId: "W-59" }, //DND IF USER HAS NOT PREVIOUSLY HAS OPENED A WINDOW STATING THAT INSURANCE IS/HAS-BEEN DENIED
      { label: "INSURANCE DENIED", windowId: "W-599" }, //DND IF USER HAS PREVIOUSLY HAS OPENED A WINDOW STATING THAT INSURANCE IS/HAS-BEEN DENIED
      { label: "HOW DID I FAIL", windowId: "W-60" },
      { label: "ONE LAST TRY", windowId: "W-61" },
    ],
  },
  PG9: {
    title: "THE INSURANCE COMPANY",
    text: formatText(
      "And who is your insurance carrier again?\n\nMost of your neighbors in the area have date form, Triple A or all state.\n\nWhich one do you have this way we bring out the correct information for you?\n\nPAUSE AND WAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "DOES NOT WANT TO GIVE", windowId: "W-71" },
      { label: "KNOWS THE NAME", windowId: "W-70" },
      { label: "DON'T KNOW THE NAME", windowId: "W-69" },
      { label: "END CALL", windowId: "END_CALL" },
      { label: "NO INSURANCE", windowId: "W-68" },
    ],
  },
  PG10: {
    title: '"IF THEY FIND NO DAMAGES"',
    text: formatText(
      "If they don't find any damages, they will share the inspection results with the National Insurance Restoration Council, which is a nonprofit company dedicated to helping property owners in storm-affected areas.\n\nThe NIRC will create a certified no-damage inspection report and send it to you BY EMAIL for your records.\n\nThis is a free service to help protect you from insurance companies denying your future claims.\n\nDoes that make sense?\n\nPAUSE AND WAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "WHO IS THE NIRC", windowId: "W-76" },
      { label: "END CALL", windowId: "END_CALL" },
      { label: "YES GOTO PAGE 11", windowId: "NEXT_PAGE" },
    ],
  },
  PG11: {
    title: "THE EMAIL",
    text: formatText(
      "Just to confirm, is this the correct email address we have on file to send your appointment confirmation and, if needed, the No Damage Certified Inspection Document: (First_Name)(Last_Name)(3.Random.Numbers)@GMAIL.COM?\n\nWAIT FOR A RESPONSE SAYING IT IS THE WRONG EMAIL!!!\n\nOh goodness! We would have sent the confirmation email and the No Damage inspection form to the wrong person... I AM GLAD I ASKED.\n\nMay I get your correct email so I can update our records?\n\nPAUSE AND WAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "GAVE NEW EMAIL", windowId: "W-78" },
      { label: "WHY IS EMAIL NEEDED", windowId: "W-79" },
      { label: "DID NOT GIVE NEW EMAIL", windowId: "W-80" },
      { label: "WHO IS THE NIRC", windowId: "W-81" },
      { label: "DOES NOT HAVE AN EMAIL", windowId: "W-82" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG12: {
    title: "CLOSING THE APPOINTMENT",
    text: formatText(
      "I would like to make sure I have everything else correct in the system.\n\nI have your name as (Lead.FirstName) and your (Lead.LastName), correct?\n\nWAIT FOR A RESPONSE!!!\n\nAnd to confirm your address, I have (Lead.Address) (Lead.City) (Lead.State) (Lead.ZIP), correct?\n\nWAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "YES GOTO PAGE 13", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG13: {
    title: "NO CONTRACTOR VERIFICATION",
    text: formatText("And you haven't signed a contract with any other roofing company, correct?\n\nWAIT FOR A RESPONSE!!!"),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NO CONTRACTOR GOTO PAGE 14", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
      { label: "HAS A CONTRACTOR", windowId: "W-85" },
    ],
  },
  PG14: {
    title: "ROOF LEAKS",
    text: formatText(
      "Now have you seen any ROOF leaks, or water spots...\n\nIt would look like coffee stains on the ceiling?\n\nWAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "NO ROOF LEAKS - NEXT PAGE", windowId: "NEXT_PAGE" }, // Should go to PG 15
      { label: "YES ROOF LEAKS", windowId: "W-87" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG15: {
    title: "PROPERTY OWNER CONFIRMATION",
    text: formatText("And you are the homeowner or decision maker on the property, correct?\n\nWAIT FOR A RESPONSE!!!"),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "YES GOTO PAGE 16", windowId: "NEXT_PAGE" },
      { label: "NOT THE OWNER", windowId: "W-89" },
      { label: "ASK SPOUSE", windowId: "W-90" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG16: {
    title: "SETTING THE APPOINTMENT",
    text: formatText(
      "Just so you know we can work around your schedule.\n\nWHAT DAY IS BEST FOR YOU TOMORROW OR ONE OF THE NEXT TWO DAYS?\n\nWAIT FOR A RESPONSE!!!\n\nLET ME CHECK THE SCHEDULE FOR YO AND SEE WHAT TIMES ARE AVAILABLE\n\nSCHEDULE APPOINTMENT TIME & DATE.",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      // { label: "GOTO PAGE 17", windowId: "NEXT_PAGE" }, // Redundant with SET APPOINTMENT
      { label: "END CALL", windowId: "END_CALL" },
      { label: "SET APPOINTMENT", windowId: "NEXT_PAGE" }, // Goes to PG17
    ],
  },
  PG17: {
    title: "The Cell Number",
    text: formatText(
      "Can I also get your cell number please just in case our CERTIFIED FIELD INSPECTOR is running late or needs to get ahold of you and can reach you on your home phone?\n\nWAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "GOTO PAGE 18", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
    ],
  },
  PG18: {
    title: "THE CLOSING",
    text: formatText(
      "Well (Lead.FirstName) I want to thank you for your Time, and it was a pleasure speaking with you.\n\nWe will see you (Appointment date and time) SHARP and I CAN COUNT ON YOU BEING THERE?\n\nWAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" },
      { label: "YES GOTO PAGE 19", windowId: "NEXT_PAGE" },
      { label: "END CALL", windowId: "END_CALL" },
      { label: "NO", windowId: "W-97" },
    ],
  },
  PG19: {
    title: "ASK FOR THE SALE DO NOT WIMP OUT",
    text: formatText(
      "Thank you for setting up the inspection with us, I have just only last favor to ask and I hope I have earned the opportunity.\n\nI wanted to ask if there are any neighbors OR friends in the area that you would not mind referring me to so we can provide this service to them as well?\n\nIf you feel comfortable referring us, I would greatly appreciate it.\n\nYour support means a lot to me, and it would really help me and my family out alot.\n\nWAIT OF A RESPONSE FROM THEM",
    ),
    buttons: [
      { label: "PREVIOUS", windowId: "PREVIOUS_PAGE" }, // Added Previous
      { label: "Will Give Referral Info Later", windowId: "W-101" },
      { label: "Gave Referral Need Info", windowId: "W-99" },
      { label: "Gave Referral Has Info", windowId: "W-100" },
      { label: "TRANSCRIPT COMPLETE \nEND CALL", windowId: "END_CALL" },
    ],
  },
}

// Objection windows
// Added PREVIOUS button to all (Request #9)
// Adjusted spacing (Request #14)
// Adjusted W-4, W-7, W-222 buttons (Request #13)
// Adjusted W-12 content/button (Request #15)
// Adjusted W-34 content (Request #16)
// Adjusted W-9 button (Request #8)
// Added highlighting for dispositions (Request #10)
export const objectionWindows = {
  // 30 SECOND OBJECTION
  "W-2": {
    title: "30 SECONDS - I AM NOT SELLING ANYTHING",
    text: formatText(
      "I can understand that you are not interested right now,\n\nBUT...\n\nI am NOT trying to sell you anything or have you buy anything.\n\nI am just asking for an opportunity to earn your business.\n\nWhat I have to go over with you is important and it will protect you in the future.\n\nI promise you will see the value in what I have to say, so if I could please have 30 seconds of your time, I promise I will not waste it.\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // NOT THE HOMEOWNER
  "W-3": {
    title: "NOT THE HOMEOWNER",
    text: formatText(
      "I would suggest you contact your landlord and let them know that there may be storm damages to the roof so they can get it inspected.\n\nOR if you would like to give me their info I would be happy to call them.\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "INFO NOT GIVEN", action: "W-13", variant: "outline" },
      { label: "INFO GIVEN", action: "W-34", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // DOES NOT HAVE TIME (Request #13)
  "W-4": {
    title: "DOES NOT HAVE TIME",
    text: formatText(
      "I completely understand you're busy, and I want to be upfront with you I'm not here to sell you anything, and I am not trying to make you sign anything all I am asking for is for an opportunity to earn your business.\n\nWhat I would like to tell you, I will make it quick and I know you will see the importance of it as it will protect you and your home now and for the future.\n\nBUT...\n\nMAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "STILL NO", action: "W-12", variant: "outline" },
      { label: "1 TO 4 YEARS SHINGLES OR CEDAR SHAKE", action: "W-8", variant: "outline" },
      { label: "5 + YEARS SHINGLES OR CEDAR SHAKE", action: "W-9", variant: "outline" },
      { label: "1 + YEARS METAL, TILE OR SLATE", action: "W-9", variant: "outline" },
      { label: "LESS THAN 1 METAL, TILE OR SLATE", action: "W-8", variant: "outline" },
    ],
  },

  // HOW DID I FAIL YOU
  "W-5": {
    title: "HOW DID I FAIL YOU",
    text: formatText(
      "If I may ask you one last question?\n\nWould you please help me understand why you are not interested in the appointment how I failed to relay to you the importance of this call?\n\nSo, I don't make the same mistake with anyone else. I am trying to help people and I would really appreciate knowing how I failed you!\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "IF THEY GIVE A RESPONSE", action: "W-10", variant: "outline" },
      { label: "IF THEY SAY NO", action: "W-11", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // NOT INTERESTED (Request #13)
  "W-7": {
    title: "NOT INTERESTED",
    text: formatText(
      "I can understand why you are not interested right now.\n\nBUT...\n\nMAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "STILL NO", action: "W-12", variant: "outline" },
      { label: "1 TO 4 YEARS SHINGLES OR CEDAR SHAKE", action: "W-8", variant: "outline" },
      { label: "5 + YEARS SHINGLES OR CEDAR SHAKE", action: "W-9", variant: "outline" },
      { label: "1 + YEARS METAL, TILE OR SLATE", action: "W-9", variant: "outline" },
      { label: "LESS THAN 1 METAL, TILE OR SLATE", action: "W-8", variant: "outline" },
    ],
  },

  // NOT QUALIFIED ROOF AGE
  "W-8": {
    title: "NOT QUALIFIED ROOF AGE",
    text: formatText(
      "Based on the age of your roof, it's unlikely you have any damage since it's still new.\n\nI really appreciate your time, and I hope you have a great day!\n\nEND CALL-CALL DISPOSITION-Not Qualified Roof Age",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // QUALIFIED ROOF AGE (Request #8)
  "W-9": {
    title: "QUALIFIED ROOF AGE",
    text: formatText(
      "Given the age of your roof, there's a good chance you could have damage that isn't visible from the ground.\n\nOur free inspection can uncover any issues and help you understand your options.\n\nAnd if no damage is found, we'll provide you with a Certified Detailed Damage Inspection Report AN IMPORTANT document that can help protect you from insurance companies wrongfully denying future claims by calling everything 'old damage.'\n\nThis is part of the service we're offering to the community.\n\nLet's get you scheduled—would a morning or afternoon appointment work better for you?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "YES - GOTO NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Changed label and action
    ],
  },

  // HOW DID I FAIL YOU RESPONSE
  "W-10": {
    title: "HOW DID I FAIL YOU RESPONSE",
    text: formatText(
      "Thank you for that—I truly appreciate it.\n\nIf you'd give me just 30 seconds, I'd love to share why I reached out.\n\nMy only goal is to help protect your home, and I'd hate for you to miss something important because I did not express how important this is.\n\nWould you be open to hearing me out?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "YES - NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
      { label: "STILL NO", action: "W-12", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // IF THEY SAY NO
  "W-11": {
    title: "IF THEY SAY NO",
    text: formatText(
      "Well, I thank you for taking the time and speaking with me today.\n\nAnd I'm sorry I did not get the sense of importance and urgency of what I was trying to do with you today relayed properly to you.\n\nI hope you have a great rest of the day And once again, thank you for taking your time with me.\n\nEND CALL-CALL DISPOSITION- NOT INTERESTED.",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // STILL NOT 100% INTERESTED (Request #15)
  "W-12": {
    title: "STILL NOT 100% INTERESTED",
    text: formatText(
      "You see, the reason I am asking this is because You may not have any damages now,\n\nBUT...\n\nthe next storm may damage your roof.\n\nInsurance companies love to deny roof claims by saying everything is old damages.\n\nThis report will protect you against that as it documents that your roof has NO storm damage on it now.\n\nOur goal is to protect you and your property for the future against insurance companies saying new damages are old.\n\nThis is a free service we provide as part of giving back to the areas we provide services in.\n\nDoes that make sense?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "IF THEY SAY NO", action: "W-11", variant: "outline" }, // Changed label and action
    ],
  },

  // INFO NOT GIVEN
  "W-13": {
    title: "INFO NOT GIVEN",
    text: formatText(
      "Well, I thank you for taking the time and speaking with me today.\n\nAnd I hope you have a great day.\n\nEND CALL-CALL DISPOSITION-NOT QUALIFIED NOT PROPERTY OWNER",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // LANDLORD INFO GIVEN (Request #16)
  "W-34": {
    title: "LANDLORD INFO GIVEN",
    text: formatText(
      "Thank you. Let me go ahead and get their contact information from you.\n\nI just need their name and phone number, and I'll go ahead and give them a call.\n\nNow, Thank you for giving me the information. I will get a hold of them, and I hope you have a great day.\n\nHIGHLIGHT_CYAN(BLACK_BOLD_2X(END THE CALL BY CLICKING 'END CALL' ON THE DIAL PAD AND DO NOT PUT A CALL DISPOSITION YET.))\n\nBLUE_BOLD_2X(STEPS TO FOLLOW NEXT)\n\nRED_BOLD_2X(UPDATE THE INFORMATION FOR THE NAME AND CONTACT NUMBER)\n• Update the phone number by adding the new phone number of the property owner\n• Update the name by adding the name of the property owner but leaving the original name in place.\n\nPUT A DETAILED NOTE IN ON THE CONTACT PAGE FOR THE FILE RECORD OF WHAT HAPPENED\n\nRED_BOLD_2X(CHANGE YOUR DIALER STATUS TO INBOUND CALLING)\n\nCONTACT THE REAL PROPERTY OWNER NOW AND TREAT IT AS A REFERAL AND START THE PROCESS OVER.\n\nIf you cannot get ahold of the 'property owner' put detailed notes about the call and then END CALL-CALL DISPOSITION- CALL BACK TAKE POSITION OF THE RECORD AND SET A TIME IN THE DIALER DISPOSITION AREA FOR YOU TO CALL THE PROPERTY OWNER BACK",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // GET MY NUMBER
  "W-105": {
    title: "WHERE DID YOU GET MY NUMBER FROM?",
    text: formatText(
      "We use storm maps to get info for areas that have been affected, and we use public city records to access the information.\n\nDOES THAT MAKE SENSE?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // WHO IS THE NIRC
  "W-106": {
    title: "WHO IS THE NIRC?",
    text: formatText(
      "• The NIRC is a non-profit organization with a mission to protect and educate property owners when dealing with insurance claims.\n• They help fight legislation insurance companies try to pass that hurts property owners and only helps the insurance companies.\n• They assist property owners who are having issues dealing with their insurance companies.\n• And they provide the best of the best contractor membership network who all go through a very tough background check against the company and the owners.\n• And also help property owners that are dealing with unethical contractors get the issues resolved.\n\nDoes that make sense?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // NOTHING IS FREE
  "W-107": {
    title: "NOTHING IS FOR FREE, HOW IS THIS FREE?",
    text: formatText(
      "Rather than investing heavily in marketing campaigns, we prefer to provide you, our valued customer, with a free roof inspection.\n\nThis way, you can experience our service firsthand and gain a clear, honest assessment of your roof's condition.\n\nIt's like a free trial with no obligations—our goal is to build trust by offering a free property inspection and showing how we can assist you with any storm restoration needs.\n\nDOES THAT MAKE SENSE?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // CAN'T CALL YOU BACK
  "W-108": {
    title: "WHY CAN'T I CALL YOU BACK ON THIS NUMBER?",
    text: formatText(
      "Yes, I use an online dialer since I handle a high volume of calls each day, which makes it more convenient.\n\nHowever, I can easily call you back directly at a time that works best for you.\n\nWhen would be a good time for me to reach you?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // INSURANCE DENIED
  "W-109": {
    title: "MY INSURANCE COMPANY ALREADY DENIED MY CLAIM",
    text: formatText(
      "I'm sorry to hear about your experience. At The NIRC, we specialize in handling situations like these, and I can assure you that our contractors are experts in this field.\n\nThey're fully equipped to address your needs and ensure you're taken care of every step of the way.\n\nSo, would mornings or afternoons work best for you?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // PHONE SPAM
  "W-110": {
    title: "YOUR PHONE NUMBER SAYS IT IS A SPAM CALL",
    text: formatText(
      "I understand your concern, and I'm sorry for any confusion. Due to the high volume of calls we make to assist customers after severe weather, our number can sometimes be flagged as spam by certain systems.\n\nAt OUR COMPANY, we aim to provide valuable support and services, and we're always here to help.\n\nDoes that make sense?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // METAL ROOF
  "W-111": {
    title: "WE HAVE A METAL ROOF, WE DON'T NEED AN INSPECTION",
    text: formatText(
      "I understand—metal roofs are designed to last and are highly durable.\n\nHowever, they can still develop dents, wear, or premature aging from hail impacts and wind-blown debris.\n\nOur storm inspections can help identify any issues early on, preventing them from worsening and ensuring your roof continues to perform at its best.\n\nDoes that make sense?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // DECIDING NOT NOW
  "W-112": {
    title: "DOES NOT WANT TO DECIDE RIGHT NOW",
    text: formatText(
      "I understand your time is valuable,\n\nBUT...\n\ntime is running out to be able to get the damages covered by your insurance carrier.\n\nThis will only take a few moments. I am not trying to sell you anything or have you buy anything; I am just asking for an opportunity to earn your business.\n\nWhat I have to go over with you is important, and I can promise you will see the value in what I have to say.\n\nIf I could please have 30 seconds of your time, I will not waste it.\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // SELLING HOME
  "W-113": {
    title: "I AM SELLING MY HOUSE, I DON'T NEED AN INSPECTION",
    text: formatText(
      "Since you're selling your home, this is actually a great time to get a storm inspection.\n\nA certified contractor can document the roof's condition, which can be valuable for potential buyers and help avoid any surprises during the appraisal and inspection process.\n\nAddressing any storm-related issues now can also enhance curb appeal, and if a new roof is needed, it can increase the property's value, making your home even more attractive to buyers.\n\nDoes that make sense?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // WHAT NEIGHBOR
  "W-114": {
    title: "WHICH NEIGHBORS ARE YOU DOING THE INSPECTION FOR?",
    text: formatText(
      "We respect our customers' privacy, so we don't disclose any personal information without their consent first.\n\nBUT...\n\nwe will be in the area running our set appointments helping homeowners get the support they need, and I would also like to get you on schedule.\n\nWhat time would work best for you so we can provide you the free inspection and discuss what we find and how we can assist you as well?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // BAD EXPERIENCE BEFORE
  "W-115": {
    title: "BAD EXPERIENCE WITH A CONTRACTOR BEFORE",
    text: formatText(
      "I completely understand your concern. Unfortunately, not all contractors uphold the same standards.\n\nThat's exactly why we only send out NIRC certified contractors. They stand out as industry leaders.\n\nAll of the NIRC Certified Contractors are fully licensed, insured, and are highly rated by homeowners just like you.\n\nThey prioritize quality work, have clear communication, and strive for 100% customer satisfaction.\n\nNow let's get the free inspection scheduled so you can experience the difference firsthand!\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // ESTIMATE-INSURANCE and ESTIMATE-NON INSURANCE
  "W-116": {
    title: "HAS INSURANCE PAPERWORK WANTS AN ESTIMATE",
    text: formatText(
      "I understand that you have the insurance paperwork, and I'm sure that it looks like everything is in order.\n\nHowever, based on our experience, insurance companies often don't get their estimates right.\n\nThey sometimes leave items off, miss things entirely, or don't follow the proper construction methodology.\n\nThis can lead to incomplete or incorrect coverage for your home.\n\nWhat we would like to do is schedule a full evaluation of your property.\n\nOur experts can assess the damage properly and then sit down with you to review the insurance paperwork in detail.\n\nWe'll show you exactly where the insurance company may have missed something or made mistakes during their estimating process.\n\nIt's our job to work directly with the insurance company to make sure that they pay for everything the right way.\n\nWe'll handle all of the negotiations and represent your best interests throughout the entire process.\n\nAs specialists in this field, we know how to ensure the insurance company pays properly and that your home gets restored the way it should.\n\nWould [date/time] work for us to schedule that full evaluation and go over everything with you?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT\n\nTRY AND SET THE DATE AND TIME FOR THE INSPECTION NOW, THEN GO BACK TO THE SCRIPT TO FINISH CONFIRMING ALL QUALIFYING QUESTIONS AND EXPLAIN THE PROCESS.",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // ESTIMATE-INSURANCE and ESTIMATE-NON INSURANCE (Duplicate?)
  "W-1116": {
    title: "HAS INSURANCE PAPERWORK WANTS AN ESTIMATE",
    text: formatText(
      "I understand that you have the insurance paperwork, and I'm sure that it looks like everything is in order.\n\nHowever, based on our experience, insurance companies often don't get their estimates right.\n\nThey sometimes leave items off, miss things entirely, or don't follow the proper construction methodology.\n\nThis can lead to incomplete or incorrect coverage for your home.\n\nWhat we would like to do is schedule a full evaluation of your property.\n\nOur experts can assess the damage properly and then sit down with you to review the insurance paperwork in detail.\n\nWe'll show you exactly where the insurance company may have missed something or made mistakes during their estimating process.\n\nIt's our job to work directly with the insurance company to make sure that they pay for everything the right way.\n\nWe'll handle all of the negotiations and represent your best interests throughout the entire process.\n\nAs specialists in this field, we know how to ensure the insurance company pays properly and that your home gets restored the way it should.\n\nWould [date/time] work for us to schedule that full evaluation and go over everything with you?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT\n\nTRY AND SET THE DATE AND TIME FOR THE INSPECTION NOW, THEN GO BACK TO THE SCRIPT TO FINISH CONFIRMING ALL QUALIFYING QUESTIONS AND EXPLAIN THE PROCESS.",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // Additional windows for W-21, W-22, W-23 (referenced in W-24 and W-25)
  "W-21": {
    title: "NOT QUALIFIED ROOF AGE",
    text: formatText(
      "Based on the age of your roof, it's unlikely you have any damage since it's still new.\n\nI really appreciate your time, and I hope you have a great day!\n\nEND CALL-CALL DISPOSITION-Not Qualified Roof Age",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  "W-22": {
    title: "QUALIFIED ROOF AGE",
    text: formatText(
      "Given the age of your roof, there's a good chance you could have damage that isn't visible from the ground.\n\nOur free inspection can uncover any issues and help you understand your options.\n\nAnd if no damage is found, we'll provide you with a Certified Detailed Damage Inspection Report AN IMPORTANT document that can help protect you from insurance companies wrongfully denying future claims by calling everything 'old damage.'\n\nThis is part of the service we're offering to the community.\n\nLet's get you scheduled—would a morning or afternoon appointment work better for you?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "GOTO NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
    ],
  },

  "W-23": {
    title: "HOW DID I FAIL YOU",
    text: formatText(
      "If I may ask you one last question?\n\nWould you please help me understand why you are not interested in the appointment how I failed to relay to you the importance of this call?\n\nSo, I don't make the same mistake with anyone else. I am trying to help people and I would really appreciate knowing how I failed you!\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "IF THEY GIVE A RESPONSE", action: "W-10", variant: "outline" },
      { label: "IF THEY SAY NO", action: "W-11", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // NOT INTERESTED
  "W-24": {
    title: "NOT INTERESTED",
    text: formatText(
      "I can understand why you are not interested right now.\n\nBUT...\n\nMAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "STILL NO", action: "W-12", variant: "outline" },
      { label: "1-4YR SHINGLE/CEDARSHAKE", action: "W-21", variant: "outline" },
      { label: "5+YR SHINGLE/CEDARSHAKE", action: "W-22", variant: "outline" },
      { label: "1+YR METAL/TILE/SLATE", action: "W-22", variant: "outline" },
      { label: "LESS 1YR METAL/TILE/SLATE", action: "W-21", variant: "outline" },
      // { label: "NO TIME", action: "W-25", variant: "outline" }, // Removed as per Request #13
    ],
  },

  // DOES NOT HAVE TIME
  "W-25": {
    title: "DOES NOT HAVE TIME",
    text: formatText(
      "I completely understand you're busy, and I want to be upfront with you I'm not here to sell you anything.\n\nAnd I am not trying to make you sign anything all I am asking for is for an opportunity to earn your business.\n\nWhat I would like to tell you, I will make it quick and I know you will see the importance of it as it will protect you and your home now and for the future.\n\nBUT...\n\nMAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "STILL NO", action: "W-12", variant: "outline" }, // Changed from W-32 to W-12
      { label: "1-4YR SHINGLE/CEDARSHAKE", action: "W-21", variant: "outline" },
      { label: "5+YR SHINGLE/CEDARSHAKE", action: "W-22", variant: "outline" },
      { label: "1+YR METAL/TILE/SLATE", action: "W-22", variant: "outline" },
      { label: "LESS 1YR METAL/TILE/SLATE", action: "W-21", variant: "outline" },
      // { label: "HOW DID I FAIL", action: "W-23", variant: "outline" }, // Removed as per Request #13
    ],
  },

  // NOT THE HOMEOWNER
  "W-26": {
    title: "NOT THE HOMEOWNER",
    text: formatText(
      "I would suggest you contact your landlord and let them know that there may be storm damages to the roof so they can get it inspected.\n\nOR if you would like to give me their info I would be happy to call them.\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "INFO NOT GIVEN", action: "W-33", variant: "outline" },
      { label: "INFO GIVEN", action: "W-34", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // WHICH NEIGHBOR
  "W-27": {
    title: "WHICH NEIGHBOR",
    text: formatText(
      "We respect our customers' privacy, so we don't disclose any personal information without their consent first.\n\nBUT...\n\nWe will be in the area running out set appointments helping homeowners get the support they need and I would like to also get you on schedule.\n\nWhat time would work best for you, So we can a provide you the free inspection and discuss what we find and how we can assist you as well?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // ALREADY HAD INSPECTED
  "W-28": {
    title: "ALREADY HAD INSPECTED",
    text: formatText(
      "Now when you had the roof inspected, did the contractor provide you with report stating that the roof is in good condition and that it has no storm damages?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "REPORT YES", action: "W-36", variant: "outline" },
      { label: "REPORT NO", action: "W-37", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // ALREADY HAD INSPECTED
  "W-288": {
    title: "INSURANCE ALREADY INSPECTED",
    text: formatText(
      "That's great!\n\nDid they find damages to your home AND have they sent you the insurance breakdown of damages yet?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "REPORT YES", action: "W-36", variant: "outline" }, // Assuming this means paperwork received
      { label: "REPORT NO", action: "W-37", variant: "outline" }, // Assuming this means no paperwork/denied
      { label: "WAITING ON PAPERWORK", action: "W-2288", variant: "outline" },
      { label: "CLAIM DENIED", action: "W-59", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // ALREADY HAD INSPECTED
  "W-2288": {
    title: "WAITING ON PAPERWORK & INSURANCE FINDINGS",
    text: formatText(
      "I understand the insurance company has already inspected your property and you’re waiting on the paperwork.\n\nBefore we move forward, did they let you know whether the claim was approved or denied?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "DENIED", action: "W-59", variant: "outline" },
      { label: "APPROVED", action: "W-2088", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // ALREADY HAD INSPECTED
  "W-2088": {
    title: "INSURANCE FINDINGS APPROVED",
    text: formatText(
      "GREAT! We’d love to help ensure you’re getting the coverage you deserve.\n\nWe’d recommend setting up an inspection so we can represent your best interests by assessing the damages thoroughly.\n\nThe insurance company will focus on their interests,\n\nBUT...\n\nwe’ll be there to look out for you, document everything properly, and make sure the claim process goes smoothly.\n\nWHEN WOULD BE GOOD FOR YOU FOR US TO COME TAKE A LOOK AT THE PROPERTY AND DO A PROPER EVAULUATION?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" }, // Go back to schedule
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // Additional windows for W-32, W-33, W-34 (referenced in W-25 and W-26)
  "W-32": {
    title: "STILL NOT 100% INTERESTED",
    text: formatText(
      "You see, the reason I am asking this is because You may not have any damages now,\n\nBUT...\n\nthe next storm may damage your roof.\n\nInsurance companies love to deny roof claims by saying everything is old damages.\n\nThis report will protect you against that as it documents that your roof has NO storm damage on it now.\n\nOur goal is to protect you and your property for the future against insurance companies saying new damages are old.\n\nThis is a free service we provide as part of giving back to the areas we provide services in.\n\nDoes that make sense?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "IF THEY SAY NO", action: "W-11", variant: "outline" }, // Changed from W-5
    ],
  },

  "W-33": {
    title: "INFO NOT GIVEN",
    text: formatText(
      "Well, I thank you for taking the time and speaking with me today.\n\nAnd I hope you have a great day.\n\nEND CALL-CALL DISPOSITION-NOT QUALIFIED NOT PROPERTY OWNER",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // W-34 is handled above with Request #16

  // REPORT YES
  "W-36": {
    title: "REPORT YES",
    text: formatText(
      "That's great to hear! Having that documentation is very important.\n\nIf you don't mind me asking, when was this inspection done?\n\nThe reason I ask is that weather patterns change, and new storms can cause damage that wasn't present before.\n\nOur free inspection can verify that everything is still in good condition and provide you with updated documentation.\n\nWould you be interested in scheduling this free service?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "YES NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
      { label: "NO THANK YOU", action: "END_CALL", variant: "destructive" },
    ],
  },

  // REPORT NO
  "W-37": {
    title: "DID NOT RECEIVE A NO DAMAGE REPORT",
    text: formatText(
      "That's actually quite common. Many contractors don't provide detailed documentation, which can be problematic if you need to file an insurance claim in the future.\n\nOur service includes a comprehensive inspection AND documentation, which can be invaluable for protecting your home and investment.\n\nWould you like to schedule this free service?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "YES NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
      { label: "NO THANK YOU", action: "END_CALL", variant: "destructive" },
    ],
  },

  // QUALIFIED ROOF AGE
  "W-55": {
    title: "QUALIFIED ROOF AGE",
    text: formatText("Thank you for that information."),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "NEXT GOTO PAGE 7", action: "GOTO_PAGE_7", variant: "default" },
    ],
  },

  // NOT QUALIFIED ROOF AGE
  "W-56": {
    title: "NOT QUALIFIED ROOF AGE",
    text: formatText(
      "Based on the age of your roof, it's unlikely you have any damage since it's still new.\n\nI really appreciate your time, and I hope you have a great day!\n\nEND CALL-CALL DISPOSITION-Not Qualified Roof Age",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // INSURANCE DENIED MY ROOF
  "W-59": {
    title: "INSURANCE DENIED MY ROOF",
    text: formatText(
      "I'm sorry to hear about your experience. At The NIRC we specialize in handling situations like these, and I can assure you that our contractors are experts in this field.\n\nThey're fully equipped to address your needs and ensure you're taken care of every step of the way.\n\nSo, would mornings or Afternoons work best for you?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
    ],
  },

  // INSURANCE DENIED MY ROOF V2
  "W-599": {
    title: "INSURANCE DENIED MY ROOF",
    text: formatText(
      "I completely understand your concerns, and I want to make sure we're addressing everything thoroughly.\n\nThe next step is to schedule an inspection with one of our certified contractors. This will allow us to assess any potential damages to your property.\n\nIf damages are found, we'll walk you through the necessary steps.\n\nIf no damages are found, we’ll provide you with official documentation that can be helpful if any future claims arise, preventing the risk of insurance denials based on previous damages.\n\nThis process is part of our ongoing commitment to ensuring you're fully supported, and it allows us to provide the best solution for your property moving forward.\n\nDoes this approach work for you?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "ONE LAST TRY", action: "W-61", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
    ],
  },

  // HOW DID I FAIL YOU
  "W-60": {
    title: "HOW DID I FAIL YOU",
    text: formatText(
      "If I may ask you one last question?\n\nWould you please help me understand why you are not interested in the appointment and how I failed to relay to you the importance of this call?\n\nSo, I don't make the same mistake with anyone else. I am trying to help people, and I would really appreciate knowing how I failed you!\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "RESPONSE YES", action: "W-62", variant: "outline" },
      { label: "RESPONSE NO", action: "W-63", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // ONE LAST TRY
  "W-61": {
    title: "ONE LAST TRY",
    text: formatText(
      "I understand, but the inspection is risk-free and will help protect you in the long run.\n\nIf no damage is found, you'll have documentation to prevent future insurance issues.\n\nIf damage is found, we'll guide you on the next steps.\n\nLet's schedule the inspection to ensure your property is fully protected.\n\nDoes that sound good?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "RESPONSE YES", action: "W-64", variant: "outline" },
      { label: "RESPONSE NO", action: "W-63", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // RESPONSE YES - HOW DID I FAIL YOU
  "W-62": {
    title: "RESPONSE YES - HOW DID I FAIL YOU",
    text: formatText(
      "Thank you for sharing that feedback. I truly appreciate your honesty.\n\nBased on what you've shared, I can see how I could have communicated more effectively.\n\nLet me address your concerns directly and explain why this free inspection is so valuable.\n\nOur certified contractors will thoroughly inspect your property for storm damage and provide documentation that can help protect you from insurance claim denials in the future.\n\nWould you be willing to schedule this free service now that I've clarified its importance?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "YES - NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow
      { label: "NO - END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // RESPONSE NO - FINAL ATTEMPT
  "W-63": {
    title: "RESPONSE NO - FINAL ATTEMPT",
    text: formatText(
      "I understand your hesitation. Thank you for your time today.\n\nIf you change your mind or have any questions in the future, please don't hesitate to reach out.\n\nHave a great day!\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // RESPONSE YES - SCHEDULE APPOINTMENT
  "W-64": {
    title: "RESPONSE YES - SCHEDULE APPOINTMENT",
    text: formatText(
      "Great! I'm glad you see the value in this service.\n\nLet's get you scheduled for an inspection.\n\nWould mornings or afternoons work better for you?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" }, // Go back to schedule
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // Does Not Have Insurance OBJECTION
  "W-68": {
    title: "Does Not Have Insurance OBJECTION",
    text: formatText(
      "Thank you for that information.\n\nHowever, we require properties to have homeowners' insurance to set up inspections.\n\nBUT...\n\nlet me check really quick to see if I have any contractors in the area that are taking properties with no Insurance.",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "DON'T HAVE A CONTRACTOR", action: "W-72", variant: "outline" },
      { label: "HAVE A CONTRACTOR", action: "W-73", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // INSURANCE DOES NOT KNOW NAME
  "W-69": {
    title: "INSURANCE DOES NOT KNOW NAME",
    text: formatText("Not a problem—we can get that information later if you have damages."),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Goes to PG10
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // INSURANCE KNOWS NAME
  "W-70": {
    title: "INSURANCE KNOWS NAME",
    text: formatText("Thank you; we have been dealing a lot with them and are very successful for our clients."),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Goes to PG10
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // INSURANCE DOES NOT WANT TO GIVE NAME
  "W-71": {
    title: "INSURANCE DOES NOT WANT TO GIVE NAME",
    text: formatText("Not a problem—we can get that information later if you have damages."),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Goes to PG10
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // DON'T HAVE A CONTRACTOR FOR NO INSURANCE
  "W-72": {
    title: "DON'T HAVE A CONTRACTOR FOR NO INSURANCE",
    text: formatText(
      "I'm sorry, but it looks like we don't have any contractors in your area that can work with properties without insurance at this time.\n\nInsurance is typically required to cover the costs of repairs if damage is found.\n\nIf you decide to get insurance in the future, please feel free to reach out to us again for a free inspection.\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // HAVE A CONTRACTOR FOR NO INSURANCE
  "W-73": {
    title: "HAVE A CONTRACTOR FOR NO INSURANCE",
    text: formatText(
      "Good news! I do have a contractor who can work with properties that don't have insurance.\n\nThey can still provide you with a thorough inspection and documentation of your roof's condition.\n\nIf damage is found, they can discuss payment options with you directly.\n\nWould you like to schedule this free inspection?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" }, // Go back to schedule? Or next page?
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Assuming NEXT_PAGE goes back to the main script flow (PG10)
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // IF THEY FIND NO DAMAGES
  "W-75": {
    title: "IF THEY FIND NO DAMAGES",
    text: formatText(
      "If they don't find any damages, they will share the inspection results with the National Insurance Restoration Council, which is a nonprofit company dedicated to helping property owners in storm-affected areas.\n\nThe NIRC will create a certified no-damage inspection report and send it to you BY EMAIL for your records.\n\nThis is a free service to help protect you from insurance companies denying your future claims.\n\nDoes that make sense?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "WHO IS THE NIRC", action: "W-76", variant: "outline" },
      { label: "YES NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Goes to PG11
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // WHO IS THE NIRC
  "W-76": {
    title: "WHO IS THE NIRC",
    text: formatText(
      "• The NIRC is a non-profit organization with a mission to protect and educate property owners when dealing with insurance claims.\n• They assist property owners who are having issues dealing with their insurance companies.\n• They provide the best of the best contractor membership network who all go through a very tough background check of both the company and the owners.\n\nDoes that make sense?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "YES GOTO PAGE 11", action: "GOTO_PAGE_11", variant: "default" },
    ],
  },

  // GAVE NEW EMAIL
  "W-78": {
    title: "GAVE NEW EMAIL",
    text: formatText("Thank you for giving me the updated email; I have updated the email and consents on file."),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "NEXT PAGE", action: "NEXT_PAGE", variant: "default" }, // Goes to PG12
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // WHY IS EMAIL NEEDED
  "W-79": {
    title: "WHY IS EMAIL NEEDED",
    text: formatText(
      "We need your email address for a few important reasons.\n\nFirst, we'll send you a confirmation of your appointment details.\n\nSecond, if the inspection finds no damage, we'll email you the certified no-damage report, which is an important document that can help protect you from insurance companies denying future claims.\n\nAnd finally, if damage is found, we'll send you documentation of the findings.\n\nYour email will only be used for these purposes and won't be shared with third parties.\n\nDoes that make sense?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "GAVE EMAIL", action: "W-78", variant: "outline" },
      { label: "NO EMAIL", action: "W-82", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // DID NOT GIVE NEW EMAIL
  "W-80": {
    title: "DID NOT GIVE NEW EMAIL",
    text: formatText(
      "I understand your hesitation about sharing your email.\n\nHowever, having a correct email is important for sending you the appointment confirmation and the inspection report.\n\nIf you prefer, we can use the email we have on file,\n\nBUT...\n\nplease be aware that you might not receive these important documents.\n\nWould you like to reconsider providing an updated email address?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "GAVE EMAIL", action: "W-78", variant: "outline" },
      { label: "STILL NO EMAIL", action: "W-82", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // WHO IS THE NIRC (EMAIL CONTEXT)
  "W-81": {
    title: "WHO IS THE NIRC (EMAIL CONTEXT)",
    text: formatText(
      "• The NIRC is a non-profit organization with a mission to protect and educate property owners when dealing with insurance claims.\n• They assist property owners who are having issues dealing with their insurance companies.\n• They provide the best of the best contractor membership network who all go through a very tough background check.\n• They also create and send the certified no-damage inspection reports that help protect homeowners from insurance companies denying future claims.\n\nThis is why we need your correct email address, so they can send you this important documentation.\n\nDoes that make sense?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "GAVE EMAIL", action: "W-78", variant: "outline" },
      { label: "NO EMAIL", action: "W-82", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // DOES NOT HAVE AN EMAIL
  "W-82": {
    title: "DOES NOT HAVE AN EMAIL",
    text: formatText(
      "I understand that not everyone uses email regularly.\n\nIn this case, our inspector can provide you with a physical copy of any documentation during the inspection.\n\nHowever, please be aware that you won't receive the electronic confirmation of your appointment or any follow-up information we might need to send.\n\nIs there perhaps a family member's email we could use instead?\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "GAVE ALTERNATE EMAIL", action: "W-78", variant: "outline" },
      { label: "NO EMAIL AT ALL", action: "NEXT_PAGE", variant: "default" }, // Goes to PG12
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // THEY HAVE A CONTRACTOR
  "W-85": {
    title: "THEY HAVE A CONTRACTOR",
    text: formatText(
      "Well, I am happy to hear that, and we don't want to interfere with another contractor's contract with you.\n\nIf you do have any issues, feel free to reach out to us.\n\nI thank you for your time, and I hope you have a great day.\n\nEND CALL - SET CALL DISPOSITION: 'NOT QUALIFIED UNDER CONTRACT'",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // YES ROOF LEAKS
  "W-87": {
    title: "YES ROOF LEAKS",
    text: formatText(
      "I am glad I asked.\n\nI will make sure to let the certified contractor know so they can get an emergency repair done to stop the water from coming into the house and causing MORE damages.",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "GOTO PAGE 15", action: "GOTO_PAGE_15", variant: "default" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // NOT THE HOMEOWNER
  "W-89": {
    title: "NOT THE HOMEOWNER",
    text: formatText(
      "I would suggest you contact your landlord and let them know that there may be storm damages to the roof so they can get it inspected.\n\nOR if you would like to give me their info, I would be happy to call them.\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "INFO NOT GIVEN", action: "W-91", variant: "outline" },
      { label: "INFO GIVEN", action: "W-92", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // ASK MY SPOUSE
  "W-90": {
    title: "ASK MY SPOUSE",
    text: formatText(
      "I completely understand that you want to discuss this with your spouse before moving forward, and that's a great idea!\n\nJust to make sure you're both fully informed, we can schedule the inspection now for a time that works best for you, and if your spouse has any questions or concerns, they're welcome to join the inspection or review the details afterward.\n\nThe appointment won't commit you to anything; it's just a chance to have all the information you need.\n\nWould that work for you?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "YES - GOTO PREVIOUS", action: "BACK_TO_SCRIPT", variant: "default" }, // Go back to PG15
      { label: "NO - SCHEDULE CALL BACK", action: "W-93", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" }, // Added End Call
    ],
  },

  // LANDLORD INFO NOT GIVEN
  "W-91": {
    title: "LANDLORD INFO NOT GIVEN",
    text: formatText(
      "I understand. Please consider letting your landlord know about the potential roof damage, as it's in their best interest to address any issues promptly.\n\nThank you for your time today, and have a great day!\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // LANDLORD INFO GIVEN
  "W-92": {
    title: "LANDLORD INFO GIVEN",
    text: formatText(
      "Thank you for providing your landlord's contact information.\n\nI'll reach out to them directly about scheduling a roof inspection.\n\nThis is very helpful, as addressing potential roof damage promptly can prevent more serious issues down the line.\n\nI appreciate your assistance, and I hope you have a great day!\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // SCHEDULE CALL BACK FOR SPOUSE
  "W-93": {
    title: "SCHEDULE CALL BACK FOR SPOUSE",
    text: formatText(
      "I completely understand wanting to discuss this with your spouse first.\n\nWhen would be a good time for me to call back after you've had a chance to talk it over?\n\nI want to make sure we can address any questions or concerns you both might have.\n\nWAIT FOR A RESPONSE!!!\n\nTHEN GO BACK TO THE SCRIPT",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // Said No to being at Appointment
  "W-97": {
    title: "Said No to being at Appointment",
    text: formatText(
      "I understand, and I really appreciate your honesty.\n\nFor the inspection, we do need the property owner to be present so we can ensure everything is properly reviewed and documented.\n\nThat being said, would there be a better time that works for you?\n\nI'm happy to reschedule to fit your availability and make sure it's convenient for you.\n\nWhat time would work best for you to be there?\n\nWAIT FOR A RESPONSE!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "FINISHED SCHEDULING APPOINTMENT GOTO PAGE 19", action: "GOTO_PAGE_19", variant: "default" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // HAS REFERRAL NEED INFO
  "W-99": {
    title: "HAS REFERRAL NEED INFO",
    text: formatText(
      "Can I call you this evening or tomorrow morning so I can reach out to them right away and see if I can get them scheduled the same day as your inspection?\n\nThis way, we can go inspect their property once we have finished up with yours.\n\nWAIT FOR A RESPONSE!!!\n\nThank you so much for scheduling your inspection with us!\n\nWe're excited to help ensure everything is in great shape for your new home.\n\nAnd I truly appreciate the referral you provided, we'll be sure to take great care of them just as we will with you.\n\nI hope you have a great rest of the day, bye for now.\n\nEND CALL - SET CALL DISPOSITION: 'Appointment Set QC Review'",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // GAVE REFERRAL AND GAVE INFO
  "W-100": {
    title: "GAVE REFERRAL AND GAVE INFO",
    text: formatText(
      "Thank you so much for scheduling your inspection with us!\n\nWe're excited to help ensure everything is in great shape for your new home.\n\nAnd I truly appreciate the referral you provided – we'll be sure to take great care of them just as we will with you.\n\nI hope you have a great rest of the day, bye for now.\n\nEND CALL - SET CALL DISPOSITION: 'Appointment Set QC Review'",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // HAS REFERRAL BUT SAID WILL GIVE AT APPOINTMENT
  "W-101": {
    title: "HAS REFERRAL BUT SAID WILL GIVE AT APPOINTMENT",
    text: formatText(
      "Thank you for the referral.\n\nBUT...\n\ncan I get the info today so I can reach out to them today and make sure I can get it all set up for the same day?\n\nThis way, we can inspect their roof right after yours.\n\nWAIT FOR A RESPONSE!!!\n\nThank you so much for scheduling your inspection with us!\n\nWe're excited to help ensure everything is in great shape for your new home.\n\nAnd I truly appreciate the referral you provided – we'll be sure to take great care of them just as we will with you.\n\nI hope you have a great rest of the day, bye for now.\n\nEND CALL - SET CALL DISPOSITION: 'Appointment Set QC Review'",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },

  // 30 SECOND BONUS (Request #13)
  "W-222": {
    title: "30 SECONDS - NO",
    text: formatText(
      "I completely understand you're busy, and I want to be upfront with you.\n\nI'm not here to sell you anything.\n\nAnd I am not trying to make you sign anything all I am asking for is for an opportunity to earn your business.\n\nWhat I would like to tell you, I will make it quick and I know you will see the importance of it as it will protect you and your home now and for the future.\n\nBUT...\n\nMAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "STILL NO", action: "W-12", variant: "outline" },
      { label: "1 TO 4 YEARS SHINGLES OR CEDAR SHAKE", action: "W-8", variant: "outline" },
      { label: "5 + YEARS SHINGLES OR CEDAR SHAKE", action: "W-9", variant: "outline" },
      { label: "1 + YEARS METAL, TILE OR SLATE", action: "W-9", variant: "outline" },
      { label: "LESS THAN 1 METAL, TILE OR SLATE", action: "W-8", variant: "outline" },
      // { label: "HOW DID I FAIL", action: "W-5", variant: "outline" }, // Removed as per Request #13
    ],
  },

  // NO DAMAGES
  "W-223": {
    title: "NO DAMAGES",
    text: formatText(
      "I can understand why you feel you don't have any damages right now.\n\nBUT...\n\nMAY I ASK HOW OLD YOUR ROOF IS AND WHAT TYPE IS IT?\n\nPAUSE AND WAIT FOR AN ANSWER!!!",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
      { label: "STILL NO", action: "W-12", variant: "outline" }, // Added Still No
      { label: "1-4YR SHINGLE/CEDARSHAKE", action: "W-21", variant: "outline" },
      { label: "5+YR SHINGLE/CEDARSHAKE", action: "W-22", variant: "outline" },
      { label: "1+YR METAL/TILE/SLATE", action: "W-22", variant: "outline" },
      { label: "LESS 1YR METAL/TILE/SLATE", action: "W-21", variant: "outline" },
      // { label: "HOW DID I FAIL", action: "W-5", variant: "outline" }, // Removed How Did I Fail
    ],
  },

  // HOW DID I FAIL YOU? FINAL TRY
  "W-103": {
    title: "HOW DID I FAIL YOU? FINAL TRY",
    text: formatText(
      "If I may ask you one last question?\n\nWould you please help me understand why you are not interested in the appointment and how I failed to relay to you the importance of this call?\n\nSo I don't make the same mistake with anyone else. I am trying to help people, and I would really appreciate knowing how I failed you!\n\nPAUSE AND WAIT FOR AN ANSWER!!!\n\n<span style='color: black; font-weight: bold; text-decoration: underline; font-size: 1.5em;'>NOW SAY</span>\n\nThank you for that, so if you would humor me, I am just asking for an opportunity to earn your business.\n\nWhat I must go over with you is important, and I can promise you will see the value in what I have to say.\n\nSo if I could please have 30 seconds of your time, I will not waste it.",
    ),
    buttons: [
      { label: "PREVIOUS", action: "PREVIOUS_PAGE", variant: "outline" },
      { label: "BACK TO SCRIPT", action: "BACK_TO_SCRIPT", variant: "outline" }, // Added Back to Script
      { label: "END CALL", action: "END_CALL", variant: "destructive" },
    ],
  },
}

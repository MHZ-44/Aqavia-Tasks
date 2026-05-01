export const Config = [
  { type: "text", label: "Name", required: true },
  { type: "text", label: "Title", required: true },
  { type: "textarea", label: "Description", required: true },
  { type: "image", label: "Profile Image", required: false },
  { type: "video", label: "Intro Video", required: false },
  {
    type: "radio",
    label: "Employment Type",
    required: true,
    options: ["Full-time", "Part-time", "Contract"],
  },
  {
    type: "checkbox",
    label: "Skills",
    required: false,
    options: ["React", "TypeScript", "UI/UX", "Node.js"],
  },
  {
    type: "select",
    label: "Location",
    required: true,
    options: ["Damascus", "Aleppo", "Hama", "Remote"],
  },
]

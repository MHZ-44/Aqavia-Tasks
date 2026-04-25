export const Config = [
  { type: "text", label: "name", required: true },
  { type: "email", label: "email", required: true },
  { type: "password", label: "password", required: true, min: 6 },
  {
    type: "select",
    label: "location",
    options: ["Damascus", "Aleppo", "Hama"],
  },
]

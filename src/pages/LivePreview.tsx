import { Card } from "@/components/ui/card"
import { Config } from "@/lib/config"
import type { FormData } from "@/validation/formSchema"

interface Props {
  data: FormData
}

function LivePreview({ data }: Props) {
  return (
    <Card className="mt-5 h-full w-full p-6">
      <p className="mb-3 text-sm font-semibold">Live Preview</p>
      <div className="space-y-10 text-sm">
        {Config.map((field) => {
          const value = data[field.label as keyof FormData]

          if (value instanceof FileList) {
            const file = value.length > 0 ? value[0] : null
            const previewUrl = file ? URL.createObjectURL(file) : ""

            return (
              <div key={field.label}>
                <p>
                  <span className="font-medium">{field.label}: </span>
                  {file?.name ?? "-"}
                </p>
                {file && field.type === "image" ? (
                  <img
                    src={previewUrl}
                    alt={file.name}
                    className="mt-2 max-h-56 rounded-md border object-cover"
                  />
                ) : null}
                {file && field.type === "video" ? (
                  <video
                    src={previewUrl}
                    controls
                    className="mt-2 max-h-56 rounded-md border"
                  />
                ) : null}
              </div>
            )
          }

          return (
            <p key={field.label}>
              <span className="font-medium">{field.label}: </span>
              {value ? String(value) : "-"}
            </p>
          )
        })}
      </div>
    </Card>
  )
}

export default LivePreview

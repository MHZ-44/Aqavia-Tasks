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
            return (
              <p key={field.label}>
                <span className="font-medium">{field.label}: </span>
                {value.length > 0 ? value[0]?.name : "-"}
              </p>
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

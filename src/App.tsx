import { useState } from "react"
import FormCard from "./pages/FormCard"
import FormTable from "./pages/FormTable"
import LivePreview from "./pages/LivePreview"
import type { FormData } from "./validation/formSchema"

export default function App() {
  const [rows, setRows] = useState<FormData[]>([])
  const [liveData, setLiveData] = useState<FormData>({})

  return (
    <div className="flex justify-center font-mono text-xs text-muted-foreground">
      <div className="w-full max-w-[1640px] px-4">
        <div className="mt-5 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[800px_800px]">
          <FormCard
            onSubmit={(data) => {
              setRows((prev) => [...prev, data])
              console.log(data)
            }}
            onWatch={(data) => setLiveData(data)}
          />
          <LivePreview data={liveData} />
        </div>

        <div className="mt-5 w-full">
          <FormTable rows={rows} />
        </div>

        <p className="mt-3">
          (Press <kbd>d</kbd> to toggle dark mode)
        </p>
      </div>
    </div>
  )
}

import FormCard from "./pages/FormCard"
import CommentTable from "./pages/CommentTable"
import useCreateComment from "./hooks/useCreateComment"
import type { FormData } from "./validation/formSchema"

export default function App() {
  const createComment = useCreateComment()

  return (
    <div className="flex justify-center font-mono text-xs text-muted-foreground">
      <div className="w-full max-w-[1640px] px-4">
        <div className="mt-5 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[800px_800px]">
          <FormCard
            onSubmit={(data) => {
              const formData = data as FormData
              createComment.mutate({
                id: Date.now(),
                name: String(formData.Name ?? ""),
                email: String(formData.Email ?? ""),
                body: String(formData.Comment ?? ""),
              })
            }}
          />
        </div>

        <div className="mt-5 w-full">
          <CommentTable />
        </div>

        <p className="mt-3">
          (Press <kbd>d</kbd> to toggle dark mode)
        </p>
      </div>
    </div>
  )
}

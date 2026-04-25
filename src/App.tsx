import FormCard from "./pages/FormCard"

export default function App() {
  return (
    <div className="flex justify-center gap-2 font-mono text-xs text-muted-foreground">
      <div>
        <FormCard />
        (Press <kbd>d</kbd> to toggle dark mode)
      </div>
    </div>
  )
}

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Config } from "@/lib/config"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, type FormData } from "@/validation/formSchema"

function FormCard() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => console.log(data)

  return (
    <Card className="mt-5 w-[800px] gap-2 p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {Config.map((field) => {
          const key = field.label as keyof FormData

          switch (field.type) {
            case "text":
            case "email":
            case "password":
              return (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>{field.label}</Label>
                  <Input
                    id={field.label}
                    type={field.type}
                    {...register(key)}
                  />
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )

            case "select":
              return (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>{field.label}</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(key, value as FormData[typeof key], {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  >
                    <SelectTrigger id={field.label} className="w-full">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )

            default:
              return null
          }
        })}
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default FormCard

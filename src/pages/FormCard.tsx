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
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, type FormData } from "@/validation/formSchema"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect } from "react"

interface Props {
  onSubmit: (data: FormData) => void
  onWatch?: (data: Partial<FormData>) => void
}

function FormCard({ onSubmit, onWatch }: Props) {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const subscription = watch((value) => {
      onWatch?.(value)
    })
    return () => subscription.unsubscribe()
  }, [watch, onWatch])

  return (
    <Card className="mt-5 h-full w-[800px] gap-2 p-10">
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
          reset()
        })}
        className="space-y-4"
      >
        {Config.map((field) => {
          const key = field.label as keyof FormData

          switch (field.type) {
            case "textarea":
              return (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>{field.label}</Label>
                  <Textarea
                    id={field.label}
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
                  <input type="hidden" {...register(key)} />
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )

            case "radio":
              return (
                <div key={field.label} className="space-y-2">
                  <Label>{field.label}</Label>
                  <Controller
                    name={key}
                    control={control}
                    render={({ field: radioField }) => (
                      <RadioGroup
                        value={String(radioField.value ?? "")}
                        onValueChange={radioField.onChange}
                        className="w-full"
                      >
                        {field.options?.map((option) => {
                          const id = `${field.label}-${option}`

                          return (
                            <Field key={option} orientation="horizontal">
                              <RadioGroupItem value={option} id={id} />
                              <FieldContent>
                                <FieldLabel htmlFor={id}>{option}</FieldLabel>
                              </FieldContent>
                            </Field>
                          )
                        })}
                      </RadioGroup>
                    )}
                  />
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )

            case "checkbox":
              return (
                <div key={field.label} className="space-y-2">
                  <Label>{field.label}</Label>
                  <div className="space-y-1.5">
                    {field.options?.map((option) => (
                      <Label key={option} className="flex items-center gap-2">
                        <Input
                          type="checkbox"
                          value={option}
                          className="size-4"
                          {...register(key)}
                        />
                        <span>{option}</span>
                      </Label>
                    ))}
                  </div>
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )

            case "image":
              return (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>{field.label}</Label>
                  <Input
                    id={field.label}
                    type="file"
                    accept="image/*"
                    {...register(key)}
                  />
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )

            case "video":
              return (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>{field.label}</Label>
                  <Input
                    id={field.label}
                    type="file"
                    accept="video/*"
                    {...register(key)}
                  />
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )

            default:
              return (
                <div key={field.label} className="space-y-1.5">
                  <Label htmlFor={field.label}>{field.label}</Label>
                  <Input
                    id={field.label}
                    type="text"
                    {...register(key)}
                  />
                  {errors[key]?.message ? (
                    <p className="text-sm text-destructive">
                      {String(errors[key]?.message)}
                    </p>
                  ) : null}
                </div>
              )
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

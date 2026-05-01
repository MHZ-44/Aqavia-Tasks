import { z } from "zod"
import { Config } from "@/lib/config"

export const formSchema = z.object(
  Config.reduce((acc: Record<string, z.ZodTypeAny>, field: any) => {
    let schema: any

    switch (field.type) {
      case "text":
      case "textarea":
      case "select":
        schema = z.string()
        if (field.required) {
          schema = schema.min(1, `${field.label} is required`)
        }
        break

      case "email":
        schema = z.string().email(`Invalid ${field.label}`)
        if (field.required) {
          schema = schema.min(1, `${field.label} is required`)
        }
        break

      case "password":
        schema = z.string().min(field.min || 6, `${field.label} too short`)
        break

      case "radio":
        if (field.options && field.options.length > 0) {
          schema = z.enum([...field.options] as [string, ...string[]])
          if (!field.required) {
            schema = schema.optional()
          }
        } else {
          schema = z.string()
        }
        break

      default:
        schema = z.any()
    }

    acc[field.label] = schema
    return acc
  }, {})
)

export type FormData = z.infer<typeof formSchema>

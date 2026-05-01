import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { FormData } from "@/validation/formSchema"
import { Config } from "@/lib/config"

interface Props {
  rows: FormData[]
}

function FormTable({ rows }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Config.map((field) => (
            <TableHead key={field.label}>{field.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, id = rows.length) => (
          <TableRow key={id}>
            {Config.map((field) => {
              const value = row[field.label]

              if (value instanceof FileList) {
                return (
                  <TableCell key={field.label}>
                    {value.length > 0 ? value[0]?.name : "-"}
                  </TableCell>
                )
              }

              if (value === false || value === "") {
                return <TableCell key={field.label}>-</TableCell>
              }

              return (
                <TableCell key={field.label}>{String(value ?? "-")}</TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default FormTable

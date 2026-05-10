import { MoreHorizontalIcon } from "lucide-react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Comment } from "@/lib/comment"
import { Config } from "@/lib/config"
import useUpdateComment from "@/hooks/useUpdateComment"
import useDeleteComment from "@/hooks/useDeleteComment"
import useGetComments from "@/hooks/useGetComment"

const labelToKey: Record<string, keyof Comment> = {
  Name: "name",
  Email: "email",
  Comment: "body",
}

function CommentTable() {
  const { data, isLoading, error } = useGetComments()
  const deleteComment = useDeleteComment()
  const updateComment = useUpdateComment()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingBody, setEditingBody] = useState("")

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Something went wrong.</p>
  }

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          {Config.map((field) => (
            <TableHead key={field.label}>{field.label}</TableHead>
          ))}
          <TableHead className="w-14 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.comments?.map((row) => (
          <TableRow key={row.id}>
            {Config.map((field) => {
              const key = labelToKey[field.label]
              const value = row[key]
              const isEditingCommentCell =
                field.label === "Comment" && editingId === row.id

              if (value === "" || value === null || value === undefined) {
                return (
                  <TableCell
                    key={field.label}
                    className="break-words whitespace-normal"
                  >
                    -
                  </TableCell>
                )
              }

              if (isEditingCommentCell) {
                return (
                  <TableCell
                    key={field.label}
                    className="break-words whitespace-normal"
                  >
                    <div className="space-y-2">
                      <Textarea
                        value={editingBody}
                        onChange={(event) => setEditingBody(event.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateComment.mutate(
                              { id: row.id, data: { body: editingBody } },
                              {
                                onSuccess: () => {
                                  setEditingId(null)
                                  setEditingBody("")
                                },
                              }
                            )
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(null)
                            setEditingBody("")
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                )
              }

              return (
                <TableCell
                  key={field.label}
                  className="break-words whitespace-normal"
                >
                  {String(value)}
                </TableCell>
              )
            })}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex size-7 items-center justify-center rounded-md outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingId(row.id)
                      setEditingBody(row.body)
                    }}
                  >
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => deleteComment.mutate({ id: row.id })}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CommentTable

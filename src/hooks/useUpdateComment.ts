import APIClient from "@/api/api-client"
import type { Comment } from "@/lib/comment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const apiClient = new APIClient<Comment>("")
type CommentsQueryData = { comments: Comment[] }

interface UpdateCommentPayload {
  id: number
  data: Partial<Comment>
}

const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Comment,
    Error,
    UpdateCommentPayload,
    { previousComments?: CommentsQueryData }
  >({
    mutationFn: ({ id, data }: UpdateCommentPayload) =>
      apiClient.patch(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] })

      const previousComments =
        queryClient.getQueryData<CommentsQueryData>(["comments"])

      queryClient.setQueryData<CommentsQueryData>(["comments"], (oldData) => ({
        comments: (oldData?.comments ?? []).map((comment) =>
          comment.id === id ? { ...comment, ...data } : comment
        ),
      }))

      return { previousComments }
    },
    onSuccess: (updatedComment, variables) => {
      queryClient.setQueryData<CommentsQueryData>(["comments"], (oldData) => ({
        comments: (oldData?.comments ?? []).map((comment) =>
          comment.id === variables.id
            ? { ...comment, ...updatedComment, ...variables.data }
            : comment
        ),
      }))
    },
    onError: (error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments"], context.previousComments)
      }

      console.log(error)
    },
  })
}

export default useUpdateComment

import APIClient from "@/api/api-client"
import type { Comment } from "@/lib/comment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const apiClient = new APIClient<Comment>("")
type CommentsQueryData = { comments: Comment[] }

const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    Error,
    { id: number },
    { previousComments?: CommentsQueryData }
  >({
    mutationFn: ({ id }) => apiClient.delete(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] })

      const previousComments =
        queryClient.getQueryData<CommentsQueryData>(["comments"])

      queryClient.setQueryData<CommentsQueryData>(["comments"], (oldData) => ({
        comments: (oldData?.comments ?? []).filter(
          (comment) => comment.id !== id
        ),
      }))

      return { previousComments }
    },
    onError: (error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments"], context.previousComments)
      }

      console.log(error)
    },
  })
}

export default useDeleteComment

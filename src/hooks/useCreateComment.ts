import APIClient from "@/api/api-client"
import type { Comment } from "@/lib/comment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const apiClient = new APIClient<Comment>("")
type CommentsQueryData = { comments: Comment[] }

const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Comment,
    Error,
    Comment,
    { previousComments?: CommentsQueryData }
  >({
    mutationFn: (newComment: Comment) => apiClient.post(newComment),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] })

      const previousComments =
        queryClient.getQueryData<CommentsQueryData>(["comments"])

      queryClient.setQueryData<CommentsQueryData>(["comments"], (oldData) => ({
        comments: [newComment, ...(oldData?.comments ?? [])],
      }))

      return { previousComments }
    },
    onSuccess: (createdComment, variables) => {
      queryClient.setQueryData<CommentsQueryData>(["comments"], (oldData) => ({
        comments: (oldData?.comments ?? []).map((comment) =>
          comment.id === variables.id
            ? { ...comment, ...createdComment, id: variables.id }
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

export default useCreateComment

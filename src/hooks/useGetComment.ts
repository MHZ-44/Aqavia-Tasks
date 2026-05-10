import APIClient from "@/api/api-client"
import type { Comment } from "@/lib/comment"
import { useQuery } from "@tanstack/react-query"

const apiClient = new APIClient<Comment>("")

const useGetComments = () =>
  useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const comments = await apiClient.get()

      return {
        comments: [...comments].reverse(),
      }
    },
  })

export default useGetComments

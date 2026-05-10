import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/comments",
})

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data)
  }

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data)
  }

  patch = (id: number, data: Partial<T>) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`, data)
      .then((res) => res.data)
  }

  delete = (id: number) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`)
      .then((res) => res.data)
  }
}

export default APIClient

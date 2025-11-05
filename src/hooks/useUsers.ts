import useSWR from "swr"
import type { User } from "../../src/hooks/types/user"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>("https://jsonplaceholder.typicode.com/users", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  return {
    users: data || [],
    isLoading,
    error,
    mutate,
  }
}

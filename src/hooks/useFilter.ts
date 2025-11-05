"use client"

import { useMemo } from "react"
import type { User } from "../types/user"

export const useFilter = (users: User[], searchTerm: string) => {
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users

    const lowerSearchTerm = searchTerm.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm) ||
        user.username.toLowerCase().includes(lowerSearchTerm),
    )
  }, [users, searchTerm])

  return filteredUsers
}

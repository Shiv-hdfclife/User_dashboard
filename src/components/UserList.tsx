"use client"

import { memo, useCallback } from "react"
import UserCard from "./UserCard"
import type { User } from "../types/user"

interface UserListProps {
  users: User[]
  onUserClick: (user: User) => void
}

const UserList = memo(({ users, onUserClick }: UserListProps) => {
  const handleUserClick = useCallback(
    (user: User) => {
      onUserClick(user)
    },
    [onUserClick],
  )

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No users found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={handleUserClick} />
      ))}
    </div>
  )
})

UserList.displayName = "UserList"

export default UserList

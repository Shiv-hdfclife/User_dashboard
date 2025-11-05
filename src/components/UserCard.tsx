"use client"

import { memo } from "react"
import  { User } from "../../src/hooks/types/user"

interface UserCardProps {
    user: User
    onClick: (user: User) => void
}

const UserCard = memo(({ user, onClick }: UserCardProps) => {
    return (
        <div
            onClick={() => onClick(user)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4 border border-gray-200"
        >
            <h3 className="font-bold text-lg mb-2">{user.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{user.email}</p>
            <p className="text-gray-500 text-sm">@{user.name}</p>
        </div>
    )
})

UserCard.displayName = "UserCard"

export default UserCard

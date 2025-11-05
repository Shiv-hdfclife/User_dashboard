"use client"

import { memo } from "react"
import  { User } from "../../src/hooks/types/user"

interface UserDetailProps {
  user: User
  onClose: () => void
}

const UserDetail = memo(({ user, onClose }: UserDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <button onClick={onClose} className="text-white hover:bg-blue-700 rounded px-2 py-1 transition">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-gray-600 text-sm font-medium">Username</p>
            <p className="text-gray-900 font-semibold">@{user.name}</p>
          </div>

          <div>
            <p className="text-gray-600 text-sm font-medium">Email</p>
            <p className="text-gray-900 font-semibold">{user.email}</p>
          </div>

          {user.phone && (
            <div>
              <p className="text-gray-600 text-sm font-medium">Phone</p>
              <p className="text-gray-900 font-semibold">{user.phone}</p>
            </div>
          )}

          {user.website && (
            <div>
              <p className="text-gray-600 text-sm font-medium">Website</p>
              <p className="text-gray-900 font-semibold break-all">{user.website}</p>
            </div>
          )}

          {user.company && (
            <div>
              <p className="text-gray-600 text-sm font-medium">Company</p>
              <p className="text-gray-900 font-semibold">{user.company.name}</p>
            </div>
          )}

          {user.address && (
            <div>
              <p className="text-gray-600 text-sm font-medium">Address</p>
              <p className="text-gray-900 font-semibold">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

UserDetail.displayName = "UserDetail"

export default UserDetail

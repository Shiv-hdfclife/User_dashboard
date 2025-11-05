"use client"

import { useState, useCallback, Suspense, lazy } from "react"
import { useUsers } from "./hooks/useUsers"
import { useFilter } from "./hooks/useFilter"
import { usePagination } from "./hooks/usePagination"
import UserForm from "./components/UserForm"
import SearchBar from "./components/SearchBar"
import UserList from "./components/UserList"
import Pagination from "./components/Pagination"
import LoadingSpinner from "./components/LoadingSpinner"
import type { User, CreateUserPayload } from "../src/hooks/types/user"
import "./App.css"

// Lazy load UserDetail to optimize code splitting
const UserDetail = lazy(() => import("./components/UserDetail"))

const ITEMS_PER_PAGE = 6

function App() {
  const { users, isLoading, error, mutate } = useUsers()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUsers, setNewUsers] = useState<User[]>([])

  // Filter users based on search term
  const filteredUsers = useFilter([...users, ...newUsers], searchTerm)

  // Paginate filtered users
  const { totalPages, paginate } = usePagination(filteredUsers, ITEMS_PER_PAGE)
  const paginatedUsers = paginate(currentPage)

  // Handle adding new user
  const handleAddUser = useCallback(
    (userData: CreateUserPayload) => {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id), ...newUsers.map((u) => u.id), 0) + 1,
        ...userData,
      }
      setNewUsers((prev) => [newUser, ...prev])
      setCurrentPage(1)
    },
    [users, newUsers],
  )

  // Handle user selection
  const handleUserClick = useCallback((user: User) => {
    setSelectedUser(user)
  }, [])

  // Handle closing user detail
  const handleCloseDetail = useCallback(() => {
    setSelectedUser(null)
  }, [])

  // Handle search
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-600">Manage and view users efficiently</p>
        </div>

        {/* Form */}
        <UserForm onAddUser={handleAddUser} />

        {/* Search Bar */}
        <SearchBar value={searchTerm} onChange={handleSearch} />

        {/* Content */}
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Failed to load users. Please try again later.
          </div>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <UserList users={paginatedUsers} onUserClick={handleUserClick} />
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>

      {/* User Detail Modal - Lazy Loaded */}
      {selectedUser && (
        <Suspense fallback={<div>Loading...</div>}>
          <UserDetail user={selectedUser} onClose={handleCloseDetail} />
        </Suspense>
      )}
    </div>
  )
}

export default App

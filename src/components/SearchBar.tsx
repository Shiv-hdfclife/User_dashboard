"use client"

import type React from "react"
import { memo, useCallback } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = memo(({ value, onChange }: SearchBarProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name, email, or username..."
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  )
})

SearchBar.displayName = "SearchBar"

export default SearchBar

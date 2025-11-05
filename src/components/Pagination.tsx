"use client"

import { memo, useCallback } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }, [currentPage, totalPages, onPageChange])

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        Previous
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        Next
      </button>
    </div>
  )
})

Pagination.displayName = "Pagination"

export default Pagination

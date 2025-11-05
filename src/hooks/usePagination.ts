"use client"

import { useMemo, useCallback } from "react"

export const usePagination = (items: any[], itemsPerPage: number) => {
  const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items.length, itemsPerPage])

  const paginate = useCallback(
    (pageNumber: number) => {
      const startIndex = (pageNumber - 1) * itemsPerPage
      return items.slice(startIndex, startIndex + itemsPerPage)
    },
    [items, itemsPerPage],
  )

  return { totalPages, paginate }
}

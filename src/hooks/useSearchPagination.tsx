import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { API_LIMIT } from "@utils/constants"

interface Props {
  showOnUrl?: boolean
}

export const useSearchPagination = (props?: Props) => {
  const { showOnUrl } = props || {
    showOnUrl: false,
  }

  const router = useRouter()

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [limit, setLimit] = useState<number>(+API_LIMIT)
  const [mounted, setMounted] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    if (mounted && showOnUrl) {
      const query = { ...router.query }

      query["search"] = search
      query["page"] = String(page)
      query["limit"] = String(limit)

      router.push({
        query,
        pathname: router.pathname,
      })
    } else setMounted(true)
    // eslint-disable-next-line
  }, [page, search, limit])

  useEffect(() => {
    const { page, limit, search } = router.query

    setLimit(page ? +page : 1)
    setSearch((search as string) || "")
    setLimit(limit ? +limit : +API_LIMIT)

    // eslint-disable-next-line
  }, [router.query])

  return {
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    totalPages,
    setTotalPages,
  }
}

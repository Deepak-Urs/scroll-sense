import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [delayedLoading, setDelayedLoading] = useState(false)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setDelayedLoading(true)
    setError(false)
    let cancel
    let timer
    const start = Date.now()
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber, limit: 15 },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        const existingKeys = new Set(prevBooks.map(b => b.key || b.title))
        const newBooks = res.data.docs.filter(b => !existingKeys.has(b.key || b.title))
        return [...prevBooks, ...newBooks]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
      // Ensure spinner shows for at least 2 seconds
      const elapsed = Date.now() - start
      timer = setTimeout(() => setDelayedLoading(false), Math.max(0, 2000 - elapsed))
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
      setLoading(false)
      setDelayedLoading(false)
    })
    return () => {
      cancel()
      clearTimeout(timer)
    }
  }, [query, pageNumber])

  return { loading, delayedLoading, error, books, hasMore }
}

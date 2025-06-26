import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from './useBookSearch'

const mockUsers = [
  { name: 'Alice', avatar: '🧑‍💻' },
  { name: 'Bob', avatar: '👨‍🚀' },
  { name: 'Charlie', avatar: '👩‍🎨' },
  { name: 'Dana', avatar: '🧑‍🔬' },
]

function getRandomMeta(index) {
  const user = mockUsers[index % mockUsers.length]
  const minutesAgo = Math.floor(Math.random() * 60) + 1
  const likes = Math.floor(Math.random() * 100)
  return { ...user, time: `${minutesAgo} min ago`, likes }
}

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1) 

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f8', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* Left: Search bar */}
      <div style={{
        width: '40%',
        minWidth: '260px',
        maxWidth: '400px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        background: '#fff',
        zIndex: 10,
        padding: '2rem 1.5rem 1rem 1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Scroll Sense</h2>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search books..."
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '24px',
            border: '1px solid #ccc',
            width: '100%',
            fontSize: '1rem',
            marginTop: '1rem',
            outline: 'none',
            boxShadow: '0 1px 6px rgba(0,0,0,0.07)'
          }}
        />
      </div>
      {/* Right: Infinite scroll cards */}
      <div style={{
        width: '60%',
        minWidth: '320px',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
        marginLeft: '2rem',
      }}>
        {books.map((book, index) => {
          const meta = getRandomMeta(index)
          const card = (
            <div
              key={book}
              style={{
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                padding: '1.5rem 2rem',
                margin: '1rem 0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{ fontSize: '2rem' }}>{meta.avatar}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#222' }}>{meta.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>{meta.time}</div>
                </div>
              </div>
              <div style={{ fontSize: '1.1rem', color: '#333', margin: '0.5rem 0' }}>{book}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.98rem', color: '#555' }}>
                <span>👍 {meta.likes} Likes</span>
                <span>🔖 Book</span>
              </div>
            </div>
          )
          if (books.length === index + 1) {
            return <div ref={lastBookElementRef} key={book}>{card}</div>
          } else {
            return card
          }
        })}
        <div style={{ color: '#666', margin: '1rem 0' }}>{loading && 'Loading...'}</div>
        <div style={{ color: 'red', margin: '1rem 0' }}>{error && 'Error'}</div>
      </div>
    </div>
  )
}

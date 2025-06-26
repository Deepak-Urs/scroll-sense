import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from './hooks/useBookSearch'
import InterestPanel from './components/InterestPanel'
import FeedPanel from './components/FeedPanel'
import './App.css'

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

function getCoverUrl(doc, size = 'M') {
  if (doc.cover_i) {
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`
  } else if (doc.cover_edition_key) {
    return `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-${size}.jpg`
  }
  return null
}

export default function App() {
  const [addictiveInput, setAddictiveInput] = useState('')
  const [goodInput, setGoodInput] = useState('')
  const [addictiveInterests, setAddictiveInterests] = useState([])
  const [goodInterests, setGoodInterests] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const totalInterests = addictiveInterests.length + goodInterests.length
  const canShowFeed = totalInterests >= 10
  const query = addictiveInterests.join(', ')

  const {
    books,
    hasMore,
    loading,
    error,
    delayedLoading
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

  function handleAddictiveInputChange(e) {
    setAddictiveInput(e.target.value)
  }

  function handleGoodInputChange(e) {
    setGoodInput(e.target.value)
  }

  function handleAddAddictive() {
    const interests = addictiveInput.split(',').map(s => s.trim()).filter(Boolean)
    setAddictiveInterests(prev => [...prev, ...interests])
    setAddictiveInput('')
    setPageNumber(1)
  }

  function handleAddGood() {
    const interests = goodInput.split(',').map(s => s.trim()).filter(Boolean)
    setGoodInterests(prev => [...prev, ...interests])
    setGoodInput('')
    setPageNumber(1)
  }

  return (
    <div className="app-container">
      <InterestPanel
        addictiveInput={addictiveInput}
        goodInput={goodInput}
        addictiveInterests={addictiveInterests}
        goodInterests={goodInterests}
        canShowFeed={canShowFeed}
        handleAddictiveInputChange={handleAddictiveInputChange}
        handleGoodInputChange={handleGoodInputChange}
        handleAddAddictive={handleAddAddictive}
        handleAddGood={handleAddGood}
      />
      <FeedPanel
        books={books}
        canShowFeed={canShowFeed}
        loading={loading}
        delayedLoading={delayedLoading}
        error={error}
        getCoverUrl={getCoverUrl}
        getRandomMeta={getRandomMeta}
        lastBookElementRef={lastBookElementRef}
      />
    </div>
  )
}

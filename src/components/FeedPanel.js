import React from 'react';
import BookCard from './BookCard';

export default function FeedPanel({ books, canShowFeed, loading, delayedLoading, error, getCoverUrl, getRandomMeta, lastBookElementRef }) {
  return (
    <div className="feed-panel" style={{ opacity: canShowFeed ? 1 : 0.4, pointerEvents: canShowFeed ? 'auto' : 'none' }}>
      {canShowFeed && books.map((book, index) => (
        <BookCard
          key={book.key || book.title}
          book={book}
          meta={getRandomMeta(index)}
          coverUrl={getCoverUrl(book)}
          lastBookElementRef={lastBookElementRef}
          isLast={books.length === index + 1}
        />
      ))}
      {canShowFeed && delayedLoading && (
        <div className="spinner-container"><div className="spinner"></div></div>
      )}
      {canShowFeed && !delayedLoading && <div className="feed-panel__loading">{loading && 'Loading...'}</div>}
      {canShowFeed && <div className="feed-panel__error">{error && 'Error'}</div>}
    </div>
  );
}

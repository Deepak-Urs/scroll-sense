import React from 'react';

export default function BookCard({ book, meta, coverUrl, lastBookElementRef, isLast }) {
  const card = (
    <div className="book-card" key={book.key || book.title}>
      {coverUrl && (
        <img className="book-card__cover" src={coverUrl} alt="cover" />
      )}
      <div className="book-card__meta">
        <span className="book-card__avatar">{meta.avatar}</span>
        <div>
          <div className="book-card__user">{meta.name}</div>
          <div className="book-card__time">{meta.time}</div>
        </div>
      </div>
      <div className="book-card__title">{book.title}</div>
      <div className="book-card__subtext book-card__subtext--main">
        {book.author_name ? `by ${book.author_name.join(', ')}` : 'Unknown author'}
        {book.first_publish_year ? ` · First published ${book.first_publish_year}` : ''}
      </div>
      <div className="book-card__subtext book-card__subtext--secondary">
        {book.edition_count ? `${book.edition_count} editions` : ''}
        {book.language ? ` · Languages: ${book.language.join(', ')}` : ''}
      </div>
      <div className="book-card__actions">
        <span>👍 {meta.likes} Likes</span>
        <span>🔖 Book</span>
      </div>
    </div>
  );
  if (isLast) {
    return <div ref={lastBookElementRef} key={book.key || book.title}>{card}</div>;
  }
  return card;
}

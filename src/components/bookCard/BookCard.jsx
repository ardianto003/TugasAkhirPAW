import React, { useState } from 'react'
import classes from './bookCard.module.css'
import Link from 'next/link'
import Image from 'next/image'

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const coverImage = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`

  return (
    <div className={classes.container}>
      <Link href={`/details/${book.id}`} className={classes.wrapper}>
        {!imageError ? (
          <Image 
            src={coverImage}
            alt={book.title}
            height='275'
            width='175'
            onError={() => setImageError(true)}
            onLoadingComplete={() => setIsLoading(false)}
            className={classes.image}
          />
        ) : (
          <div className={classes.placeholder}>
            <span>No Image</span>
          </div>
        )}
        {isLoading && !imageError && (
          <div className={classes.loadingPlaceholder}>
            <span>Loading...</span>
          </div>
        )}
      </Link>
      <h3 className={classes.title}>{book.title}</h3>
      {book.author_name && (
        <p className={classes.author}>{book.author_name[0]}</p>
      )}
    </div>
  )
}

export default BookCard
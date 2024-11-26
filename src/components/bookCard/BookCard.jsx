import React, { useState } from 'react'
import classes from './bookCard.module.css'
import Link from 'next/link'
import Image from 'next/image'

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const coverImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

  return (
    <Link href={`/details/${book.id}`} className={classes.container}>
      <div className={classes.wrapper}>
        {!imageError ? (
          <Image 
            src={coverImage}
            alt="book cover"
            height='275'
            width='175'
            onError={() => setImageError(true)}
            onLoadingComplete={() => setIsLoading(false)}
            className={isLoading ? classes.loading : ''}
          />
        ) : (
          <div className={classes.placeholder}>
            <span>No Image Available</span>
          </div>
        )}
        {isLoading && !imageError && (
          <div className={classes.loadingPlaceholder}>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default BookCard
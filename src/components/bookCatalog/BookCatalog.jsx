"use client"
import React, { useEffect, useState } from 'react'
import classes from './bookCatalog.module.css'
import Pagination from '../pagination/Pagination'
import BookCard from '../bookCard/BookCard'

const BookCatalog = () => {
  const [title, setTitle] = useState("")
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 12

  const fetchBooks = async () => {
    if (!title.trim()) return

    try {
      setIsLoading(true)
      const res = await fetch(`https://openlibrary.org/search.json?title=${title}`)
      const { docs } = await res.json()
      let books = docs.slice(0, 50)

      books = books.map((book) => {
        const id = book.key.split("/")[2]
        console.log('book', book)
        
        return {
            id: id,
            title: book.title,
            cover_id: book.cover_i,
            author_name: book.author_name,
            public_rating: book.ratings_average,
            published_year: book.first_published_year
        }
    })
        console.log('books', books)

      const formattedBooks = []
      for (let i = 0; i < books.length; i++) {
        if (books[i]?.cover_id) {
          formattedBooks.push(books[i])
        }
      }

      console.log('formatted books', formattedBooks)

      setBooks(formattedBooks)      

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchBooks(); // Fetch books when the form is submitted
  }

  const endOffset = itemOffset + itemsPerPage
  const currentItems = books.slice(itemOffset, endOffset)
  
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit} className={classes.searchSection}>
          <h1>Book Search</h1>
          <p>Search millions of books from the Open Library catalog</p>
          <input 
            type="text"
            placeholder="Enter book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.searchInput}
          />
          <button type="submit" className={classes.submitButton}>Search</button>
        </form>

        {isLoading && (
          <div className={classes.loading}>Loading books...</div>
        )}

        {!isLoading && books.length > 0 && (
          <>
            <div className={classes.books}>
              {currentItems?.map((book) => {
                console.log(book)
                return <BookCard key={book.key} book={book} />
                })}
            </div>
            <Pagination
              setItemOffset={setItemOffset}
              itemsPerPage={itemsPerPage}
              books={books}
            />
          </>
        )}

        {!isLoading && title && books.length === 0 && (
          <div className={classes.noResults}>No books found</div>
        )}
      </div>
    </div>
  )
}

export default BookCatalog
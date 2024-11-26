"use client"
import React, { useEffect, useState } from 'react'
import classes from './bookCatalog.module.css'
import Pagination from '../pagination/Pagination'
import BookCard from '../bookCard/BookCard'

const BookCatalog = () => {
  const [title, setTitle] = useState("the lord of the rings")
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const BASE_URL = `https://openlibrary.org/search.json?title=${title}`
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 3

  useEffect(() => {
    const getData = setTimeout(async () => {
      try {
        setIsLoading(true)
        const res = await fetch(BASE_URL)
        const { docs } = await res.json()
        let books = docs.slice(0, 50)
        console.log(books)
        setBooks(books)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => clearTimeout(getData)
  }, [title])

  const currentItems = books.slice(itemOffset, itemOffset + itemsPerPage)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.books}>
          {!isLoading && currentItems?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        {!isLoading && (
          <Pagination
            setItemOffset={setItemOffset}
            itemsPerPage={itemsPerPage}
            books={books}
          />
        )}
      </div>
    </div>
  )
}

export default BookCatalog
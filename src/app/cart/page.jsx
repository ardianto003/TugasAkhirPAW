"use client";

import React, { useEffect, useState } from "react";
import classes from "./cart.module.css";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeBook } from "../redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { books } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const [paymentMethodId, setPaymentMethodId] = useState(null);

  let totalPrice = 0;
  books.map((book) => (totalPrice += book.quantity * book.price));

  const handleRemoveBook = (book) => {
    dispatch(removeBook({ id: book?.id }));
  };

  const handleCheckout = async () => {
    const lineItems = books.map((book) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: book.title,
          },
          unit_amount: book.price * 100, // Price in cents
        },
        quantity: book.quantity,
      };
    });

    const res = await fetch("/api/checkout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ lineItems }), // Send lineItems in the request body
    });

    const data = await res.json();

    if (data.error) {
      console.error(data.error); // Log any errors
      return;
    }

    const stripe = await stripePromise;

    await stripe.redirectToCheckout({ sessionId: data.id }); // Use the session ID returned from the server
  };

  const createPaymentMethod = async () => {
    // Logic to create a payment method using Stripe.js
    // After creating, set the paymentMethodId state
    // Example: const { id } = await stripe.createPaymentMethod({ /* payment details */ });
    // setPaymentMethodId(id);
  };

  useEffect(() => {
    createPaymentMethod();
  }, []);

  return (
    <div className={classes.container}>
      {books?.length > 0 && <h2>Your cart</h2>}
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {books?.length > 0 ? (
            books?.map((book) => {
              return (
                <div key={book.id} className={classes.book}>
                  <div className={classes.closeBtn} onClick={() => handleRemoveBook(book)}>
                    <AiOutlineClose />
                  </div>
                  <Link href={`/details/${book.id}`}>
                    <Image src={book?.cover_image} width="175" height="375" className={classes.img} />
                  </Link>
                  <div className={classes.bookData}>
                    <h3 className={classes.title}>{book?.title}</h3>
                    <div className={classes.bookAndQuantity}>
                      <span className={classes.quantity}>{book.quantity} x</span>
                      <span className={classes.price}>
                        <span>$</span>
                        {book?.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className={classes.noBooks}>No books in the cart. Go Shopping!</h1>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.totalBookMsg}>Total books: {books?.length}</div>
          <div className={classes.subtotalCheckoutBtns}>
            <span className={classes.subtotal}>Subtotal: ${totalPrice > 100 ? totalPrice : totalPrice}</span>
            <span onClick={handleCheckout} disabled={books?.length === 0} className={classes.orderNowBtn}>
              Order
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
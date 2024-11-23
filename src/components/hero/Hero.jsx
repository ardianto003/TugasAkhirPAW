import React from 'react'
import classes from './hero.module.css'

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Cari buku favoritmu disini!</h2>
        <p className={classes.desc}>
        Setiap Halaman Membawa Anda ke Dunia Baru. Temukan, Jelajahi, dan Hidupkan Kisah-Kisah Hebat Bersama Kami!
        </p>
        <div className={classes.inputContainer}>
          <input type="email"  placeholder="johndoe@gmail.com" />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
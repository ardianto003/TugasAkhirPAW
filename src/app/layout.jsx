"use client"
import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import FreeDelivery from '@/components/freeDelivery/FreeDelivery'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SessionProvider>
              <FreeDelivery />
              <Navbar />
              {children}
              <Footer />
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
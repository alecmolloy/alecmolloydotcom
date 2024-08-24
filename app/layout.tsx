import './global.css'
import type React from 'react'
import { Instrument_Serif, Work_Sans } from 'next/font/google'

export const workSans = Work_Sans({
  subsets: ['latin-ext'],
  variable: '--font-work-sans',
  style: ['normal', 'italic'],
})

export const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin-ext'],
  style: 'normal',
  variable: '--font-instrument-serif',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

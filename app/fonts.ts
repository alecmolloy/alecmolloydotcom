import { Instrument_Sans, Instrument_Serif } from 'next/font/google'

export const instrumentSans = Instrument_Sans({
  subsets: ['latin-ext'],
  variable: '--font-instrument-sans',
  style: ['normal', 'italic'],
})

export const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin-ext'],
  style: 'normal',
  variable: '--font-instrument-serif',
})

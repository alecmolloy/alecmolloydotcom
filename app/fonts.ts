import localFont from 'next/font/local'

export const instrumentSans = localFont({
  src: [
    {
      path: '../public/fonts/InstrumentSans-App.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/InstrumentSans-App-Italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-sans',
})

export const instrumentSerif = localFont({
  src: [
    {
      path: '../public/fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
})

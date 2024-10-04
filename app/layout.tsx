import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type React from 'react'
import { instrumentSerif, instrumentSans } from './fonts'
import './global.css'
import './theme.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={instrumentSans.variable}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' sizes='any' />
      </head>
      <body
        className={[instrumentSans.variable, instrumentSerif.variable].join(
          ' ',
        )}
      >
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}

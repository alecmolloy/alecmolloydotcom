import { instrumentSerif, workSans } from './fonts'
import '@radix-ui/themes/styles.css'
import './global.css'
import './theme.css'
import type React from 'react'
import { Theme } from '@radix-ui/themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' sizes='any' />
      </head>
      <body className={[workSans.variable, instrumentSerif.variable].join(' ')}>
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}

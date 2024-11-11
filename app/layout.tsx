import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { SquircleNoScript } from '@squircle-js/react'
import { Analytics } from '@vercel/analytics/react'
import type React from 'react'
import { instrumentSans, instrumentSerif } from './fonts'
import './global.css'
import './theme.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body
        className={[instrumentSans.variable, instrumentSerif.variable].join(
          ' ',
        )}
        style={{
          position: 'relative',
        }}
      >
        <SquircleNoScript />
        <Analytics />
        <Theme id='theme-root'>{children}</Theme>
      </body>
    </html>
  )
}

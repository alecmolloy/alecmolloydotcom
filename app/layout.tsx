import './global.css'
import type React from 'react'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
  params: any
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

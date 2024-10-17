import * as React from 'react'
import { createPortal } from 'react-dom'

export default function ClientOnlyPortal({
  children,
  selector,
}: {
  children: React.ReactNode
  selector: string
}) {
  const ref = React.useRef<Element | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}

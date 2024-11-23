import NextLink from 'next/link'
import React from 'react'

type LinkProps = React.ComponentProps<typeof NextLink> & {
  ref?: React.RefObject<HTMLAnchorElement>
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  style,
  ref,
  ...props
}) => {
  return (
    <NextLink
      {...props}
      style={{
        color: '#0070f3',
        textDecorationStyle: 'wavy',
        textDecorationThickness: '1.5px',
        ...style,
      }}
      ref={ref}
      href={href}
    >
      {children}
    </NextLink>
  )
}

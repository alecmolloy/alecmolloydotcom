import NextLink from 'next/link'
import React from 'react'

type LinkProps = React.ComponentProps<typeof NextLink>

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, children, style, ...props }, ref) {
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
  },
)

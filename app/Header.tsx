import Link from 'next/link'
import React from 'react'

interface Props {
  breadcrumbs?: string[]
}

const navLinks = ['about', 'things']

export const Header: React.FunctionComponent<Props> = ({
  breadcrumbs = [],
}) => {
  let link = ''
  return (
    <header className='wrapper'>
      <h1
        style={{
          lineHeight: '1.1em',
          marginBottom: '0.5rem',
        }}
      >
        <Link
          key='/'
          href='/'
          style={{ color: '#444', textDecoration: 'none' }}
        >
          alecmolloy
        </Link>
        {breadcrumbs.map((breadcrumb) => {
          link += `${breadcrumb}/`
          return (
            <React.Fragment key={link}>
              <span
                style={{
                  color: '#888',
                }}
              >
                {' '}
                /{' '}
              </span>
              <Link
                href={`/${link}`}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                }}
              >
                {breadcrumb}
              </Link>
            </React.Fragment>
          )
        })}
      </h1>
      <nav>
        <ul
          style={{
            padding: 0,
            margin: '0 auto',
            color: '#aaa',
          }}
        >
          {navLinks.map((navLink) => (
            <li
              key={navLink}
              style={{
                listStyle: 'none',
                display: 'inline',
                paddingRight: '1em',
              }}
            >
              <Link
                href={`/${navLink}`}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                }}
              >
                {navLink}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

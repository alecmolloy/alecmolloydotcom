import { Link } from '../components/Link'
import React from 'react'
import { instrumentSerif, workSans } from './layout'

interface Props {
  breadcrumbs?: string[]
}

const navLinks = ['about', 'work']

export const Header: React.FunctionComponent<Props> = ({
  breadcrumbs = [],
}) => {
  let link = ''
  return (
    <header
      className='wrapper'
      style={{
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          lineHeight: '1.1em',
          marginBottom: '0.5rem',
        }}
        className={instrumentSerif.className}
      >
        <Link
          key='/'
          href='/'
          style={{ color: '#444', textDecoration: 'none' }}
        >
          Alec Molloy
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
            display: 'flex',
            columnGap: '1em',
            justifyContent: 'center',
          }}
        >
          {navLinks.map((navLink) => (
            <li
              key={navLink}
              className={workSans.className}
              style={{
                listStyle: 'none',
                display: 'inline',
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

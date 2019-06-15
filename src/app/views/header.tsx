import * as React from 'react'

export type Breadcrumb = string

const navLinks = ['portfolio', 'blog', 'about']

export default function(location: Array<Breadcrumb> = []) {
  return (
    <header>
      <div className='header-breadcrumbs' />
      <h1>
        <a key='/' href='/' className='header-breadcrumbs-head'>
          AlecSoft®
        </a>
        {location.map((breadcrumb) => (
          <a key={breadcrumb} className='header-breadcrumbs-crumb' href={breadcrumb}>
            {breadcrumb}
          </a>
        ))}
      </h1>
      <nav>
        <ul className='header-navigation'>
          {navLinks.map((navLink) => (
            <li key={navLink}>
              <a href={navLink}>{navLink}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

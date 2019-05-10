import * as React from 'react'

export type Breadcrumb = string

const navLinks = ['portfolio', 'blog', 'about']

export default function (location: Array<Breadcrumb> = []) {
  return (
    <header>
      <div className='header-breadcrumbs'>
      </div>
      <h1>
        <a href='/' className='header-breadcrumbs-head'>alec molloy</a>
        {location.map(breadcrumb => (
          <a className='header-breadcrumbs-crumb' href={breadcrumb}>{breadcrumb}</a>
        ))}
      </h1>
      <nav>
        <ul className='header-navigation'>
          {navLinks.map(navLink => (
            <li>
              <a href={navLink}>{navLink}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>

  )
}

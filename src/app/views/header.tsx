import * as React from 'react'

export type Breadcrumb = string

const navLinks = [
  'about',
  'things',
  // 'blog',
  // 'massage',
]

export default function(location: Array<Breadcrumb> = []) {
  let link = ''
  return (
    <header>
      <h1>
        <a key='/' href='/' className='header-breadcrumbs-head'>
          alecmolloy
        </a>
        {location.map((breadcrumb, index) => {
          link += `${breadcrumb}/`
          return (
            <a key={breadcrumb} className='header-breadcrumbs-crumb' href={`/${link}`}>
              {breadcrumb}
            </a>
          )
        })}
      </h1>
      <nav>
        <ul className='header-navigation'>
          {navLinks.map((navLink) => (
            <li key={navLink}>
              <a href={`/${navLink}`}>{navLink}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

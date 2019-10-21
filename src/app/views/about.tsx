import * as React from 'react'
import Header from './header'

const breadcrumbs = ['about']

export const AboutTemplate = () => {
  return (
    <>
      {Header(breadcrumbs)}
      <div className='wrapper'>
        <p>
          I am a web master, artist, and massage practitioner. I’ve built tools and taught
          creativity at <a href='http://adobe.com'>Adobe</a> and{' '}
          <a href='http://kano.me'>Kano Computing</a>, and managed mobile healthcare at Europe’s
          largest e-health provider, <a href='http://mindoktor.se'>Min Doktor</a>.
        </p>
        <p>
          Currently, I am building a next-generation software design and development tool at Utopia,
          and performing Thai massage out of my flat in Stoke Newington, London.
        </p>
      </div>
    </>
  )
}

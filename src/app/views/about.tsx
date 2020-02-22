import * as React from 'react'
import Header from './header'

const breadcrumbs = ['about']

export const AboutTemplate = () => {
  return (
    <>
      {Header(breadcrumbs)}
      <div className='wrapper'>
        <p>
          I am a web master, artist, and licensed bodyworker. I’ve built tools and taught creativity
          at <a href='http://adobe.com'>Adobe</a> and <a href='http://kano.me'>Kano Computing</a>,
          and managed mobile healthcare at <a href='http://mindoktor.se'>Min Doktor</a>.
        </p>
        <p>
          Currently I am between London and Los Angeles, building the future of interface design
          with Utopia.
        </p>
      </div>
    </>
  )
}

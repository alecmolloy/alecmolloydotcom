import * as React from 'react'
import Header from './header'

const breadcrumbs = ['about']

export const AboutTemplate = () => {
  return (
    <>
      {Header(breadcrumbs)}
      <div className='wrapper'>
        <p>
          Alec Molloy is a technologist and artist, working on the interface between device and
          body.
        </p>
        <p>
          He has worked on building creative tools and teaching creativity at{' '}
          <a href='http://kano.me'>Kano Computing</a> and <a href='http://adobe.com'>Adobe</a>, and
          mobile healthcare at Europe’s largest e-health provider,{' '}
          <a href='http://mindoktor.se'>Min Doktor</a>.
        </p>
        <p>
          He is currently a Creative Technologist at Utopia, building a next-generation software
          design tool, and training to become a Thai Fusion Massage practitioner and a Yoga teacher.
        </p>
      </div>
    </>
  )
}

import * as React from 'react'
import Header from './header'

export const FourOhFourTemplate = () => {
  return (
    <>
      {Header()}
      <div className='wrapper'>
        <p>404 :~(</p>
      </div>
    </>
  )
}

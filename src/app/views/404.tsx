import * as React from 'react'
import Header from './header'

export default React.memo(function () {
    return (
      <>
        {Header()}
        <div
          className='wrapper'
        >
          <p>404 :(</p>
        </div>
      </>
    )
  }
)

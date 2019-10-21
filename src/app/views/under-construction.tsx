import * as React from 'react'
import Header from './header'

interface UnderConstructionProps {}

export const UnderConstruction: React.FunctionComponent<UnderConstructionProps> = (props) => {
  return (
    <>
      {Header()}
      <div className='wrapper' style={{ textAlign: 'center' }}>
        <hr
          style={{
            height: 50,
            border: 'none',
            backgroundImage:
              'repeating-linear-gradient(45deg, yellow 0px, yellow 50px, black 50px, black 100px)',
          }}
        />
        <p>Website Under Construction! :)</p>
        <img src='/construction.gif' />
        {props.children}
        <hr
          style={{
            height: 50,
            border: 'none',
            backgroundImage:
              'repeating-linear-gradient(45deg, yellow 0px, yellow 50px, black 50px, black 100px)',
          }}
        />
      </div>
    </>
  )
}

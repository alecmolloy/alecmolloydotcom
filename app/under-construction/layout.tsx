import type React from 'react'
import { Navigation } from '../Navigation'

const UnderConstructionLayout: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => (
  <>
    <Navigation />
    <div style={{ textAlign: 'center' }}>
      <hr
        style={{
          height: 50,
          border: 'none',
          backgroundImage:
            'repeating-linear-gradient(45deg, yellow 0px, yellow 50px, black 50px, black 100px)',
        }}
      />
      <p>Website Under Construction! :)</p>
      {children}
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

export default UnderConstructionLayout

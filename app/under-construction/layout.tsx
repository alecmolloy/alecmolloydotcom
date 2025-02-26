import { Text as Txt } from '@radix-ui/themes'
import type React from 'react'

const UnderConstructionLayout: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => (
  <>
    <div style={{ textAlign: 'center' }}>
      <hr
        style={{
          height: 50,
          border: 'none',
          backgroundImage:
            'repeating-linear-gradient(45deg, yellow 0px, yellow 50px, black 50px, black 100px)',
        }}
      />
      <Txt>Website Under Construction! :)</Txt>
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

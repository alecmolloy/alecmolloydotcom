import type React from 'react'
import HeaderLayout from '../header/layout'

interface Props extends React.PropsWithChildren {
  breadcrumbs?: string[]
}

const UnderConstructionLayout: React.FunctionComponent<Props> = ({
  children,
  breadcrumbs,
}) => (
  <>
    <HeaderLayout breadcrumbs={breadcrumbs} />
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

import UnderConstructionLayout from '@/app/under-construction/layout'
import { Link } from '@/components/Link'
import { Text as Txt } from '@radix-ui/themes'
import type React from 'react'

const Elements3D: React.FunctionComponent = () => (
  <UnderConstructionLayout>
    <Txt>
      Elements 3D needs a bit of doing up before it is brought out into the
      world.
    </Txt>
    <Txt>
      <Link href='https://twitter.com/alecmolloy'>Tweet the webmaster</Link> if
      you want a showing.
    </Txt>
  </UnderConstructionLayout>
)

export default Elements3D

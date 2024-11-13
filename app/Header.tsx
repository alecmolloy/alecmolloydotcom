import { CTA, CTAVariant } from '@/components/CTA'
import { Flex, Link, Text as Txt } from '@radix-ui/themes'
import { instrumentSerif } from './fonts'
import { defaultContainerProps } from './theme'

export const Header = ({
  ctaVariant,
  portfolioPage,
}: {
  ctaVariant: CTAVariant
  portfolioPage?: boolean
}) => {
  return (
    <Flex
      id='header'
      direction='column'
      justify='center'
      align='center'
      style={{ position: 'relative' }}
      position='relative'
      {...(portfolioPage ? defaultContainerProps : {})}
    >
      <Flex
        width={{
          initial: '20em',
          sm: 'auto',
        }}
        justify='center'
        align='center'
        style={{ zIndex: 1 }}
      >
        <Txt
          style={{
            whiteSpace: 'pre-wrap',
          }}
          my={{ initial: '3', sm: '4' }}
          mb={{ initial: '0', sm: '4' }}
          size='9'
          align='center'
          className={instrumentSerif.className}
        >
          <Link href='/' style={{ color: '#000', textDecoration: 'none' }}>
            Alec&nbsp;Molloy Dot&nbsp;Com
          </Link>
        </Txt>
      </Flex>
      <Flex
        direction='row'
        align='center'
        justify='between'
        width='100%'
        position={{ xs: 'absolute' }}
        my={{ initial: '2', sm: 'auto' }}
        height='100%'
      >
        <Txt
          size='5'
          weight='medium'
          style={{
            color: '#000',
            borderRadius: '8px',
            cursor: 'default',
          }}
        >
          {portfolioPage ? (
            <Link href='/' style={{ textDecoration: 'none', color: '#000' }}>
              ← Home
            </Link>
          ) : (
            'For Hire'
          )}
        </Txt>
        <CTA variant={ctaVariant} />
      </Flex>
    </Flex>
  )
}

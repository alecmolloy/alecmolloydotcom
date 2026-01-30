import { BobbingText } from '@/components/BobbingText'
import { Squircle } from '@squircle-js/react'
import * as React from 'react'

interface CTAProps {
  variant?: CTAVariant
}

export const CTA: React.FunctionComponent<CTAProps> = ({
  variant = 'primary',
}) => {
  const backgroundColor =
    variant === 'primary' ? 'var(--international-orange)' : 'white'

  const textColor = variant === 'primary' ? 'white' : '#444'

  return (
    <a
      href='https://tantra112.app'
      target='_blank'
      rel='noopener noreferrer'
      style={{
        textDecoration: 'none',
      }}
    >
      <Squircle
        cornerRadius={100}
        style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 100,
          backgroundColor,
          color: textColor,
        }}
      >
        <BobbingText>Tantra 112 →</BobbingText>
      </Squircle>
    </a>
  )
}

export type CTAVariant = 'primary' | 'white'

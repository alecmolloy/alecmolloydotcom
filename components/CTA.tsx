import { BobbingText } from '@/app/components/BobbingText'
import { Squircle } from '@squircle-js/react'

interface CTAProps {
  variant?: 'primary' | 'white'
}

export const CTA: React.FunctionComponent<CTAProps> = ({
  variant = 'primary',
}) => {
  const backgroundColor =
    variant === 'primary' ? 'var(--international-orange)' : 'white'

  const textColor = variant === 'primary' ? 'white' : '#444'

  return (
    <a
      href='mailto:workwith@alecmolloy.com'
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
        <BobbingText>Work with me →</BobbingText>
      </Squircle>
    </a>
  )
}
'use client'
import { useSpringValue } from '@react-spring/web'
import { useEffect } from 'react'
import DitheredImage from './DitheredImage'

const MinPixelSize = 1
const MaxPixelSize = 40
const MaxScrollSpeed = 10

const DitheredImageWrapper: React.FC<{
  imageUrl: string
  darkColor: string
  lightColor: string
  maxWidth: number
  gammaCorrection: number
  toneMapLow: number
  toneMapHigh: number
}> = ({
  imageUrl,
  darkColor,
  lightColor,
  maxWidth,
  gammaCorrection,
  toneMapLow,
  toneMapHigh,
}) => {
  const pixelSize = useSpringValue(1)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false
    let peakScrollSpeed = 0

    const updateScrollSpeed = () => {
      const currentScrollY = window.scrollY
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY)
      if (scrollSpeed > peakScrollSpeed) {
        peakScrollSpeed = scrollSpeed
        const mappedPixelSize = Math.min(
          MaxPixelSize,
          MinPixelSize + (scrollSpeed / MaxScrollSpeed) * 2,
        )
        pixelSize.start(mappedPixelSize)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScrollEnd = () => {
      pixelSize.start(1)
      peakScrollSpeed = 0
    }

    let scrollTimeout: number | null = null

    const onScroll = (e: Event) => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollSpeed)
        ticking = true
      }
      // Set a timeout to call onScrollEnd after a delay
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout)
      }
      scrollTimeout = window.setTimeout(onScrollEnd, 100)
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [pixelSize])

  return (
    <DitheredImage
      imageUrl={imageUrl}
      darkColor={darkColor}
      lightColor={lightColor}
      maxWidth={maxWidth}
      pixelSize={pixelSize}
      gammaCorrection={gammaCorrection}
      toneMapLow={toneMapLow}
      toneMapHigh={toneMapHigh}
    />
  )
}

export default DitheredImageWrapper

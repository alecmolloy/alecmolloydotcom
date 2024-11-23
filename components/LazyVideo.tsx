import { PortfolioId } from '@/utils/utils'
import React, { useEffect, useRef, useState } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster?: string
  threshold?: number
  ref: React.RefObject<HTMLVideoElement>
}

export const LazyVideo: React.FunctionComponent<LazyVideoProps> = ({
  src,
  poster,
  threshold = 0.1,
  ref,
  ...props
}) => {
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold,
      },
    )

    const portfolioElement = document.getElementById(PortfolioId)

    if (portfolioElement != null) {
      observer.observe(portfolioElement)
    }

    return () => {
      if (portfolioElement != null) {
        observer.unobserve(portfolioElement)
      }
    }
  }, [hasIntersected, threshold])

  useEffect(() => {
    if (ref.current != null && hasIntersected) {
      ref.current.load()
    }
  }, [hasIntersected])

  return (
    <video ref={ref} poster={poster} {...props}>
      {hasIntersected && <source src={src} type='video/mp4' />}
    </video>
  )
}

'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithLoadingProps extends ImageProps {
  containerClassName?: string
}

export default function ImageWithLoading({
  containerClassName = '',
  className = '',
  alt,
  ...props
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

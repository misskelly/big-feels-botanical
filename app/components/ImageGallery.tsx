'use client'

import { useState } from 'react'

export type ImageItem = {
  id: string
  url?: string
  name?: string
}

const colorClasses = [
  'bg-[#1a535c]',
  'bg-[#4ecdc4]',
  'bg-[#bfd7ea]',
  'bg-[#ff6b6b]',
  'bg-[#ffe66d]',
]

const columnClasses =
  'columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2'

function GalleryImage({
  item,
  colorClass,
}: {
  item: ImageItem
  colorClass: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // No URL, or the image failed to load: show a colored block instead.
  if (!item.url || hasError) {
    return (
      <div className="mb-2 break-inside-avoid overflow-hidden rounded-lg">
        <div className={`min-h-[120px] w-full ${colorClass}`} />
      </div>
    )
  }

  return (
    <div className="relative mb-2 break-inside-avoid overflow-hidden rounded-lg">
      {!isLoaded && (
        <div className={`absolute inset-0 animate-pulse ${colorClass}`} />
      )}
      {/* Plain <img>: masonry columns need each image's natural height. */}
      <img
        src={item.url}
        alt={item.name || 'Gallery image'}
        loading="lazy"
        // An image served from cache can finish before React attaches onLoad.
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setIsLoaded(true)
        }}
        className={`block h-auto w-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}

export function ImageGallerySkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className={columnClasses} aria-hidden="true">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="mb-2 break-inside-avoid overflow-hidden rounded-lg"
        >
          <div
            className={`min-h-[120px] w-full animate-pulse ${
              colorClasses[idx % colorClasses.length]
            }`}
          />
        </div>
      ))}
    </div>
  )
}

export default function ImageGallery({ items }: { items: ImageItem[] }) {
  return (
    <div className={columnClasses}>
      {items.map((item, idx) => (
        <GalleryImage
          key={item.id}
          item={item}
          colorClass={colorClasses[idx % colorClasses.length]}
        />
      ))}
    </div>
  )
}

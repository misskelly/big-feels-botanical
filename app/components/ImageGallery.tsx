type ImageItem = {
  path: string
  publicUrl?: string
  name?: string
}

const colorClasses = [
  'bg-[#1a535c]',
  'bg-[#4ecdc4]',
  'bg-[#bfd7ea]',
  'bg-[#ff6b6b]',
  'bg-[#ffe66d]',
]

export default function ImageGallery({ items }: { items: ImageItem[] }) {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
      {items.map((it, idx) => {
        const colorClass = colorClasses[idx % colorClasses.length]

        return (
          <div
            key={it.path || idx}
            className={`break-inside-avoid mb-2 rounded-lg overflow-hidden ${colorClass}`}
          >
            {it.publicUrl ? (
              <img
                src={it.publicUrl}
                alt={it.name || 'Gallery image'}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full aspect-square" />
            )}
          </div>
        )
      })}
    </div>
  )
}

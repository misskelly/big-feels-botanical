type ImageItem = {
  path: string
  publicUrl?: string
  name?: string
}

function weightedRand(spec: Record<number, number>) {
  let sum = 0
  const r = Math.random()
  const keys = Object.keys(spec).map(Number)
  for (const k of keys) {
    sum += spec[k]
    if (r <= sum) return k
  }
  return keys[0]
}

const colorClasses = {
  1: 'bg-[#1a535c]',
  2: 'bg-[#4ecdc4]',
  3: 'bg-[#bfd7ea]',
  4: 'bg-[#ff6b6b]',
  5: 'bg-[#ffe66d]',
}

const spanClasses = {
  1: '',
  2: 'col-span-2 row-span-2 min-h-[200px]',
  3: 'col-span-3 row-span-3 min-h-[400px]',
}

export default function ImageGallery({ items }: { items: ImageItem[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1 auto-rows-[minmax(80px,auto)] [grid-auto-flow:dense] w-full">
      {items.map((it, idx) => {
        const span = weightedRand({ 1: 0.7, 2: 0.2, 3: 0.1 }) as 1 | 2 | 3
        const colorNum = weightedRand({
          1: 0.2,
          2: 0.2,
          3: 0.2,
          4: 0.2,
          5: 0.2,
        }) as 1 | 2 | 3 | 4 | 5

        return (
          <div
            key={it.path || idx}
            className={`min-h-[100px] bg-cover bg-center bg-no-repeat rounded-md ${spanClasses[span]} ${colorClasses[colorNum]}`}
            style={
              it.publicUrl
                ? { backgroundImage: `url(${it.publicUrl})` }
                : undefined
            }
            title={it.name}
          />
        )
      })}
    </div>
  )
}

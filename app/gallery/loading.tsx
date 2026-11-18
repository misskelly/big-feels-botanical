import { ImageGallerySkeleton } from '@/app/components/ImageGallery'
import { Heading } from '@/app/components/ui'

export default function GalleryLoading() {
  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Heading level={1} className="mb-8">
          Gallery
        </Heading>
        <ImageGallerySkeleton />
      </div>
    </section>
  )
}

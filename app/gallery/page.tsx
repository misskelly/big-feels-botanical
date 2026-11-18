import type { Metadata } from 'next'
import ImageGallery from '@/app/components/ImageGallery'
import { Heading, Body } from '@/app/components/ui'
import { getGalleryImages } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Floral arrangements by Big Feels Botanical.',
}

// Image URLs are signed for 7 days (see lib/gallery.ts). Re-render hourly so
// a cached page never serves links that have expired.
export const revalidate = 3600

export default async function GalleryPage() {
  const images = await getGalleryImages(200)

  return (
    <section aria-labelledby="gallery-heading" className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Heading level={1} id="gallery-heading" className="mb-8">
          Gallery
        </Heading>
        {images.length > 0 ? (
          <ImageGallery items={images} />
        ) : (
          <Body>New work is on its way. Check back soon.</Body>
        )}
      </div>
    </section>
  )
}

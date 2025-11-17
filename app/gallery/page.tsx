'use client'
import ImageGallery from 'app/components/ImageGallery'
import { useGetImages } from 'app/hooks/useGetImages'

export default function GalleryPage() {
  const { images, loading, error } = useGetImages('gallery')

  if (loading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Gallery</h1>
      <ImageGallery
        items={images.map((i) => ({
          path: i.path,
          publicUrl: i.publicUrl,
          name: i.name,
        }))}
      />
    </main>
  )
}

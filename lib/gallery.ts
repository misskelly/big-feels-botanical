import { db, storage } from './firebase-admin'

export interface GalleryImage {
  id: string
  name: string
  url: string
  contentType: string
}

export async function getGalleryImages(limit = 6): Promise<GalleryImage[]> {
  const collection = process.env.FIRESTORE_COLLECTION ?? 'gallery'

  const snapshot = await db
    .collection(collection)
    .orderBy('updated', 'desc')
    .limit(limit)
    .get()

  const images = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data()
      const bucket = storage.bucket()
      const file = bucket.file(data.path as string)
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      })

      return {
        id: doc.id,
        name: data.name as string,
        url,
        contentType: data.contentType as string,
      }
    }),
  )

  return images
}

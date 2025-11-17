import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'lib/firebase'
import { useEffect, useState } from 'react'

export type ImageDoc = {
  name: string
  path: string
  size?: number
  contentType?: string | null
  updated?: { seconds?: number } | null
  md5Hash?: string | null
  crc32c?: string | null
  publicUrl?: string
  storageBucket?: string
}

export function useGetImages(collectionName = 'images') {
  const [images, setImages] = useState<ImageDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    const colRef = collection(db, collectionName)
    const q = query(colRef, orderBy('updated', 'desc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        const docs: ImageDoc[] = []
        snap.forEach((d) => docs.push(d.data() as ImageDoc))
        console.log('Fetched images:', docs)
        setImages(docs)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore error:', err)
        setError(err)
        setLoading(false)
      },
    )

    return () => unsub()
  }, [collectionName])

  return { images, loading, error }
}

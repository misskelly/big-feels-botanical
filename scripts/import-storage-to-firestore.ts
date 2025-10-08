import { Storage } from '@google-cloud/storage'
import admin from 'firebase-admin'
import path from 'path'
import fs from 'fs'

// Configuration from env
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
const bucketName =
  process.env.FIREBASE_STORAGE_BUCKET ||
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const collectionName = process.env.FIRESTORE_COLLECTION || 'images'
const prefix = process.env.STORAGE_PREFIX || '' // folder prefix in storage to list

if (!keyPath) {
  console.error(
    'GOOGLE_APPLICATION_CREDENTIALS environment variable is required (path to service account JSON).',
  )
  process.exit(1)
}

if (!bucketName) {
  console.error(
    'FIREBASE_STORAGE_BUCKET (or NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) environment variable is required.',
  )
  process.exit(1)
}

async function main() {
  // read service account JSON
  let serviceAccount: Record<string, unknown>
  try {
    // keyPath was validated earlier; assert non-null for the fs call
    const raw = fs.readFileSync(keyPath as string, 'utf8')
    serviceAccount = JSON.parse(raw) as Record<string, unknown>
  } catch (err) {
    console.error('Failed to read or parse service account JSON:', err)
    process.exit(1)
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName,
  })

  const db = admin.firestore()
  const gcs = new Storage({ keyFilename: keyPath })
  const bucket = gcs.bucket(bucketName as string)

  console.log(`Listing objects in gs://${bucketName}/${prefix}`)
  const [files] = await bucket.getFiles({ prefix })

  console.log(`Found ${files.length} files`)

  for (const file of files) {
    try {
      // skip folders
      if (file.name.endsWith('/')) continue

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${encodeURI(file.name)}`

      // get metadata
      const [meta] = await file.getMetadata()
      const doc = {
        name: path.basename(file.name),
        path: file.name,
        size: parseInt(String(meta.size ?? '0'), 10),
        contentType: meta.contentType || null,
        updated: meta.updated ? new Date(meta.updated) : null,
        md5Hash: meta.md5Hash || null,
        crc32c: meta.crc32c || null,
        publicUrl,
        storageBucket: bucketName,
      }

      // Write to Firestore using path-safe doc id (base64url of file path)
      const docId = Buffer.from(file.name).toString('base64url')
      const ref = db.collection(collectionName).doc(docId)

      await ref.set(doc, { merge: true })
      console.log(`Imported ${file.name} -> ${collectionName}/${docId}`)
    } catch (err) {
      console.error(`Failed to import ${file.name}:`, err)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

import admin from 'firebase-admin'
import { Storage } from '@google-cloud/storage'
import { readFileSync } from 'fs'

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
const bucketName =
  process.env.FIREBASE_STORAGE_BUCKET ||
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const collectionName = process.env.FIRESTORE_COLLECTION || 'images'
const prefix = process.env.STORAGE_PREFIX || ''

if (!keyPath) {
  console.error(
    'GOOGLE_APPLICATION_CREDENTIALS environment variable is required (path to service account JSON).',
  )
  process.exit(1)
}
if (!bucketName) {
  console.error(
    'FIREBASE_STORAGE_BUCKET or NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET environment variable is required.',
  )
  process.exit(1)
}

// Read service account
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8')) as Record<
  string,
  unknown
>

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: bucketName,
})

const db = admin.firestore()
const storage = new Storage({ keyFilename: keyPath })
const bucket = storage.bucket(bucketName)

async function importImages() {
  console.log(`Listing files in gs://${bucketName}/${prefix}`)
  const [files] = await bucket.getFiles({ prefix })

  console.log(
    `Found ${files.length} files. Importing to '${collectionName}'...`,
  )

  for (const file of files) {
    // Skip folders
    if (file.name.endsWith('/')) {
      console.log(`⊘ Skipping folder: ${file.name}`)
      continue
    }

    try {
      const [metadata] = await file.getMetadata()

      // Generate signed URL (valid for 1 year)
      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
      })

      const docId = Buffer.from(file.name).toString('base64url')
      const docData = {
        name: metadata.name || file.name,
        path: file.name,
        size: metadata.size ? Number(metadata.size) : 0,
        contentType: metadata.contentType || null,
        updated: metadata.updated
          ? admin.firestore.Timestamp.fromDate(new Date(metadata.updated))
          : null,
        md5Hash: metadata.md5Hash || null,
        crc32c: metadata.crc32c || null,
        publicUrl: signedUrl,
        storageBucket: bucketName,
      }

      await db.collection(collectionName).doc(docId).set(docData)
      console.log(`✓ Imported: ${file.name}`)
    } catch (err) {
      console.error(`✗ Failed to import ${file.name}:`, err)
    }
  }

  console.log('Import complete.')
}

importImages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Import failed:', err)
    process.exit(1)
  })

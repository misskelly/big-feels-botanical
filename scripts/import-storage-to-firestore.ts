// Indexes the image files that already exist in Firebase Storage as documents
// in a Firestore collection, which the site reads via lib/gallery.ts.
//
//   pnpm import-images             write documents
//   DRY_RUN=1 pnpm import-images   list what would be written, change nothing
//
// See scripts/README.md for setup.
import { Timestamp } from 'firebase-admin/firestore'
import { db, storage } from '../lib/firebase-admin.ts'

const collectionName = process.env.FIRESTORE_COLLECTION || 'gallery'
const prefix = process.env.STORAGE_PREFIX || ''
const dryRun = Boolean(process.env.DRY_RUN)

async function importImages() {
  const bucket = storage.bucket()
  console.log(`Listing files in gs://${bucket.name}/${prefix}`)
  const [files] = await bucket.getFiles({ prefix })

  console.log(
    `Found ${files.length} files. ${dryRun ? 'Dry run for' : 'Importing to'} '${collectionName}'...`,
  )

  let imported = 0
  let failed = 0

  for (const file of files) {
    // Skip folder placeholders
    if (file.name.endsWith('/')) continue

    try {
      const [metadata] = await file.getMetadata()

      if (!metadata.contentType?.startsWith('image/')) {
        console.log(`- Skipping non-image: ${file.name}`)
        continue
      }

      // Stable id derived from the storage path, so re-running is idempotent.
      const docId = Buffer.from(file.name).toString('base64url')
      const docData = {
        name: file.name.split('/').pop() ?? file.name,
        path: file.name,
        size: metadata.size ? Number(metadata.size) : 0,
        contentType: metadata.contentType,
        updated: metadata.updated
          ? Timestamp.fromDate(new Date(metadata.updated))
          : null,
      }

      if (!dryRun) {
        await db.collection(collectionName).doc(docId).set(docData)
      }
      imported++
      console.log(`${dryRun ? '•' : '✓'} ${file.name}`)
    } catch (err) {
      failed++
      console.error(`✗ Failed to import ${file.name}:`, err)
    }
  }

  console.log(
    `${dryRun ? 'Dry run complete' : 'Import complete'}: ${imported} images, ${failed} failed.`,
  )
  if (failed > 0) process.exitCode = 1
}

importImages().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})

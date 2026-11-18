import {
  getApps,
  initializeApp,
  applicationDefault,
  cert,
  type ServiceAccount,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

export const DEFAULT_STORAGE_BUCKET = 'big-feels-botanical.firebasestorage.app'

// Hosts like Vercel can't read a key file from disk, so the service account
// JSON can be supplied inline via FIREBASE_SERVICE_ACCOUNT_KEY. Locally we fall
// back to GOOGLE_APPLICATION_CREDENTIALS (a path to the key file).
function getCredential() {
  const inlineKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (!inlineKey) return applicationDefault()

  let parsed: ServiceAccount
  try {
    parsed = JSON.parse(inlineKey) as ServiceAccount
  } catch {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is set but is not valid JSON. Paste the full contents of the service account key file.',
    )
  }
  return cert(parsed)
}

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: getCredential(),
      storageBucket:
        process.env.FIREBASE_STORAGE_BUCKET ?? DEFAULT_STORAGE_BUCKET,
    })

export const db = getFirestore(app)
export const storage = getStorage(app)

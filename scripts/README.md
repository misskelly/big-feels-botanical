This script imports image files that already exist in Firebase Storage into a Firestore collection as documents.

Setup

1. Create a Firebase service account JSON key and download it. Store the path somewhere on your machine.
2. Install dependencies (from project root):

```bash
pnpm add -w firebase-admin @google-cloud/storage
```

3. Environment variables:

- GOOGLE_APPLICATION_CREDENTIALS: Path to the service account JSON file
- FIREBASE_STORAGE_BUCKET: Storage bucket name (e.g. big-feels-botanical.appspot.com or the value in your `lib/firebase.ts`)
  A likely value for this project (from `lib/firebase.ts`) is `big-feels-botanical.firebasestorage.app`.
- FIRESTORE_COLLECTION (optional): Firestore collection to write to (default: images)
- STORAGE_PREFIX (optional): prefix/folder in storage to list (default: root)

Run

```bash
# from project root
# compile with ts-node or run with ts-node-esm
npx ts-node-esm scripts/import-storage-to-firestore.ts
```

Or install a fast runner like `tsx` and run directly:

```bash
pnpm add -D tsx
npx tsx scripts/import-storage-to-firestore.ts
```

Notes

- The script uses the admin SDK and requires a service account key.
- Documents are created with a stable base64url of the storage object path as the document id to avoid collisions.

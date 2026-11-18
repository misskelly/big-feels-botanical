# Scripts

## `import-storage-to-firestore.ts`

Indexes the image files that already exist in Firebase Storage as documents in
a Firestore collection. The site reads that collection (see `lib/gallery.ts`)
to render the home page and `/gallery`, so run this after uploading new images
to Storage.

### Setup

1. Create a Firebase service account key (Firebase Console → Project settings →
   Service accounts) and save it at `.config/firebase/big-feels-botanical-sa.json`.
   That folder is gitignored.
2. Copy `.env.example` to `.env` and adjust if needed.

Requires Node 22.18 or newer, which runs TypeScript files directly.

### Run

```bash
# Preview what would be written, without changing anything
DRY_RUN=1 pnpm import-images

# Write the documents
pnpm import-images
```

### Environment variables

- `GOOGLE_APPLICATION_CREDENTIALS`: path to the service account key file
- `FIREBASE_STORAGE_BUCKET` (optional): defaults to
  `big-feels-botanical.firebasestorage.app`
- `FIRESTORE_COLLECTION` (optional): collection to write to (default `gallery`)
- `STORAGE_PREFIX` (optional): only import files under this folder
- `DRY_RUN` (optional): set to any value to list files without writing

### Notes

- Each document id is the base64url of the storage path, so re-running the
  script updates existing documents rather than duplicating them.
- Non-image files are skipped.
- Documents store the storage path, not a download URL. The site signs
  short-lived URLs when it renders.

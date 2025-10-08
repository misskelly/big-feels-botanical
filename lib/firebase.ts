import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAfDBvMRSbSE_9ibCL1Hy2QkyWL5jm8ViA',
  authDomain: 'big-feels-botanical.firebaseapp.com',
  projectId: 'big-feels-botanical',
  storageBucket: 'big-feels-botanical.firebasestorage.app',
  messagingSenderId: '439747155001',
  appId: '1:439747155001:web:97a3d54fae4b631115a9e8',
  measurementId: 'G-CTLVCB270J',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

// Initialize Firebase services
export const storage = getStorage(app)
export const db = getFirestore(app)

import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import type { Database } from 'firebase/database'

// ─────────────────────────────────────────────────────────────────────────────
// Paste your Firebase project config here.
// Get it from: Firebase Console → Project Settings → Your apps → SDK setup
// Make sure Realtime Database is enabled in your project.
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "REPLACE_API_KEY",
  authDomain:        "REPLACE_AUTH_DOMAIN",
  databaseURL:       "REPLACE_DATABASE_URL",
  projectId:         "REPLACE_PROJECT_ID",
  storageBucket:     "REPLACE_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_SENDER_ID",
  appId:             "REPLACE_APP_ID",
}

// Only initialise if all placeholder values have been replaced
const configured = Object.values(firebaseConfig).every(v => !v.startsWith('REPLACE_'))

export let db: Database | null = null

if (configured) {
  try {
    const app = getApps().length === 0
      ? initializeApp(firebaseConfig)
      : getApps()[0]
    db = getDatabase(app)
  } catch (e) {
    console.warn('Firebase init failed:', e)
  }
}

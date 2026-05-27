import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import type { Database } from 'firebase/database'

// ─────────────────────────────────────────────────────────────────────────────
// Paste your Firebase project config here.
// Get it from: Firebase Console → Project Settings → Your apps → SDK setup
// Make sure Realtime Database is enabled in your project.
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyANRAXenmLkp68WSwUQ8-3XXnYzr61OLC0",
  authDomain:        "website-2daec.firebaseapp.com",
  databaseURL:       "https://website-2daec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "website-2daec",
  storageBucket:     "website-2daec.firebasestorage.app",
  messagingSenderId: "377658765649",
  appId:             "1:377658765649:web:2697db5df2ef3035842370",
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

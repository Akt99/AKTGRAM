# AKTGRAM (Social Media Template): 
Minimal social, maximum signal. AKTGRAM is a focused micro‑social prototype built for fast posting, lightweight engagement, and a clean creator‑first UI.

## Why It Exists
AKTGRAM explores a niche: a private‑feeling social feed with a creator‑grade UI, tuned for quick posts, fast reads, and frictionless engagement.

## Stack
- Expo + React Native (iOS/Android)
- Firebase as BaaS (Backend‑as‑a‑Service)
- Firestore for posts, likes, and comments
- Firebase Auth for Google sign‑in

## Firebase, In Practice
- Firebase BaaS: zero‑ops backend to ship fast without managing servers
- Firestore: real‑time feed, ordered timelines, and comment threads
- Firebase Auth: identity and session management
- (Optional) Firebase Storage: media uploads when enabled

## Features
- Real‑time feed with likes and comments
- Profile photos on posts and comments
- Google sign‑in
- Clean, dark, creator‑centric UI
## Limitations:
- Firestore doesn't allow media storage for free, paid subscription is needed, hence photos can't be posted as of now


## Local Setup
1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app
   ```bash
   npx expo start
   ```

## Environment Variables
Create a `.env` file in the project root:
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID=...
```

## Notes
- If you use a custom dev client, rebuild after native config changes.
- Storage uploads require a Firebase Storage bucket.

## Credits
- Built with [Expo](https://expo.dev)
- Firebase by [Google](https://firebase.google.com)

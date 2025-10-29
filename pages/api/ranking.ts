import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

try {
  initializeApp({ credential: cert(serviceAccount) });
} catch (e) {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getFirestore();
  const snapshot = await db.collection('ranking').orderBy('points', 'desc').get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.status(200).json({ users });
}
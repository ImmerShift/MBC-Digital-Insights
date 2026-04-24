import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const DEFAULT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzz2UV_EPrpFUKlxIyQ71KaVlKihSxXrgAOPbnGPLhn__0LPDier3lEH4z0KoAtiqLnog/exec';

export const getWebAppUrl = async (): Promise<string> => {
  if (!auth.currentUser) return DEFAULT_WEB_APP_URL;
  try {
    const docRef = doc(db, 'user_settings', auth.currentUser.uid);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().webAppUrl) {
      return snap.data().webAppUrl;
    }
  } catch (error) {
    console.error("Error fetching web app URL:", error);
  }
  return DEFAULT_WEB_APP_URL;
};

export const saveWebAppUrl = async (url: string) => {
  if (!auth.currentUser) throw new Error("User must be logged in to save settings.");
  const docRef = doc(db, 'user_settings', auth.currentUser.uid);
  await setDoc(docRef, { 
    webAppUrl: url, 
    updatedAt: serverTimestamp() 
  }, { merge: true });
};

// Utility formatters
const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const fetchPlatformData = async (
  platform: string, 
  startDate: string, 
  endDate: string, 
  signal?: AbortSignal
) => {
  const url = await getWebAppUrl();
  const res = await fetch(`${url}?platform=${platform}&startDate=${startDate}&endDate=${endDate}`, { signal });
  
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch ${platform} data`);
  
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  
  return json;
};

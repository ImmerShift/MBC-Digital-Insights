import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const DEFAULT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzrEv2Dqx7dddfr5hqG9mlDgygiKt6C8sSsjajEcEzwRqZLesmGqC6nAYAx1ZjpV2G7-g/exec';

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

export async function fetchGA4Data() {
  const url = await getWebAppUrl();
  const res = await fetch(`${url}?platform=ga4`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return {
    sessions: data.overview.rows[0].metricValues[0].value,
    users: data.overview.rows[0].metricValues[1].value,
    newUsers: data.overview.rows[0].metricValues[2].value,
    pageViews: data.overview.rows[0].metricValues[3].value,
    bounceRate: (parseFloat(data.overview.rows[0].metricValues[4].value) * 100).toFixed(1),
    avgSession: data.overview.rows[0].metricValues[5].value,
    topPages: data.topPages.rows.map((r: any) => ({ path: r.dimensionValues[0].value, views: r.metricValues[0].value })),
    trafficSources: data.trafficSources.rows.map((r: any) => ({ source: r.dimensionValues[0].value, medium: r.dimensionValues[1].value, sessions: r.metricValues[0].value }))
  };
}

export async function fetchGSCData() {
  const url = await getWebAppUrl();
  const res = await fetch(`${url}?platform=gsc`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return {
    clicks: data.overview.rows?.[0]?.clicks || 0,
    impressions: data.overview.rows?.[0]?.impressions || 0,
    ctr: data.overview.rows?.[0]?.ctr || 0,
    position: data.overview.rows?.[0]?.position || 0,
    topQueries: data.queries.rows || []
  };
}

export async function fetchYouTubeData() {
  const url = await getWebAppUrl();
  const res = await fetch(`${url}?platform=youtube`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return {
    views: data.overview.rows?.[0]?.[0] || 0,
    watchMinutes: data.overview.rows?.[0]?.[1] || 0,
    avgDuration: data.overview.rows?.[0]?.[2] || 0,
    subscribersGained: data.overview.rows?.[0]?.[3] || 0,
    topVideos: data.topVideos.rows || []
  };
}

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

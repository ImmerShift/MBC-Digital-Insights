import { useState, useEffect } from 'react';
import { fetchPlatformData } from '../utils/api';
import { useDateRange } from '../contexts/DateContext';
import { 
  GA4Data, GSCData, YouTubeData,
  GASGA4Response, GASGSCResponse, GASYouTubeResponse
} from '../types';

export function useGA4Data() {
  const [data, setData] = useState<GA4Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const json = (await fetchPlatformData('ga4', startDate, endDate, abortController.signal)) as GASGA4Response;
        
        let overview = {
          sessions: 0, users: 0, newUsers: 0, pageViews: 0, bounceRate: 0, avgSessionDuration: 0
        };
        
        const m = json.overview?.rows?.[0]?.metricValues;
        if (m) {
          overview = {
            sessions: parseInt(m[0]?.value ?? '0') || 0,
            users: parseInt(m[1]?.value ?? '0') || 0,
            newUsers: parseInt(m[2]?.value ?? '0') || 0,
            pageViews: parseInt(m[3]?.value ?? '0') || 0,
            bounceRate: parseFloat(m[4]?.value ?? '0') || 0,
            avgSessionDuration: parseFloat(m[5]?.value ?? '0') || 0
          };
        }

        const topPages = (json.topPages?.rows ?? []).map((r) => ({
          path: r.dimensionValues?.[0]?.value ?? 'Unknown',
          views: parseInt(r.metricValues?.[0]?.value ?? '0') || 0
        }));

        const trafficSources = (json.trafficSources?.rows ?? []).map((r) => ({
          source: r.dimensionValues?.[0]?.value ?? 'Unknown',
          medium: r.dimensionValues?.[1]?.value ?? 'Unknown',
          sessions: parseInt(r.metricValues?.[0]?.value ?? '0') || 0
        }));

        setData({ overview, topPages, trafficSources });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [startDate, endDate]);

  return { overview: data?.overview, topPages: data?.topPages, trafficSources: data?.trafficSources, isLoading, error };
}

export function useGSCData() {
  const [data, setData] = useState<GSCData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const json = (await fetchPlatformData('gsc', startDate, endDate, abortController.signal)) as GASGSCResponse;
        
        let overview = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
        const row = json.overview?.rows?.[0];
        
        if (row) {
            overview = {
                clicks: row.clicks ?? 0,
                impressions: row.impressions ?? 0,
                ctr: row.ctr ?? 0,
                position: row.position ?? 0
            };
        }

        const topQueries = (json.queries?.rows ?? []).map((r) => ({
            query: r.keys?.[0] ?? 'Unknown',
            clicks: r.clicks ?? 0,
            impressions: r.impressions ?? 0,
            ctr: r.ctr ?? 0,
            position: r.position ?? 0
        }));

        setData({ overview, topQueries });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [startDate, endDate]);

  return { overview: data?.overview, topQueries: data?.topQueries, isLoading, error };
}

export function useYouTubeData() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate } = useDateRange();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const json = (await fetchPlatformData('youtube', startDate, endDate, abortController.signal)) as GASYouTubeResponse;
        
        let overview = { views: 0, watchMinutes: 0, avgDuration: 0, subscribersGained: 0, subscribersLost: 0 };
        const r = json.overview?.rows?.[0];
        if (r) {
          overview = {
            views: r[0] ?? 0,
            watchMinutes: r[4] ?? 0,
            avgDuration: r[5] ?? 0,
            subscribersGained: 0,
            subscribersLost: 0
          };
        }

        const topVideos = (json.topVideos?.rows ?? []).map((v) => ({
          videoId: String(v[0] ?? ''),
          views: Number(v[1] ?? 0),
          likes: Number(v[2] ?? 0),
          shares: Number(v[3] ?? 0)
        }));

        setData({ overview, topVideos });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [startDate, endDate]);

  return { overview: data?.overview, topVideos: data?.topVideos, isLoading, error };
}

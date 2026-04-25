export interface GASGA4Response {
  overview?: {
    rows?: {
      metricValues?: { value: string }[];
    }[];
  };
  topPages?: {
    rows?: {
      dimensionValues?: { value: string }[];
      metricValues?: { value: string }[];
    }[];
  };
  trafficSources?: {
    rows?: {
      dimensionValues?: { value: string }[];
      metricValues?: { value: string }[];
    }[];
  };
  error?: string;
}

export interface GASGSCResponse {
  overview?: {
    rows?: {
      clicks?: number;
      impressions?: number;
      ctr?: number;
      position?: number;
    }[];
  };
  queries?: {
    rows?: {
      keys?: string[];
      clicks?: number;
      impressions?: number;
      ctr?: number;
      position?: number;
    }[];
  };
  error?: string;
}

export interface GASYouTubeResponse {
  overview?: {
    rows?: number[][];
  };
  topVideos?: {
    rows?: (string | number)[][];
  };
  error?: string;
}

export interface GA4Overview {
  sessions: number;
  users: number;
  newUsers: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface GA4TopPage {
  path: string;
  views: number;
  name?: string; // from mock data
  avgTime?: string; // from mock data
  trend?: string; // from mock data
}

export interface GA4TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  name?: string; // from mock
  users?: number; // from mock
  color?: string; // from mock
}

export interface GA4Data {
  overview: GA4Overview;
  topPages: GA4TopPage[];
  trafficSources: GA4TrafficSource[];
}

export interface GSCOverview {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  avgCtr?: number; // from mock
  avgPosition?: number; // from mock
}

export interface GSCQuery {
  keys?: string[];
  query?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  id?: string; // from mock
}

export interface GSCData {
  overview: GSCOverview;
  topQueries: GSCQuery[];
}

export interface YouTubeOverview {
  views: number;
  watchMinutes: number;
  avgDuration: number;
  subscribersGained: number;
  subscribersLost: number;
  watchTime?: number; // from mock
  subscribers?: number; // from mock
  avgViewDuration?: string; // from mock
}

export interface YouTubeVideo {
  videoId?: string;
  title?: string;
  format?: string;
  views: number;
  likes?: number;
  shares?: number;
  watchTime?: number;
  engagement?: number;
  id?: string; // from mock
}

export interface YouTubeData {
  overview: YouTubeOverview;
  topVideos: YouTubeVideo[];
}

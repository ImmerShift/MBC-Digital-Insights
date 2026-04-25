export async function generateMonthlyDraft(mockData: any, proxyUrl: string): Promise<string> {
  
  // 1. Safe parsing for arrays (prevents empty string bugs)
  const metaAdsText = mockData.metaAds && mockData.metaAds.length > 0 
    ? mockData.metaAds.map((ad: any) => `Campaign '${ad.name}' spent ${(ad.spend / 1000000).toFixed(1)}M IDR, driving ${ad.conversions} conversions (ROAS: ${ad.roas}x).`).join(' ')
    : "No Meta Ads campaigns were tracked this month.";

  const organicText = mockData.metaOrganic && mockData.metaOrganic.length > 0
    ? `Top organic content: ${mockData.metaOrganic.map((p: any) => `'${p.title}' reached ${p.reach} people.`).join(' ')}`
    : "No organic social data was tracked this month.";

  // 2. The Bulletproof Translator (fixes the watchTime vs watchMinutes bug)
  const parsedContext = {
    ga4_traffic: `The website had ${mockData.ga4?.sessions || 0} total sessions and ${mockData.ga4?.users || 0} users this month. The bounce rate was ${mockData.ga4?.bounceRate || 0}%.`,
    meta_ads: metaAdsText,
    organic_social: organicText,
    youtube: `YouTube channel generated ${mockData.youtube?.views || 0} views and ${mockData.youtube?.watchMinutes || 0} watch minutes.`
  };

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8", 
      },
      body: JSON.stringify(parsedContext),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.text; 

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}

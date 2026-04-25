export async function generateMonthlyDraft(mockData: any, proxyUrl: string): Promise<string> {
  
  // Step 3.3: The Translator
  const parsedContext = {
    ga4_traffic: `The website had ${mockData.ga4.sessions} total sessions and ${mockData.ga4.users} users this month. The bounce rate was ${mockData.ga4.bounceRate}%.`,
    
    meta_ads: mockData.metaAds.map((ad: any) => `The campaign '${ad.name}' spent ${(ad.spend / 1000000).toFixed(1)}M IDR, driving ${ad.conversions} guest actions with a ROAS of ${ad.roas}x.`).join(' '),
    
    organic_social: `Our top performing organic content: ${mockData.metaOrganic.map((p: any) => `'${p.title}' (${p.format}) reached ${p.reach} people.`).join(' ')}`,
    
    youtube: `YouTube storytelling generated ${mockData.youtube.views} views and ${mockData.youtube.watchTime} watch minutes.`
  };

  // Step 3.4 & 3.5: Mailing the Letter & Receiving the Story
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

    return data.text; // This is the beautiful markdown story!

  } catch (error) {
    console.error("Error generating narrative:", error);
    throw error;
  }
}
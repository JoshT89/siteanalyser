import { NextRequest, NextResponse } from 'next/server';

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Check if API key is available
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      // Fallback to basic analysis without PageSpeed Insights
      console.log('No Google API key found, using fallback analysis');
      return await performBasicAnalysis(url);
    }

    // Build API URL with API key
    const apiUrl = `${PAGESPEED_API}?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&key=${apiKey}`;
    
    // Fetch PageSpeed Insights
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('PageSpeed API error:', res.status, errorText);
      
      if (res.status === 403) {
        return NextResponse.json({ 
          error: 'Google API key is invalid or quota exceeded. Please check your API key configuration.' 
        }, { status: 500 });
      }
      
      if (res.status === 400) {
        return NextResponse.json({ 
          error: 'Invalid URL or domain not accessible. Please check the URL and try again.' 
        }, { status: 400 });
      }
      
      return NextResponse.json({ 
        error: `PageSpeed Insights API error: ${res.status} ${res.statusText}` 
      }, { status: 500 });
    }
    
    const data = await res.json();
    
    // Parse Lighthouse results
    const lhr = data.lighthouseResult;
    if (!lhr) {
      return NextResponse.json({ error: 'No Lighthouse data returned from PageSpeed Insights' }, { status: 500 });
    }
    
    const performance = {
      score: Math.round((lhr.categories.performance.score || 0) * 100),
      loadTime: lhr.audits['interactive']?.numericValue || 0,
      domContentLoaded: lhr.audits['dom-content-loaded']?.numericValue || 0,
      firstPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
      firstContentfulPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
      largestContentfulPaint: lhr.audits['largest-contentful-paint']?.numericValue || 0,
      cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
      totalBlockingTime: lhr.audits['total-blocking-time']?.numericValue || 0,
      speedIndex: lhr.audits['speed-index']?.numericValue || 0,
      totalSize: lhr.audits['total-byte-weight']?.numericValue || 0,
      imageSize: 0,
      scriptSize: 0,
      cssSize: 0,
      requestCount: lhr.audits['network-requests']?.details?.items?.length || 0,
      imageCount: lhr.audits['network-requests']?.details?.items?.filter((i:any) => i.resourceType === 'Image').length || 0,
      scriptCount: lhr.audits['network-requests']?.details?.items?.filter((i:any) => i.resourceType === 'Script').length || 0,
      cssCount: lhr.audits['network-requests']?.details?.items?.filter((i:any) => i.resourceType === 'Stylesheet').length || 0,
      issues: lhr.categories.performance.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.title),
      recommendations: lhr.categories.performance.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.description),
    };
    
    const seo = {
      score: Math.round((lhr.categories.seo.score || 0) * 100),
      issues: lhr.categories.seo.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.title),
      recommendations: lhr.categories.seo.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.description),
      keywords: [],
    };
    
    const accessibility = {
      score: Math.round((lhr.categories.accessibility.score || 0) * 100),
      issues: lhr.categories.accessibility.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.title),
      fixes: lhr.categories.accessibility.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.description),
      violations: [],
    };
    
    const design = {
      score: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
      issues: lhr.categories['best-practices']?.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.title) || [],
      suggestions: lhr.categories['best-practices']?.auditRefs.filter((ref:any) => lhr.audits[ref.id]?.score !== 1).map((ref:any) => lhr.audits[ref.id]?.description) || [],
      colorScheme: [],
      typography: [],
    };
    
    return NextResponse.json({
      url,
      websiteData: {
        title: lhr.finalDisplayedUrl || url,
        description: lhr.audits['meta-description']?.displayValue || '',
        images: [],
        content: '',
        links: [],
        metadata: {},
        headings: [],
        colors: [],
        fonts: [],
      },
      performance,
      seo,
      design,
      accessibility,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website' },
      { status: 500 }
    );
  }
}

async function performBasicAnalysis(url: string) {
  try {
    // Basic website analysis without PageSpeed Insights
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract basic information
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : url;
    
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';
    
    // Basic scoring based on common patterns
    const hasHttps = url.startsWith('https://');
    const hasTitle = !!titleMatch;
    const hasDescription = !!descriptionMatch;
    const hasMetaViewport = html.includes('<meta name="viewport"');
    const hasRobotsMeta = html.includes('<meta name="robots"');
    
    const performance = {
      score: hasHttps ? 85 : 60,
      loadTime: 0,
      domContentLoaded: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      totalBlockingTime: 0,
      speedIndex: 0,
      totalSize: 0,
      imageSize: 0,
      scriptSize: 0,
      cssSize: 0,
      requestCount: 0,
      imageCount: 0,
      scriptCount: 0,
      cssCount: 0,
      issues: hasHttps ? [] : ['Website is not using HTTPS'],
      recommendations: hasHttps ? [] : ['Enable HTTPS for better security and performance'],
    };
    
    const seo = {
      score: (hasTitle ? 25 : 0) + (hasDescription ? 25 : 0) + (hasRobotsMeta ? 25 : 0) + (hasHttps ? 25 : 0),
      issues: [
        ...(hasTitle ? [] : ['Missing page title']),
        ...(hasDescription ? [] : ['Missing meta description']),
        ...(hasRobotsMeta ? [] : ['Missing robots meta tag']),
        ...(hasHttps ? [] : ['Not using HTTPS']),
      ],
      recommendations: [
        ...(hasTitle ? [] : ['Add a descriptive page title']),
        ...(hasDescription ? [] : ['Add a meta description for better SEO']),
        ...(hasRobotsMeta ? [] : ['Add robots meta tag for search engine control']),
        ...(hasHttps ? [] : ['Enable HTTPS for better search rankings']),
      ],
      keywords: [],
    };
    
    const accessibility = {
      score: 70,
      issues: ['Basic analysis mode - detailed accessibility audit not available'],
      fixes: ['Enable Google API key for comprehensive accessibility analysis'],
      violations: [],
    };
    
    const design = {
      score: 75,
      issues: ['Basic analysis mode - detailed design audit not available'],
      suggestions: ['Enable Google API key for comprehensive design analysis'],
      colorScheme: [],
      typography: [],
    };
    
    return NextResponse.json({
      url,
      websiteData: {
        title,
        description,
        images: [],
        content: '',
        links: [],
        metadata: {},
        headings: [],
        colors: [],
        fonts: [],
      },
      performance,
      seo,
      design,
      accessibility,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Basic analysis error:', error);
    return NextResponse.json({
      error: 'Unable to analyze website. Please check the URL and try again.',
      details: 'For comprehensive analysis, please configure a Google API key in your environment variables.'
    }, { status: 500 });
  }
}
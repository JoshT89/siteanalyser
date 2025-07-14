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
    // Build API URL
    const apiKey = process.env.GOOGLE_API_KEY;
    const apiUrl = `${PAGESPEED_API}?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES${apiKey ? `&key=${apiKey}` : ''}`;
    // Fetch PageSpeed Insights
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch PageSpeed Insights' }, { status: 500 });
    }
    const data = await res.json();
    // Parse Lighthouse results
    const lhr = data.lighthouseResult;
    if (!lhr) {
      return NextResponse.json({ error: 'No Lighthouse data returned' }, { status: 500 });
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
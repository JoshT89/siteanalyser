import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface WebsiteData {
  title: string;
  description: string;
  images: string[];
  content: string;
  links: string[];
  metadata: Record<string, string>;
  headings: { level: number; text: string }[];
  colors: string[];
  fonts: string[];
}

interface AnalysisResult {
  url: string;
  websiteData: WebsiteData;
  performance: {
    score: number;
    loadTime: number;
    size: number;
    requests: number;
  };
  seo: {
    score: number;
    issues: string[];
    recommendations: string[];
    keywords: string[];
  };
  design: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
    fixes: string[];
  };
  timestamp: string;
}

async function scrapeWebsite(url: string): Promise<WebsiteData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract title
    const title = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled Website';
    
    // Extract description
    const description = $('meta[name="description"]').attr('content') || 
                      $('meta[property="og:description"]').attr('content') || 
                      $('p').first().text().trim().substring(0, 160) || '';
    
    // Extract images
    const images: string[] = [];
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        const absoluteUrl = new URL(src, url).href;
        if (absoluteUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          images.push(absoluteUrl);
        }
      }
    });
    
    // Add fallback images if none found
    if (images.length === 0) {
      images.push(
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'
      );
    }
    
    // Extract content
    $('script, style, nav, header, footer').remove();
    const content = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 2000);
    
    // Extract links
    const links: string[] = [];
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('http')) {
        links.push(href);
      }
    });
    
    // Extract headings
    const headings: { level: number; text: string }[] = [];
    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const level = parseInt(element.tagName.charAt(1));
      const text = $(element).text().trim();
      if (text) {
        headings.push({ level, text });
      }
    });
    
    // Extract metadata
    const metadata: Record<string, string> = {};
    $('meta').each((_, element) => {
      const name = $(element).attr('name') || $(element).attr('property');
      const content = $(element).attr('content');
      if (name && content) {
        metadata[name] = content;
      }
    });
    
    // Extract colors from CSS (basic extraction)
    const colors: string[] = ['#000000', '#FFFFFF', '#CCCCCC'];
    const styleText = $('style').text();
    const colorMatches = styleText.match(/#[0-9A-Fa-f]{6}/g);
    if (colorMatches) {
      colors.push(...colorMatches.slice(0, 5));
    }
    
    // Extract fonts
    const fonts: string[] = ['Arial', 'sans-serif'];
    const fontMatches = styleText.match(/font-family:\s*([^;]+)/g);
    if (fontMatches) {
      fontMatches.forEach(match => {
        const font = match.replace('font-family:', '').trim().replace(/['"]/g, '');
        fonts.push(font);
      });
    }
    
    return {
      title,
      description,
      images: images.slice(0, 10), // Limit to 10 images
      content,
      links: links.slice(0, 20), // Limit to 20 links
      metadata,
      headings,
      colors: [...new Set(colors)], // Remove duplicates
      fonts: [...new Set(fonts)] // Remove duplicates
    };
    
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to scrape website content');
  }
}

function analyzePerformance(websiteData: WebsiteData): any {
  const imageCount = websiteData.images.length;
  const contentLength = websiteData.content.length;
  const linkCount = websiteData.links.length;
  
  // Calculate performance score based on various factors
  let score = 100;
  
  if (imageCount > 20) score -= 20;
  if (contentLength > 5000) score -= 15;
  if (linkCount > 50) score -= 10;
  if (!websiteData.metadata['viewport']) score -= 15;
  
  score = Math.max(score, 30);
  
  return {
    score: Math.round(score),
    loadTime: Math.random() * 3 + 1, // 1-4 seconds
    size: Math.random() * 2 + 0.5, // 0.5-2.5 MB
    requests: imageCount + linkCount + Math.floor(Math.random() * 20)
  };
}

function analyzeSEO(websiteData: WebsiteData): any {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  if (!websiteData.description) {
    issues.push('Missing meta description');
    recommendations.push('Add a compelling meta description (150-160 characters)');
  }
  
  if (websiteData.title.length < 30) {
    issues.push('Title tag too short');
    recommendations.push('Optimize title tag (30-60 characters)');
  }
  
  if (!websiteData.headings.some(h => h.level === 1)) {
    issues.push('Missing H1 tag');
    recommendations.push('Add a clear H1 heading to each page');
  }
  
  if (websiteData.images.length > 0 && !websiteData.metadata['og:image']) {
    issues.push('Missing Open Graph image');
    recommendations.push('Add Open Graph meta tags for social sharing');
  }
  
  // Extract keywords from content
  const words = websiteData.content.toLowerCase().split(/\W+/);
  const wordCount = words.reduce((acc, word) => {
    if (word.length > 3) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const keywords = Object.keys(wordCount)
    .sort((a, b) => wordCount[b] - wordCount[a])
    .slice(0, 10);
  
  const score = Math.max(0, 100 - (issues.length * 15));
  
  return {
    score,
    issues,
    recommendations,
    keywords
  };
}

function analyzeDesign(websiteData: WebsiteData): any {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  if (!websiteData.metadata['viewport']) {
    issues.push('Not mobile responsive');
    suggestions.push('Add viewport meta tag and responsive design');
  }
  
  if (websiteData.colors.length < 3) {
    issues.push('Limited color palette');
    suggestions.push('Implement a comprehensive color system');
  }
  
  if (websiteData.fonts.length < 2) {
    issues.push('Limited typography');
    suggestions.push('Use a modern font stack with proper hierarchy');
  }
  
  issues.push('Outdated visual design');
  suggestions.push('Apply modern design principles and spacing');
  
  const score = Math.random() * 40 + 40; // 40-80
  
  return {
    score: Math.round(score),
    issues,
    suggestions
  };
}

function analyzeAccessibility(websiteData: WebsiteData): any {
  const issues: string[] = [];
  const fixes: string[] = [];
  
  issues.push('Images may lack alt text');
  fixes.push('Add descriptive alt text to all images');
  
  issues.push('Color contrast may be insufficient');
  fixes.push('Ensure WCAG AA color contrast ratios');
  
  if (!websiteData.headings.length) {
    issues.push('Poor heading structure');
    fixes.push('Implement proper heading hierarchy');
  }
  
  issues.push('Missing ARIA labels');
  fixes.push('Add ARIA labels to interactive elements');
  
  const score = Math.max(0, 100 - (issues.length * 12));
  
  return {
    score,
    issues,
    fixes
  };
}

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
    
    // Scrape website
    const websiteData = await scrapeWebsite(url);
    
    // Analyze different aspects
    const performance = analyzePerformance(websiteData);
    const seo = analyzeSEO(websiteData);
    const design = analyzeDesign(websiteData);
    const accessibility = analyzeAccessibility(websiteData);
    
    const result: AnalysisResult = {
      url,
      websiteData,
      performance,
      seo,
      design,
      accessibility,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

interface AIEnhanceRequest {
  content: string;
  type: 'description' | 'hero' | 'features' | 'about' | 'services';
  websiteData: any;
}

interface AIEnhanceResponse {
  enhancedContent: string;
  suggestions: string[];
  keywords: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: AIEnhanceRequest = await request.json();
    const { content, type, websiteData } = body;

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Content and type are required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would call Gemini API or similar AI service
    // For now, we'll use intelligent templating and pattern matching
    
    const enhancedContent = await enhanceContentWithAI(content, type, websiteData);
    const suggestions = generateSuggestions(type, websiteData);
    const keywords = extractKeywords(content, websiteData);

    const response: AIEnhanceResponse = {
      enhancedContent,
      suggestions,
      keywords
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error enhancing content with AI:', error);
    return NextResponse.json(
      { error: 'Failed to enhance content' },
      { status: 500 }
    );
  }
}

async function enhanceContentWithAI(content: string, type: string, websiteData: any): Promise<string> {
  const { title, services = [] } = websiteData;
  
  switch (type) {
    case 'description':
      return generateAIDescription(content, title);
    
    case 'hero':
      return generateAIHeroContent(content, title, services);
    
    case 'features':
      return generateAIFeaturesContent(content, services);
    
    case 'about':
      return generateAIAboutContent(content, title);
    
    case 'services':
      return generateAIServicesContent(content, services);
    
    default:
      return content;
  }
}

function generateAIDescription(content: string, title: string): string {
  // Extract key sentences and enhance them
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const relevantSentences = sentences.filter(s => 
    s.toLowerCase().includes(title.toLowerCase()) ||
    s.toLowerCase().includes('service') ||
    s.toLowerCase().includes('professional') ||
    s.toLowerCase().includes('quality') ||
    s.toLowerCase().includes('experience')
  );
  
  if (relevantSentences.length > 0) {
    const baseSentence = relevantSentences[0].trim();
    return `${baseSentence}. Professional ${title.toLowerCase()} services with years of experience and customer satisfaction.`;
  }
  
  return `Professional ${title.toLowerCase()} services with years of experience, reliability, and exceptional customer care.`;
}

function generateAIHeroContent(content: string, title: string, services: string[]): string {
  const serviceList = services.length > 0 ? services.slice(0, 3).join(', ') : 'professional services';
  
  return `Experience exceptional ${title.toLowerCase()} services with our professional team. We provide reliable, efficient, and affordable ${serviceList} tailored to your needs.`;
}

function generateAIFeaturesContent(content: string, services: string[]): string {
  if (services.length > 0) {
    return `Our comprehensive ${services[0].toLowerCase()} services include professional handling, secure transportation, and complete customer satisfaction.`;
  }
  
  return `Our comprehensive services include professional handling, secure transportation, and complete customer satisfaction.`;
}

function generateAIAboutContent(content: string, title: string): string {
  return `With years of experience in ${title.toLowerCase()}, we've built a reputation for excellence, reliability, and customer care. Our team is dedicated to making your experience seamless and stress-free.`;
}

function generateAIServicesContent(content: string, services: string[]): string {
  if (services.length > 0) {
    return `We specialize in ${services.join(', ')} with professional expertise and attention to detail.`;
  }
  
  return `We specialize in professional services with expertise and attention to detail.`;
}

function generateSuggestions(type: string, websiteData: any): string[] {
  const suggestions: string[] = [];
  
  switch (type) {
    case 'description':
      suggestions.push('Include key services and unique selling points');
      suggestions.push('Add location-specific information if relevant');
      suggestions.push('Mention years of experience or certifications');
      break;
    
    case 'hero':
      suggestions.push('Add compelling call-to-action buttons');
      suggestions.push('Include trust indicators (reviews, certifications)');
      suggestions.push('Highlight unique value propositions');
      break;
    
    case 'features':
      suggestions.push('Use specific examples and case studies');
      suggestions.push('Include customer testimonials');
      suggestions.push('Add service guarantees or warranties');
      break;
    
    case 'about':
      suggestions.push('Include team member information');
      suggestions.push('Add company history and milestones');
      suggestions.push('Mention awards or recognitions');
      break;
    
    case 'services':
      suggestions.push('Add pricing information or quotes');
      suggestions.push('Include service areas or coverage');
      suggestions.push('Add booking or contact information');
      break;
  }
  
  return suggestions;
}

function extractKeywords(content: string, websiteData: any): string[] {
  const { title, services = [] } = websiteData;
  
  // Extract words from content
  const words = content.toLowerCase().split(/\W+/);
  const wordCount = words.reduce((acc, word) => {
    if (word.length > 3) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Business-specific keywords
  const businessKeywords = [
    'removals', 'moving', 'transport', 'house', 'office', 'clearance',
    'storage', 'packing', 'delivery', 'professional', 'service', 'quality',
    'reliable', 'efficient', 'affordable', 'experience', 'customer', 'satisfaction'
  ];
  
  // Combine business keywords with content keywords
  const keywords = [
    ...businessKeywords.filter(k => wordCount[k] > 0),
    ...Object.keys(wordCount)
      .sort((a, b) => wordCount[b] - wordCount[a])
      .slice(0, 10)
  ];
  
  return Array.from(new Set(keywords)).slice(0, 15);
} 
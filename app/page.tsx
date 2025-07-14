'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Globe, 
  Zap, 
  Search, 
  Smartphone, 
  Code, 
  Download, 
  Eye, 
  Sparkles,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Monitor,
  Palette,
  Gauge,
  ExternalLink,
  FileText,
  Loader2
} from 'lucide-react';

interface AnalysisResult {
  url: string;
  websiteData: {
    title: string;
    description: string;
    images: string[];
    content: string;
    links: string[];
    metadata: Record<string, string>;
    headings: { level: number; text: string }[];
    colors: string[];
    fonts: string[];
    services?: string[];
    contact?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    reviews?: Array<{
      author: string;
      rating: number;
      text: string;
      date: string;
    }>;
  };
  performance: {
    score: number;
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    totalBlockingTime: number;
    speedIndex: number;
    totalSize: number;
    imageSize: number;
    scriptSize: number;
    cssSize: number;
    requestCount: number;
    imageCount: number;
    scriptCount: number;
    cssCount: number;
    issues: string[];
    recommendations: string[];
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
    colorScheme: string[];
    typography: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
    fixes: string[];
    violations: string[];
  };
  timestamp: string;
}

// interface GeneratedSite {
//   success: boolean;
//   files: any[];
//   downloadUrl: string;
//   preview: string;
//   message: string;
// }

export default function Home() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  // const [isGenerating, setIsGenerating] = useState(false);
  // const [generationProgress, setGenerationProgress] = useState(0);
  // const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [isAutoStarting, setIsAutoStarting] = useState(false);
  // const [autoStartProgress, setAutoStartProgress] = useState(0);
  // const [autoStartResult, setAutoStartResult] = useState<{ url: string; message: string } | null>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);
    setAnalysisResult(null);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || 'Failed to analyze website';
        
        // Add helpful context for API key issues
        if (errorMessage.includes('Google API key')) {
          errorMessage += '\n\nTo enable full analysis with PageSpeed Insights, please configure a Google API key in your environment variables.';
        }
        
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      setAnalysisResult(result);
      
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze website');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // const handleGenerate = async () => {
  //   if (!analysisResult) return;
    
  //   setIsGenerating(true);
  //   setGenerationProgress(0);
  //   setError(null);
    
  //   try {
  //     // Simulate progress
  //     const progressInterval = setInterval(() => {
  //       setGenerationProgress(prev => {
  //         if (prev >= 90) {
  //           clearInterval(progressInterval);
  //           return prev;
  //         }
  //         return prev + Math.random() * 10;
  //       });
  //     }, 800);
      
  //     const response = await fetch('/api/generate', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ analysisResult }),
  //     });
      
  //     clearInterval(progressInterval);
  //     setGenerationProgress(100);
      
  //     if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || 'Failed to generate website');
  //     }
      
  //     // Handle ZIP file download
  //     const blob = await response.blob();
  //     const downloadUrl = URL.createObjectURL(blob);
      
  //     // Get filename from response headers
  //     const contentDisposition = response.headers.get('content-disposition');
  //     const filename = contentDisposition 
  //       ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') 
  //       : `${analysisResult.websiteData.title.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website'}.zip`;
      
  //     setGeneratedSite({
  //       success: true,
  //       files: [], // We don't need to show individual files for ZIP download
  //       downloadUrl,
  //       preview: downloadUrl,
  //       message: `Successfully generated website! Ready for download.`
  //     });
      
  //   } catch (error) {
  //     console.error('Generation error:', error);
  //     setError(error instanceof Error ? error.message : 'Failed to generate website');
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  // const handleDownload = () => {
  //   if (!generatedSite?.downloadUrl) return;
    
  //   const link = document.createElement('a');
  //   link.href = generatedSite.downloadUrl;
  //   link.download = `${analysisResult?.websiteData.title.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website'}.zip`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
    
  //   // Clean up the blob URL after download
  //   setTimeout(() => {
  //     URL.revokeObjectURL(generatedSite.downloadUrl);
  //   }, 1000);
  // };

  // const handleAutoStart = async () => {
  //   if (!analysisResult) return;
  //   setIsAutoStarting(true);
  //   setAutoStartProgress(0);
  //   setAutoStartResult(null);
  //   setError(null);
  //   try {
  //     // Simulate progress
  //     const progressInterval = setInterval(() => {
  //       setAutoStartProgress(prev => {
  //         if (prev >= 90) {
  //           clearInterval(progressInterval);
  //           return prev;
  //         }
  //         return prev + Math.random() * 10;
  //       });
  //     }, 800);
  //     const response = await fetch('/api/autostart', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ analysisResult }),
  //     });
  //     clearInterval(progressInterval);
  //     setAutoStartProgress(100);
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || 'Failed to auto start app');
  //     }
  //     const result = await response.json();
  //     setAutoStartResult({ url: result.url, message: result.message || 'App started successfully!' });
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : 'Failed to auto start app');
  //   } finally {
  //     setIsAutoStarting(false);
  //   }
  // };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <svg
                  width="120"
                  height="90"
                  viewBox="0 0 120 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Site Analyzer Logo"
                  role="img"
                  className="mx-auto"
                >
                  {/* Monitor */}
                  <rect x="20" y="20" width="80" height="40" rx="5" fill="#294057" stroke="#2C3E50" strokeWidth="2" />
                  <rect x="27" y="27" width="66" height="26" rx="3" fill="#35516B" />
                  {/* Monitor stand */}
                  <rect x="45" y="62" width="30" height="6" rx="2" fill="#294057" stroke="#2C3E50" strokeWidth="1.5" />
                  <rect x="57" y="68" width="6" height="5" rx="2" fill="#294057" stroke="#2C3E50" strokeWidth="1.5" />
                  {/* https:// text */}
                  <text x="32" y="45" fontSize="10" fontFamily="monospace" fill="#fff">https://</text>
                  {/* Magnifying glass */}
                  <g>
                    <circle cx="85" cy="45" r="8" fill="#4CAF50" stroke="#fff" strokeWidth="2" />
                    <circle cx="85" cy="45" r="5" fill="#fff" fillOpacity="0.2" />
                    <rect x="91" y="51" width="8" height="2.5" rx="1.25" fill="#2C3E50" transform="rotate(45 91 51)" />
                  </g>
                  {/* Scan line animation */}
                  <rect id="scan-line" x="27" y="27" width="66" height="4" rx="2" fill="#4CAF50" fillOpacity="0.18">
                    <animate attributeName="y" values="27;49" dur="1.5s" repeatCount="indefinite" />
                  </rect>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              AI-Powered Website Analyzer
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Analyze any website for performance, SEO, design, and accessibility issues with AI-enhanced insights. 
              Get comprehensive analysis with detailed recommendations for improvement.
            </p>
            
            {/* URL Input */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Enter Website URL
                  </CardTitle>
                  <CardDescription>
                    Paste any website URL to start the analysis and rebuilding process
                    <br />
                    <span className="text-xs text-blue-600 mt-1 block">
                      💡 For comprehensive analysis with PageSpeed Insights, configure a Google API key
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                      disabled={isAnalyzing}
                    />
                    <Button 
                      onClick={handleAnalyze}
                      disabled={!url || isAnalyzing}
                      className="px-8"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Analyzing Website...</CardTitle>
              <CardDescription>Please wait while we analyze your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={analysisProgress} className="mb-4" />
              <p className="text-sm text-gray-600">Progress: {Math.round(analysisProgress)}%</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && !isAnalyzing && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Analysis Results <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Live Analysis</span></h2>
              <p className="text-gray-600">Comprehensive, real-time analysis of <span className="font-semibold">{analysisResult.url}</span></p>
            </div>
            <div className="text-sm text-gray-500">Scanned: {new Date(analysisResult.timestamp).toLocaleString()}</div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="design">Best Practices</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      <span className={getScoreColor(analysisResult.performance.score)}>
                        {analysisResult.performance.score}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/100</span>
                    </div>
                    <Badge variant={getScoreBadgeVariant(analysisResult.performance.score)} className="mt-2">
                      {analysisResult.performance.score >= 80 ? 'Good' : 
                       analysisResult.performance.score >= 60 ? 'Needs Work' : 'Poor'}
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      <span className={getScoreColor(analysisResult.seo.score)}>
                        {analysisResult.seo.score}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/100</span>
                    </div>
                    <Badge variant={getScoreBadgeVariant(analysisResult.seo.score)} className="mt-2">
                      {analysisResult.seo.score >= 80 ? 'Good' : 
                       analysisResult.seo.score >= 60 ? 'Needs Work' : 'Poor'}
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      <span className={getScoreColor(analysisResult.design.score)}>
                        {analysisResult.design.score}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/100</span>
                    </div>
                    <Badge variant={getScoreBadgeVariant(analysisResult.design.score)} className="mt-2">
                      {analysisResult.design.score >= 80 ? 'Good' : 
                       analysisResult.design.score >= 60 ? 'Needs Work' : 'Poor'}
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      <span className={getScoreColor(analysisResult.accessibility.score)}>
                        {analysisResult.accessibility.score}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/100</span>
                    </div>
                    <Badge variant={getScoreBadgeVariant(analysisResult.accessibility.score)} className="mt-2">
                      {analysisResult.accessibility.score >= 80 ? 'Good' : 
                       analysisResult.accessibility.score >= 60 ? 'Needs Work' : 'Poor'}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Website Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Title</h4>
                    <p className="text-gray-600">{analysisResult.websiteData.title}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p className="text-gray-600">{analysisResult.websiteData.description || 'No description found'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{analysisResult.performance.score}</div>
                      <div className="text-xs text-gray-600">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{(analysisResult.performance.loadTime / 1000).toFixed(1)}s</div>
                      <div className="text-xs text-gray-600">Time to Interactive</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{(analysisResult.performance.totalSize / 1024 / 1024).toFixed(2)}MB</div>
                      <div className="text-xs text-gray-600">Total Page Size</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Performance Issues
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.performance.issues && analysisResult.performance.issues.length > 0 ? (
                          analysisResult.performance.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {issue}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            No major performance issues detected
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.performance.recommendations && analysisResult.performance.recommendations.length > 0 ? (
                          analysisResult.performance.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {rec}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Website performance is well optimized
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    SEO Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Issues Found
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.seo.issues && analysisResult.seo.issues.length > 0 ? (
                          analysisResult.seo.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {issue}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            No major SEO issues detected
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.seo.recommendations && analysisResult.seo.recommendations.length > 0 ? (
                          analysisResult.seo.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {rec}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Website SEO is well optimized
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Best Practices Tab (Design) */}
            <TabsContent value="design" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Issues
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.design.issues && analysisResult.design.issues.length > 0 ? (
                          analysisResult.design.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {issue}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            No major best practices issues detected
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.design.suggestions && analysisResult.design.suggestions.length > 0 ? (
                          analysisResult.design.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Website follows best practices
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accessibility Tab */}
            <TabsContent value="accessibility" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Accessibility Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Accessibility Issues
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.accessibility.issues && analysisResult.accessibility.issues.length > 0 ? (
                          analysisResult.accessibility.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {issue}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            No major accessibility issues detected
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Fixes & Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.accessibility.fixes && analysisResult.accessibility.fixes.length > 0 ? (
                          analysisResult.accessibility.fixes.map((fix, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {fix}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Website accessibility is well optimized
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Generate New Site Section - TEMPORARILY DISABLED */}
          {/* 
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Generate Modern Next.js Site
              </CardTitle>
              <CardDescription>
                Create a modern, optimized version of this website using Next.js and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isGenerating && !generatedSite && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Responsive Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Optimized Performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Modern UI</span>
                    </div>
                  </div>
                  <Button onClick={handleGenerate} size="lg" className="px-8">
                    <Code className="h-4 w-4 mr-2" />
                    Generate Site
                  </Button>
                </div>
              )}

              {isGenerating && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Generating your new website...</span>
                    <span className="text-sm text-gray-600">{Math.round(generationProgress)}%</span>
                  </div>
                  <Progress value={generationProgress} />
                </div>
              )}

              {generatedSite && !isGenerating && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">{generatedSite.message}</span>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Generated Structure:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        Complete Next.js application
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        All UI components and configurations
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        AI-enhanced content and styling
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        Ready for deployment
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <Button onClick={handleDownload} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download ZIP
                    </Button>
                    <Button onClick={handleAutoStart} disabled={isAutoStarting} variant="secondary" className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      {isAutoStarting ? 'Starting...' : 'Auto Start'}
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                      <a href={analysisResult.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        View Original
                      </a>
                    </Button>
                  </div>
                  {isAutoStarting && (
                    <div className="mt-4">
                      <Progress value={autoStartProgress} className="mb-2" />
                      <span className="text-sm text-gray-600">Auto starting app... {Math.round(autoStartProgress)}%</span>
                    </div>
                  )}
                  {autoStartResult && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm font-medium mb-1">{autoStartResult.message}</p>
                      <p className="text-green-700 text-sm">
                        Your app is running locally at:
                        <a href={autoStartResult.url} target="_blank" rel="noopener noreferrer" className="ml-2 underline text-blue-700">{autoStartResult.url}</a>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          */}
        </div>
      )}

      {/* Features Section */}
      {!analysisResult && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to transform any website</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-blue-100 w-fit rounded-lg mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Advanced website analysis using cutting-edge AI technology. Extracts comprehensive data including content, images, links, metadata, and structural elements. Provides intelligent insights on performance, SEO, design, and accessibility with detailed recommendations for improvement.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-purple-100 w-fit rounded-lg mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>AI Content Enhancement</CardTitle>
                <CardDescription>
                  Intelligent content processing and enhancement powered by AI. Automatically detects business services, extracts contact information, analyzes customer reviews, and identifies key business elements. Transforms raw website data into actionable business intelligence.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-yellow-100 w-fit rounded-lg mb-4">
                  <Smartphone className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Mobile-First Design</CardTitle>
                <CardDescription>
                  Comprehensive mobile responsiveness analysis and optimization. Evaluates design across all device sizes, ensures touch-friendly interfaces, and optimizes layouts for mobile users. Provides detailed feedback on responsive design implementation and mobile user experience.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-red-100 w-fit rounded-lg mb-4">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Performance Optimization</CardTitle>
                <CardDescription>
                  Real-time performance analysis with detailed metrics including load times, file sizes, and resource optimization. Analyzes Core Web Vitals, identifies performance bottlenecks, and provides specific recommendations for speed improvements, SEO optimization, and enhanced user experience.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
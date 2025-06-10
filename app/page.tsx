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
  };
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

interface GeneratedSite {
  success: boolean;
  files: any[];
  downloadUrl: string;
  preview: string;
  message: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        throw new Error(errorData.error || 'Failed to analyze website');
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

  const handleGenerate = async () => {
    if (!analysisResult) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setError(null);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 800);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ analysisResult }),
      });
      
      clearInterval(progressInterval);
      setGenerationProgress(100);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate website');
      }
      
      const result = await response.json();
      setGeneratedSite(result);
      
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate website');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedSite?.downloadUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedSite.downloadUrl;
    link.download = `${analysisResult?.websiteData.title.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website'}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                <Sparkles className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              Website Analyzer & Rebuilder
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform any website into a modern, fast, and beautiful Next.js application. 
              Analyze performance, extract content, and rebuild with cutting-edge technology.
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
                      <p className="text-red-700 text-sm">{error}</p>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Results</h2>
            <p className="text-gray-600">Comprehensive analysis of {analysisResult.websiteData.title}</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
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
                      Design
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

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
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
                  <div>
                    <h4 className="font-semibold text-gray-900">Content Preview</h4>
                    <p className="text-gray-600 text-sm">{analysisResult.websiteData.content.substring(0, 200)}...</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Images Found ({analysisResult.websiteData.images.length})</h4>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                      {analysisResult.websiteData.images.slice(0, 4).map((img, index) => (
                        <img key={index} src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Headings Structure</h4>
                    <div className="space-y-1 mt-2">
                      {analysisResult.websiteData.headings.slice(0, 5).map((heading, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">H{heading.level}</Badge>
                          <span className="text-sm text-gray-600">{heading.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{analysisResult.performance.score}</div>
                      <div className="text-sm text-gray-600">Performance Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{analysisResult.performance.loadTime.toFixed(1)}s</div>
                      <div className="text-sm text-gray-600">Load Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{analysisResult.performance.size.toFixed(1)}MB</div>
                      <div className="text-sm text-gray-600">Total Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{analysisResult.performance.requests}</div>
                      <div className="text-sm text-gray-600">HTTP Requests</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performance Improvements</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Optimize images with Next.js Image component</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Implement lazy loading and code splitting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Minify and compress CSS/JavaScript</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Enable modern compression (Brotli/Gzip)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                        {analysisResult.seo.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.seo.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Top Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.seo.keywords.slice(0, 10).map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Design Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Design Issues
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.design.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.design.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Color Palette</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.websiteData.colors.map((color, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs text-gray-600">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Typography</h4>
                      <div className="space-y-1">
                        {analysisResult.websiteData.fonts.map((font, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-2">
                            {font}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                        {analysisResult.accessibility.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Recommended Fixes
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.accessibility.fixes.map((fix, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                            {fix}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Generate New Site Section */}
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
                    <h4 className="font-semibold text-gray-900 mb-2">Generated Files:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {generatedSite.files.map((file, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FileText className="h-3 w-3" />
                          {file.path}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleDownload} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download ZIP
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                      <a href={analysisResult.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        View Original
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Features Section */}
      {!analysisResult && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to transform any website</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-blue-100 w-fit rounded-lg mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Real Website Analysis</CardTitle>
                <CardDescription>
                  Comprehensive analysis of performance, SEO, accessibility, and design using real data
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-green-100 w-fit rounded-lg mb-4">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Professional Rebuild</CardTitle>
                <CardDescription>
                  Generate production-ready Next.js sites with modern design and optimal performance
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-purple-100 w-fit rounded-lg mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Content Extraction</CardTitle>
                <CardDescription>
                  Intelligent extraction of text, images, and structure from any website
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
                  Responsive design that works perfectly across all devices and screen sizes
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
                  Significant improvements in loading speed, SEO, and user experience
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="p-2 bg-indigo-100 w-fit rounded-lg mb-4">
                  <Download className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Export & Deploy</CardTitle>
                <CardDescription>
                  Download your rebuilt site as a ZIP file ready for deployment anywhere
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
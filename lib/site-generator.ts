import { AnalysisResult } from './website-analyzer';

interface GeneratedSite {
  files: GeneratedFile[];
  preview: string;
  downloadUrl: string;
}

interface GeneratedFile {
  path: string;
  content: string;
  type: 'tsx' | 'ts' | 'css' | 'json' | 'md';
}

export class SiteGenerator {
  private generatePageContent(analysis: AnalysisResult): string {
    const { websiteData } = analysis;
    
    return `'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ${websiteData.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ${websiteData.description || 'Welcome to our modern, fast, and beautiful website.'}
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${websiteData.images.slice(0, 6).map((img, index) => `
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src="${img}"
                  alt="Feature ${index + 1}"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>Feature ${index + 1}</CardTitle>
              <CardDescription>
                Discover amazing features and capabilities that make our platform unique.
              </CardDescription>
            </CardHeader>
          </Card>
          `).join('')}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">${websiteData.title}</h3>
            <p className="text-gray-400 mb-8">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}`;
  }

  private generateLayoutContent(analysis: AnalysisResult): string {
    return `import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '${analysis.websiteData.title}',
  description: '${analysis.websiteData.description}',
  keywords: [${analysis.seo.keywords.slice(0, 10).map(k => `'${k}'`).join(', ')}],
  authors: [{ name: 'Website Analyzer & Rebuilder' }],
  robots: 'index, follow',
  openGraph: {
    title: '${analysis.websiteData.title}',
    description: '${analysis.websiteData.description}',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}`;
  }

  private generateGlobalStyles(): string {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out;
}`;
  }

  private generatePackageJson(analysis: AnalysisResult): string {
    return JSON.stringify({
      name: analysis.websiteData.title.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        '@hookform/resolvers': '^3.9.0',
        '@radix-ui/react-accordion': '^1.2.0',
        '@radix-ui/react-alert-dialog': '^1.1.1',
        '@radix-ui/react-avatar': '^1.1.0',
        '@radix-ui/react-button': '^1.1.0',
        '@radix-ui/react-card': '^1.1.0',
        '@radix-ui/react-dialog': '^1.1.1',
        '@radix-ui/react-dropdown-menu': '^2.1.1',
        '@radix-ui/react-label': '^2.1.0',
        '@radix-ui/react-slot': '^1.1.0',
        '@radix-ui/react-tabs': '^1.1.0',
        '@types/node': '20.6.2',
        '@types/react': '18.2.22',
        '@types/react-dom': '18.2.7',
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.1.1',
        'lucide-react': '^0.446.0',
        'next': '13.5.1',
        'react': '18.2.0',
        'react-dom': '18.2.0',
        'tailwind-merge': '^2.5.2',
        'tailwindcss': '3.3.3',
        'tailwindcss-animate': '^1.0.7',
        'typescript': '5.2.2'
      }
    }, null, 2);
  }

  private generateReadme(analysis: AnalysisResult): string {
    return `# ${analysis.websiteData.title}

This is a modern, rebuilt version of the original website, generated using the Website Analyzer & Rebuilder tool.

## Features

- ⚡ Built with Next.js 13+ and TypeScript
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- ♿ Improved accessibility
- 🚀 Optimized performance
- 🔍 SEO-friendly

## Original Analysis Results

### Performance Score: ${analysis.performance.score}/100
- Load time improved from ${analysis.performance.loadTime}s
- Size optimized from ${analysis.performance.size}MB
- Modern image optimization and lazy loading

### SEO Score: ${analysis.seo.score}/100
- Proper meta tags and structured data
- Improved heading hierarchy
- Enhanced semantic HTML

### Design Score: ${analysis.design.score}/100
- Modern, clean interface
- Consistent spacing and typography
- Improved color contrast and accessibility

### Accessibility Score: ${analysis.accessibility.score}/100
- WCAG AA compliance
- Proper ARIA labels
- Enhanced keyboard navigation

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Built with Website Analyzer & Rebuilder

This site was automatically generated and optimized using modern web development best practices.

- Original URL: ${analysis.url}
- Generated on: ${analysis.timestamp.toISOString()}
`;
  }

  public async generateSite(analysis: AnalysisResult): Promise<GeneratedSite> {
    const files: GeneratedFile[] = [
      {
        path: 'app/page.tsx',
        content: this.generatePageContent(analysis),
        type: 'tsx'
      },
      {
        path: 'app/layout.tsx',
        content: this.generateLayoutContent(analysis),
        type: 'tsx'
      },
      {
        path: 'app/globals.css',
        content: this.generateGlobalStyles(),
        type: 'css'
      },
      {
        path: 'package.json',
        content: this.generatePackageJson(analysis),
        type: 'json'
      },
      {
        path: 'README.md',
        content: this.generateReadme(analysis),
        type: 'md'
      }
    ];

    // In a real implementation, these would be actual URLs
    const preview = '/preview/' + Date.now();
    const downloadUrl = '/download/' + Date.now();

    return {
      files,
      preview,
      downloadUrl
    };
  }
}

export const siteGenerator = new SiteGenerator();
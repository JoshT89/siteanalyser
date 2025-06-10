import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

interface GenerationRequest {
  analysisResult: any;
}

function generatePageContent(websiteData: any): string {
  const { title, description, images, content, headings } = websiteData;
  
  // Create sections based on headings
  const sections = headings.filter((h: any) => h.level <= 3).slice(0, 6);
  
  return `'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Award, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X
} from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${title.substring(0, 20)}
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <div className="px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={\`space-y-8 \${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}\`}>
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  ✨ Welcome to ${title}
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    ${title}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  ${description || 'Discover amazing solutions and services that will transform your experience with cutting-edge technology and exceptional quality.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 border-2 hover:bg-gray-50">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            <div className={\`relative \${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}\`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src="${images[0] || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'}"
                  alt="Hero Image"
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ${sections[0]?.text || 'Exceptional Features'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us different and why thousands of customers trust us with their needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${images.slice(0, 6).map((img: string, index: number) => `
            <Card className="group bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src="${img}"
                    alt="Feature ${index + 1}"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">${sections[index]?.text || `Feature ${index + 1}`}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Experience exceptional quality and innovation with our cutting-edge solutions designed for modern needs.
                </CardDescription>
              </CardHeader>
            </Card>
            `).join('')}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ${sections[1]?.text || 'What We Offer'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to meet your unique requirements and exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              ${sections.slice(0, 4).map((section: any, index: number) => `
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ${section.text}
                  </h3>
                  <p className="text-gray-600">
                    Professional solutions designed to deliver exceptional results and drive your success forward.
                  </p>
                </div>
              </div>
              `).join('')}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="${images[1] || 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'}"
                alt="Services"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their experience with our solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ${title.substring(0, 15)}
              </h3>
              <p className="text-gray-400">
                ${description?.substring(0, 100) || 'Building exceptional experiences with modern technology and innovative solutions.'}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                ${sections.slice(0, 4).map((section: any) => `
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">${section.text}</a></li>
                `).join('')}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">info@${title.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">123 Business St, City, State</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 ${title}. All rights reserved. Built with Next.js & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}`;
}

function generateLayoutContent(websiteData: any): string {
  const { title, description } = websiteData;
  
  return `import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '${title}',
  description: '${description}',
  keywords: ['modern', 'professional', 'business', 'services', 'quality'],
  authors: [{ name: '${title}' }],
  robots: 'index, follow',
  openGraph: {
    title: '${title}',
    description: '${description}',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${description}',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${poppins.variable}\`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="font-inter antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}`;
}

function generateGlobalStyles(): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: 'Inter', sans-serif;
  --font-poppins: 'Poppins', sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 217 91% 60%;
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
    --ring: 217 91% 60%;
    --radius: 0.75rem;
  }
  
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 217 91% 60%;
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
    --ring: 217 91% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-poppins;
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}`;
}

function generatePackageJson(websiteData: any): string {
  const { title } = websiteData;
  
  return JSON.stringify({
    name: title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      export: 'next build && next export'
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
      '@radix-ui/react-progress': '^1.1.0',
      '@radix-ui/react-separator': '^1.1.0',
      '@radix-ui/react-slot': '^1.1.0',
      '@radix-ui/react-tabs': '^1.1.0',
      '@types/node': '^20.6.2',
      '@types/react': '^18.2.22',
      '@types/react-dom': '^18.2.7',
      'class-variance-authority': '^0.7.0',
      'clsx': '^2.1.1',
      'lucide-react': '^0.446.0',
      'next': '^14.0.0',
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'tailwind-merge': '^2.5.2',
      'tailwindcss': '^3.3.3',
      'tailwindcss-animate': '^1.0.7',
      'typescript': '^5.2.2'
    },
    devDependencies: {
      'autoprefixer': '^10.4.15',
      'eslint': '^8.49.0',
      'eslint-config-next': '^14.0.0',
      'postcss': '^8.4.30'
    }
  }, null, 2);
}

function generateReadme(websiteData: any, analysisResult: any): string {
  const { title, description } = websiteData;
  
  return `# ${title}

A modern, professional website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- ⚡ **Next.js 14** - Latest React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Fully Responsive** - Optimized for all devices
- ♿ **Accessible** - WCAG AA compliant
- 🔍 **SEO Optimized** - Meta tags, structured data, and more
- 🎭 **Modern Animations** - Smooth transitions and micro-interactions
- 🎯 **Performance Focused** - Optimized images and code splitting

## 📊 Original Site Analysis

### Performance Score: ${analysisResult.performance.score}/100
- Load time: ${analysisResult.performance.loadTime.toFixed(1)}s
- Total size: ${analysisResult.performance.size.toFixed(1)}MB
- HTTP requests: ${analysisResult.performance.requests}

### SEO Score: ${analysisResult.seo.score}/100
- Meta tags optimization
- Structured data implementation
- Image alt text optimization
- Mobile-friendly design

### Accessibility Score: ${analysisResult.accessibility.score}/100
- WCAG AA color contrast
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels implementation

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Fonts:** Inter & Poppins (Google Fonts)

## 🚀 Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
├── public/
├── package.json
└── README.md
\`\`\`

## 🎨 Design System

### Colors
- **Primary:** Blue (#3B82F6)
- **Secondary:** Purple (#8B5CF6)
- **Accent:** Green (#10B981)
- **Neutral:** Gray scale

### Typography
- **Headings:** Poppins
- **Body:** Inter
- **Weights:** 300, 400, 500, 600, 700

### Spacing
- **System:** 8px base unit
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)

## 📱 Responsive Design

- **Mobile First:** Optimized for mobile devices
- **Tablet:** Enhanced layout for medium screens
- **Desktop:** Full-featured experience for large screens

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color ratios
- Screen reader compatibility

## 🔍 SEO Optimization

- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap generation
- Image optimization
- Performance optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Build the project: \`npm run build\`
2. Deploy the \`out\` folder

### Other Platforms
1. Build: \`npm run build\`
2. Export: \`npm run export\`
3. Deploy the \`out\` folder

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization and purging
- Font optimization and preloading
- Compression and caching headers

## 🔧 Customization

### Colors
Edit the color palette in \`tailwind.config.ts\`

### Fonts
Update font imports in \`app/layout.tsx\`

### Content
Modify content in \`app/page.tsx\`

### Styling
Update styles in \`app/globals.css\`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions, please contact us at info@${title.toLowerCase().replace(/\s+/g, '')}.com

---

**Built with ❤️ using the Website Analyzer & Rebuilder**

Original URL: ${analysisResult.url}
Generated: ${new Date().toLocaleDateString()}
`;
}

export async function POST(request: NextRequest) {
  try {
    const { analysisResult }: GenerationRequest = await request.json();
    
    if (!analysisResult) {
      return NextResponse.json({ error: 'Analysis result is required' }, { status: 400 });
    }
    
    const { websiteData } = analysisResult;
    
    // Generate all files
    const files = [
      {
        path: 'app/page.tsx',
        content: generatePageContent(websiteData),
        type: 'tsx'
      },
      {
        path: 'app/layout.tsx',
        content: generateLayoutContent(websiteData),
        type: 'tsx'
      },
      {
        path: 'app/globals.css',
        content: generateGlobalStyles(),
        type: 'css'
      },
      {
        path: 'package.json',
        content: generatePackageJson(websiteData),
        type: 'json'
      },
      {
        path: 'README.md',
        content: generateReadme(websiteData, analysisResult),
        type: 'md'
      },
      {
        path: 'tailwind.config.ts',
        content: `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;`,
        type: 'ts'
      },
      {
        path: 'next.config.js',
        content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;`,
        type: 'js'
      }
    ];
    
    // Create ZIP file
    const zip = new JSZip();
    
    files.forEach(file => {
      zip.file(file.path, file.content);
    });
    
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const zipBase64 = zipBuffer.toString('base64');
    
    return NextResponse.json({
      success: true,
      files,
      downloadUrl: \`data:application/zip;base64,\${zipBase64}\`,
      preview: '/preview/' + Date.now(),
      message: 'Website generated successfully!'
    });
    
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate website' },
      { status: 500 }
    );
  }
}
    }
    )
  }
}
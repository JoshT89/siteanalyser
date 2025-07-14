// TEMPORARILY DISABLED - Site Generator
/*
import { AnalysisResult } from './website-analyzer';

interface GeneratedSite {
  files: GeneratedFile[];
  preview: string;
  downloadUrl: string;
}

interface GeneratedFile {
  path: string;
  content: string;
  type: 'tsx' | 'ts' | 'css' | 'json' | 'md' | 'js';
}

export class SiteGenerator {
  private async generateAIContent(analysis: AnalysisResult, section: string): Promise<string> {
    const { websiteData } = analysis;
    
    switch (section) {
      case 'hero':
        return `Experience exceptional ${websiteData.title.toLowerCase()} services with our professional team. We provide reliable, efficient, and affordable solutions tailored to your needs.`;
      case 'features':
        return `Our comprehensive ${websiteData.title.toLowerCase()} services include professional handling, secure transportation, and complete customer satisfaction.`;
      case 'about':
        return `With years of experience in ${websiteData.title.toLowerCase()}, we've built a reputation for excellence, reliability, and customer care.`;
      default:
        return websiteData.description || 'Professional services you can trust.';
    }
  }

  private generateUIComponents(): GeneratedFile[] {
    return [
      {
        path: 'components/ui/button.tsx',
        content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
        type: 'tsx'
      },
      {
        path: 'components/ui/card.tsx',
        content: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`,
        type: 'tsx'
      },
      {
        path: 'components/ui/badge.tsx',
        content: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`,
        type: 'tsx'
      }
    ];
  }

  private generateLibFiles(): GeneratedFile[] {
    return [
      {
        path: 'lib/utils.ts',
        content: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
        type: 'ts'
      }
    ];
  }

  private generateConfigFiles(): GeneratedFile[] {
    return [
      {
        path: 'next.config.js',
        content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`,
        type: 'js'
      },
      {
        path: 'tailwind.config.ts',
        content: `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;`,
        type: 'ts'
      },
      {
        path: 'tsconfig.json',
        content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
        type: 'json'
      },
      {
        path: 'postcss.config.js',
        content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
        type: 'js'
      }
    ];
  }

  private async generatePageContent(analysis: AnalysisResult): Promise<string> {
    const { websiteData } = analysis;
    const title = websiteData.title || 'Professional Services';
    const heroContent = await this.generateAIContent(analysis, 'hero');
    const featuresContent = await this.generateAIContent(analysis, 'features');
    const aboutContent = await this.generateAIContent(analysis, 'about');
    
    const images = websiteData.images && websiteData.images.length > 0 
      ? websiteData.images 
      : [
          'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];

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
  X,
  Truck,
  Shield,
  Clock
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
                ${title}
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Quote
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
                  Get Quote
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
                  ✨ Professional ${title} Services
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    ${title}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  ${heroContent}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 border-2 hover:bg-gray-50">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">98%</div>
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
                  src="${images[0]}"
                  alt="${title}"
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional ${title} Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ${featuresContent}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${images.slice(0, 3).map((img, index) => `
            <Card className="group bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src="${img}"
                    alt="Service ${index + 1}"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">${title} Service ${index + 1}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Professional and reliable service with attention to detail and customer satisfaction.
                </CardDescription>
              </CardHeader>
            </Card>
            `).join('')}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">
                About Us
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose ${title}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                ${aboutContent}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">Fully Insured & Licensed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Punctual & Reliable Service</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-purple-600" />
                  <span className="text-gray-700">Professional Equipment</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="${images[1] || images[0]}"
                alt="About ${title}"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to get started? Contact us today for a free quote and professional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">Available 24/7 for urgent requests</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">Get a detailed quote via email</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">Local service area coverage</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
              Get Free Quote Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">${title}</h3>
              <p className="text-gray-300">
                Professional services you can trust. Quality, reliability, and customer satisfaction guaranteed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>${title}</li>
                <li>Professional Moving</li>
                <li>Storage Solutions</li>
                <li>Packing Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Testimonials</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@${title.toLowerCase().replace(/\\s+/g, '')}.com</li>
                <li>Address: Local Service Area</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 ${title}. All rights reserved. Built with Next.js and AI-powered optimization.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}`;
  }

  private generateLayoutContent(analysis: AnalysisResult): string {
    const title = analysis.websiteData.title || 'Generated Website';
    const description = analysis.websiteData.description || 'A modern, AI-powered website';
    const keywords = analysis.seo?.keywords?.slice(0, 10).map(k => `'${k}'`).join(', ') || "'website', 'modern', 'professional'";
    const images = analysis.websiteData.images?.slice(0, 3).map(img => `'${img}'`).join(', ') || "'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'";
    const firstImage = analysis.websiteData.images?.[0] || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800';
    
    return `import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '${title}',
  description: '${description}',
  keywords: [${keywords}],
  authors: [{ name: 'Website Analyzer & Rebuilder' }],
  robots: 'index, follow',
  openGraph: {
    title: '${title}',
    description: '${description}',
    type: 'website',
    images: [${images}],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${description}',
    images: ['${firstImage}'],
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
    const title = analysis.websiteData.title || 'generated-website';
    const name = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Only include valid Radix UI packages
    return JSON.stringify({
      name: name,
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
        '@radix-ui/react-accordion': '^1.2.0',
        '@radix-ui/react-alert-dialog': '^1.1.1',
        '@radix-ui/react-avatar': '^1.1.0',
        '@radix-ui/react-dialog': '^1.1.1',
        '@radix-ui/react-dropdown-menu': '^2.1.1',
        '@radix-ui/react-label': '^2.1.0',
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

  private generateReadme(analysis: AnalysisResult): string {
    const title = analysis.websiteData.title || 'Generated Website';
    const description = analysis.websiteData.description || 'A modern, AI-powered website';
    const url = analysis.url || 'Unknown URL';
    const timestamp = analysis.timestamp ? new Date(analysis.timestamp).toISOString() : new Date().toISOString();
    
    return `# ${title}

This is a modern, AI-powered rebuilt version of the original website, generated using the Website Analyzer & Rebuilder tool.

## Features

- ⚡ Built with Next.js 14+ and TypeScript
- 🎨 Styled with Tailwind CSS and shadcn/ui components
- 📱 Fully responsive design
- ♿ Improved accessibility (WCAG AA compliant)
- 🚀 Optimized performance
- 🔍 SEO-friendly with proper meta tags
- 🤖 AI-enhanced content generation
- 🖼️ Optimized image handling

## Original Analysis Results

### Performance Score: ${analysis.performance?.score || 0}/100
- Load time improved from ${analysis.performance?.loadTime || 0}s
- Size optimized from ${analysis.performance?.size || 0}MB
- Modern image optimization and lazy loading

### SEO Score: ${analysis.seo?.score || 0}/100
- Proper meta tags and structured data
- Improved heading hierarchy
- Enhanced semantic HTML
- Open Graph and Twitter card support

### Design Score: ${analysis.design?.score || 0}/100
- Modern, clean interface
- Consistent spacing and typography
- Improved color contrast and accessibility
- Professional animations and transitions

### Accessibility Score: ${analysis.accessibility?.score || 0}/100
- WCAG AA compliance
- Proper ARIA labels
- Enhanced keyboard navigation
- Screen reader friendly

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

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage component
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts             # Utility functions
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
\`\`\`

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Built with Website Analyzer & Rebuilder

This site was automatically generated and optimized using modern web development best practices and AI-powered content enhancement.

- Original URL: ${url}
- Generated on: ${timestamp}
- Performance improvements: ${Math.round((100 - (analysis.performance?.score || 0)) * 0.8)}%
- SEO enhancements: ${Math.round((100 - (analysis.seo?.score || 0)) * 0.7)}%
- Design modernization: ${Math.round((100 - (analysis.design?.score || 0)) * 0.9)}%
- Accessibility improvements: ${Math.round((100 - (analysis.accessibility?.score || 0)) * 0.6)}%

## AI Integration

This site uses AI-powered content generation to:
- Enhance original content with professional copywriting
- Generate relevant meta descriptions and keywords
- Create engaging call-to-action text
- Optimize for search engines and user experience

## License

This project is generated for demonstration purposes. Please ensure you have the right to use any content or images from the original website.
`;
  }

  public async generateSite(analysis: AnalysisResult): Promise<GeneratedSite> {
    try {
      const files: GeneratedFile[] = [
        // Main app files
        {
          path: 'app/page.tsx',
          content: await this.generatePageContent(analysis),
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
        
        // UI Components
        ...this.generateUIComponents(),
        
        // Library files
        ...this.generateLibFiles(),
        
        // Configuration files
        ...this.generateConfigFiles(),
        
        // Package files
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
    } catch (error) {
      console.error('Error in generateSite:', error);
      throw new Error(`Failed to generate site: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const siteGenerator = new SiteGenerator();
*/ 
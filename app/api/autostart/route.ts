// TEMPORARILY DISABLED - Autostart API Route
/*
import { NextRequest, NextResponse } from 'next/server';
import { siteGenerator } from '@/lib/site-generator';
import { AnalysisResult } from '@/lib/website-analyzer';

interface GenerationRequest {
  analysisResult: AnalysisResult;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();
    const { analysisResult } = body;

    if (!analysisResult) {
      return NextResponse.json(
        { error: 'Analysis result is required' },
        { status: 400 }
      );
    }

    console.log('Autostart request received:', { 
      hasAnalysisResult: !!analysisResult,
      title: analysisResult.websiteData?.title 
    });

    // Generate the site files
    const generatedSite = await siteGenerator.generateSite(analysisResult);

    // Create a deployment-ready package.json
    const deploymentPackageJson = {
      name: `${analysisResult.websiteData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-site`,
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        next: '14.0.0',
        react: '^18',
        'react-dom': '^18',
        '@types/node': '^20',
        '@types/react': '^18',
        '@types/react-dom': '^18',
        typescript: '^5',
        tailwindcss: '^3.3.0',
        autoprefixer: '^10.0.1',
        postcss: '^8'
      }
    };

    // Add the package.json to the generated files
    const filesWithPackageJson = [
      ...generatedSite.files,
      {
        path: 'package.json',
        content: JSON.stringify(deploymentPackageJson, null, 2)
      },
      {
        path: 'next.config.js',
        content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;`
      },
      {
        path: 'tailwind.config.js',
        content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
      },
      {
        path: 'postcss.config.js',
        content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
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
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
      }
    ];

    // Return the generated files and deployment instructions
    return NextResponse.json({
      success: true,
      message: 'Site generated successfully! Ready for deployment.',
      url: 'http://localhost:3000', // Placeholder URL for local development
      files: filesWithPackageJson,
      deploymentInstructions: {
        local: {
          steps: [
            '1. Download the generated files',
            '2. Extract to a new directory',
            '3. Run: npm install',
            '4. Run: npm run dev',
            '5. Open: http://localhost:3000'
          ]
        },
        vercel: {
          steps: [
            '1. Download the generated files',
            '2. Create a new repository on GitHub',
            '3. Upload the files to the repository',
            '4. Connect the repository to Vercel',
            '5. Deploy automatically'
          ]
        },
        netlify: {
          steps: [
            '1. Download the generated files',
            '2. Create a new repository on GitHub',
            '3. Upload the files to the repository',
            '4. Connect the repository to Netlify',
            '5. Deploy automatically'
          ]
        }
      },
      siteInfo: {
        title: analysisResult.websiteData.title,
        description: analysisResult.websiteData.description,
        pages: generatedSite.files.filter(f => f.path.endsWith('.tsx') || f.path.endsWith('.jsx')).length
      }
    });

  } catch (error) {
    console.error('Error in autostart:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate deployment-ready site' },
      { status: 500 }
    );
  }
}
*/ 
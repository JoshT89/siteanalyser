// TEMPORARILY DISABLED - Autostart API Route
/*
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { siteGenerator } from '@/lib/site-generator';
import { AnalysisResult } from '@/lib/website-analyzer';

interface GenerationRequest {
  analysisResult: AnalysisResult;
}

const GENERATED_DIR = path.join(process.cwd(), 'generated-sites');

async function writeFiles(files: any[]) {
  for (const file of files) {
    const filePath = path.join(GENERATED_DIR, file.path);
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, file.content);
  }
}

async function runCommand(command: string, args: string[], cwd: string) {
  const { spawn } = require('child_process');
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { 
      cwd, 
      stdio: 'pipe',
      shell: true 
    });
    
    child.on('close', (code: number) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    child.on('error', (error: Error) => {
      reject(error);
    });
  });
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

    // Generate the site
    const generatedSite = await siteGenerator.generateSite(analysisResult);

    // Clean the directory first
    await fs.rm(GENERATED_DIR, { recursive: true, force: true });
    await fs.mkdir(GENERATED_DIR, { recursive: true });

    // Write files
    await writeFiles(generatedSite.files);

    // Run npm install
    await runCommand('npm', ['install'], GENERATED_DIR);

    // Update package.json to use port 3001
    const packageJsonPath = path.join(GENERATED_DIR, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    packageJson.scripts.dev = 'next dev -p 3001';
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Run npm run dev (in background)
    runCommand('npm', ['run', 'dev'], GENERATED_DIR);

    // Return the local URL
    return NextResponse.json({
      message: 'Site generated and started!',
      url: 'http://localhost:3001',
      directory: GENERATED_DIR
    });
  } catch (error) {
    console.error('Error in autostart:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to autostart site' },
      { status: 500 }
    );
  }
}
*/ 
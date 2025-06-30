import { NextRequest, NextResponse } from 'next/server';
import { siteGenerator } from '@/lib/site-generator';
import { AnalysisResult } from '@/lib/website-analyzer';
import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';

interface GenerationRequest {
  analysisResult: AnalysisResult;
}

const GENERATED_DIR = path.resolve(process.cwd(), '../generated-site');

async function writeFiles(files: { path: string; content: string }[]) {
  for (const file of files) {
    const filePath = path.join(GENERATED_DIR, file.path);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, file.content, 'utf8');
  }
}

function runCommand(cmd: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, shell: true, stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}`));
    });
    proc.on('error', reject);
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
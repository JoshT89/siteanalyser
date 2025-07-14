// TEMPORARILY DISABLED - Generate API Route
/*
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
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

    // Generate the complete site using our enhanced generator
    const generatedSite = await siteGenerator.generateSite(analysisResult);

    // Create a ZIP file with all the generated files
    const zip = new JSZip();

    // Add all generated files to the ZIP
    generatedSite.files.forEach((file) => {
      zip.file(file.path, file.content);
    });

    // Generate the ZIP file
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Create a timestamp for the filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const title = analysisResult.websiteData.title || 'generated-website';
    const siteName = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const filename = `${siteName}-${timestamp}.zip`;

    // Return the ZIP file as a download
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating site:', error);
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    );
  }
}
*/ 
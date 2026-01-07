import { NextRequest, NextResponse } from 'next/server';
import { createJob } from '@/lib/api';
import { JobFormData } from '@/types/job';

export async function POST(request: NextRequest) {
  try {
    const jobData: JobFormData = await request.json();
    const job = await createJob(jobData);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}


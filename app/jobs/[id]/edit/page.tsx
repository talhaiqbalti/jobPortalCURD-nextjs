import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/api';
import Navigation from '@/components/Navigation';
import JobForm from '@/components/JobForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJobById(Number(id));

  if (!job) {
    notFound();
  }

  const initialData = {
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    requirements: job.requirements,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Job</h1>
          <p className="text-gray-600">Update the job listing details</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <JobForm initialData={initialData} jobId={job.id} />
        </div>
      </main>
    </div>
  );
}


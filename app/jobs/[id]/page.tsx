import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/api';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJobById(Number(id));

  if (!job) {
    notFound();
  }

  const typeColors: Record<string, string> = {
    'Full-time': 'bg-green-100 text-green-800',
    'Part-time': 'bg-blue-100 text-blue-800',
    'Contract': 'bg-purple-100 text-purple-800',
    'Internship': 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center"
        >
          ← Back to Jobs
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <span className="flex items-center">
                  📍 {job.location}
                </span>
                <span className="flex items-center">
                  💰 {job.salary}
                </span>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                typeColors[job.type] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {job.type}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.requirements}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <Link
                href={`/jobs/${job.id}/edit`}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Job
              </Link>
            </div>
            <DeleteButton jobId={job.id} />
          </div>
        </div>
      </main>
    </div>
  );
}


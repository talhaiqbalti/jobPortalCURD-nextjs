import Navigation from '@/components/Navigation';
import JobForm from '@/components/JobForm';

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">Fill in the details below to post your job listing</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <JobForm />
        </div>
      </main>
    </div>
  );
}


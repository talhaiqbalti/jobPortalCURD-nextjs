import Link from 'next/link';
import { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const typeColors: Record<string, string> = {
    'Full-time': 'bg-green-100 text-green-800',
    'Part-time': 'bg-blue-100 text-blue-800',
    'Contract': 'bg-purple-100 text-purple-800',
    'Internship': 'bg-orange-100 text-orange-800',
  };

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 hover:border-blue-300 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm mb-1">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              typeColors[job.type] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {job.type}
          </span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold text-sm">{job.salary}</span>
          <span className="text-gray-500 text-xs">View Details →</span>
        </div>
      </div>
    </Link>
  );
}


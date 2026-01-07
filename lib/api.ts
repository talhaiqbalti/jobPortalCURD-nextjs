import { Job, JobFormData } from '@/types/job';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Since JSONPlaceholder doesn't have jobs endpoint, we'll use posts
// and transform the data structure to match our Job interface
export async function getAllJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      cache: 'no-store',
    });
    const posts = await response.json();
    
    // Transform posts to jobs format
    return posts.map((post: any, index: number) => ({
      id: post.id,
      title: post.title,
      company: `Company ${post.userId}`,
      location: ['Remote', 'New York', 'San Francisco', 'London', 'Berlin'][index % 5],
      type: ['Full-time', 'Part-time', 'Contract', 'Internship'][index % 4],
      salary: `$${(50 + (index % 50) * 10)}k - $${(100 + (index % 50) * 10)}k`,
      description: post.body,
      requirements: `Requirements for ${post.title}. Experience in related field required.`,
      userId: post.userId,
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function getJobById(id: number): Promise<Job | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const post = await response.json();
    
    // Transform post to job format
    return {
      id: post.id,
      title: post.title,
      company: `Company ${post.userId}`,
      location: ['Remote', 'New York', 'San Francisco', 'London', 'Berlin'][post.id % 5],
      type: ['Full-time', 'Part-time', 'Contract', 'Internship'][post.id % 4],
      salary: `$${(50 + (post.id % 50) * 10)}k - $${(100 + (post.id % 50) * 10)}k`,
      description: post.body,
      requirements: `Requirements for ${post.title}. Experience in related field required.`,
      userId: post.userId,
    };
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function createJob(jobData: JobFormData): Promise<Job> {
  try {
    // JSONPlaceholder doesn't actually save data, but simulates creation
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: jobData.title,
        body: jobData.description,
        userId: 1,
      }),
    });
    
    const post = await response.json();
    
    // Transform to job format
    return {
      id: post.id,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      type: jobData.type,
      salary: jobData.salary,
      description: jobData.description,
      requirements: jobData.requirements,
      userId: post.userId,
    };
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
}

export async function updateJob(id: number, jobData: JobFormData): Promise<Job> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title: jobData.title,
        body: jobData.description,
        userId: 1,
      }),
    });
    
    const post = await response.json();
    
    // Transform to job format
    return {
      id: post.id,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      type: jobData.type,
      salary: jobData.salary,
      description: jobData.description,
      requirements: jobData.requirements,
      userId: post.userId,
    };
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

export async function deleteJob(id: number): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}


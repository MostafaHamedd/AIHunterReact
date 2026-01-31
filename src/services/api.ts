const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`)
  }

  return response.json()
}

async function fetchApiWithFile<T>(
  endpoint: string,
  file: File,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const formData = new FormData()
  formData.append('file', file)

  const config: RequestInit = {
    method: 'POST',
    body: formData,
    ...options,
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`)
  }

  return response.json()
}

export const api = {
  // Job Descriptions
  async analyzeJobDescription(urlOrText: string, isUrl: boolean) {
    return fetchApi('/job-descriptions/analyze', {
      method: 'POST',
      body: JSON.stringify({
        url: isUrl ? urlOrText : undefined,
        text: isUrl ? undefined : urlOrText,
      }),
    })
  },

  async getJobDescription(id: string) {
    return fetchApi(`/job-descriptions/${id}`)
  },

  // Resumes
  async uploadResume(file: File) {
    return fetchApiWithFile('/resumes/upload', file)
  },

  async getResume(id: string) {
    return fetchApi(`/resumes/${id}`)
  },

  async optimizeResume(resumeId: string, jobDescriptionId: string) {
    return fetchApi(`/resumes/${resumeId}/optimize/${jobDescriptionId}`, {
      method: 'POST',
    })
  },

  // ATS Scoring
  async calculateATSScore(resumeId: string, jobDescriptionId: string) {
    return fetchApi(`/ats/score?resumeId=${resumeId}&jobDescriptionId=${jobDescriptionId}`)
  },

  // Job Applications
  async createApplication(jobDescriptionId: string, resumeId: string) {
    return fetchApi('/applications', {
      method: 'POST',
      body: JSON.stringify({
        jobDescriptionId: Number(jobDescriptionId),
        resumeId: Number(resumeId),
      }),
    })
  },

  async getApplications(search?: string, status?: string) {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (status) params.append('status', status)
    
    const query = params.toString()
    return fetchApi(`/applications${query ? `?${query}` : ''}`)
  },

  async getApplication(id: string) {
    return fetchApi(`/applications/${id}`)
  },

  async updateApplicationStatus(id: string, status: string) {
    return fetchApi(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  },

  async addNote(id: string, note: string) {
    return fetchApi(`/applications/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    })
  },
}


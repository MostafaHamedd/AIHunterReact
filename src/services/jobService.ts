import { api } from './api'
import type { JobDescription } from '@/types'

export const jobService = {
  async analyzeJobDescription(urlOrText: string, isUrl: boolean): Promise<JobDescription> {
    const response = await api.analyzeJobDescription(urlOrText, isUrl)
    
    return {
      id: response.id.toString(),
      url: response.url,
      title: response.title,
      company: response.company,
      description: response.description || '',
      extractedData: {
        requiredSkills: response.extractedData.requiredSkills || [],
        keywords: response.extractedData.keywords || [],
        technologies: response.extractedData.technologies || [],
        softSkills: response.extractedData.softSkills || [],
        responsibilities: response.extractedData.responsibilities || [],
      },
      createdAt: new Date(response.createdAt),
    }
  },
}


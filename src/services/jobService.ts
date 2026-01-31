import { api } from './api'
import type { JobDescription } from '@/types'

export const jobService = {
  async analyzeJobDescription(_urlOrText: string, _isUrl: boolean): Promise<JobDescription> {
    const response = await api.analyzeJobDescription(_urlOrText, _isUrl) as any
    
    return {
      id: response?.id?.toString() || '',
      url: response?.url || '',
      title: response?.title || '',
      company: response?.company || '',
      description: response?.description || '',
      extractedData: {
        requiredSkills: response?.extractedData?.requiredSkills || [],
        keywords: response?.extractedData?.keywords || [],
        technologies: response?.extractedData?.technologies || [],
        softSkills: response?.extractedData?.softSkills || [],
        responsibilities: response?.extractedData?.responsibilities || [],
      },
      createdAt: response?.createdAt ? new Date(response.createdAt) : new Date(),
    }
  },
}


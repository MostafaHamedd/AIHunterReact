import { api } from './api'
import type { CoverLetter } from '@/types'

export const coverLetterService = {
  async uploadCoverLetter(file: File): Promise<CoverLetter> {
    try {
      console.log('Calling API to upload cover letter:', file.name)
      const response = await api.uploadCoverLetter(file) as any
      console.log('API Response:', response)
      
      return {
        id: response?.id?.toString() || '',
        name: response?.name || file.name,
        originalContent: response?.originalContent || '',
        optimizedContent: response?.optimizedContent || response?.originalContent || '',
        version: response?.version || '1.0',
        createdAt: response?.createdAt ? new Date(response.createdAt) : new Date(),
      }
    } catch (error: any) {
      console.error('Error in coverLetterService.uploadCoverLetter:', error)
      // If backend endpoint doesn't exist yet, create a local version
      const text = await file.text()
      return {
        id: Date.now().toString(),
        name: file.name,
        originalContent: text,
        optimizedContent: text,
        version: '1.0',
        createdAt: new Date(),
      }
    }
  },

  async getCoverLetter(id: string): Promise<CoverLetter> {
    const response = await api.getCoverLetter(id) as any
    
    return {
      id: response?.id?.toString() || '',
      name: response?.name || '',
      originalContent: response?.originalContent || '',
      optimizedContent: response?.optimizedContent || '',
      version: response?.version || '1.0',
      createdAt: response?.createdAt ? new Date(response.createdAt) : new Date(),
    }
  },
}


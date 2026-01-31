import { api } from './api'
import type { Resume, ResumeSection } from '@/types'

export const resumeService = {
  async uploadResume(_file: File): Promise<Resume> {
    try {
      console.log('Calling API to upload resume:', _file.name)
      const response = await api.uploadResume(_file) as any
      console.log('API Response:', response)
      
      if (!response || !response.originalContent) {
        throw new Error('Invalid response from server: missing resume content')
      }
      
      const mappedResume = {
        id: response?.id?.toString() || '',
        name: response?.name || '',
        originalContent: this.mapResumeContent(response?.originalContent),
        optimizedContent: response?.optimizedContent 
          ? this.mapResumeContent(response.optimizedContent)
          : this.mapResumeContent(response?.originalContent),
        version: response?.version || '1.0',
        createdAt: response?.createdAt ? new Date(response.createdAt) : new Date(),
      }
      
      console.log('Mapped Resume:', mappedResume)
      return mappedResume
    } catch (error: any) {
      console.error('Error in resumeService.uploadResume:', error)
      throw new Error(`Failed to upload resume: ${error?.message || 'Unknown error'}`)
    }
  },

  async optimizeResume(resumeId: string, jobDescriptionId: string): Promise<Resume> {
    const response = await api.optimizeResume(resumeId, jobDescriptionId) as any
    
    return {
      id: response?.id?.toString() || '',
      name: response?.name || '',
      originalContent: this.mapResumeContent(response?.originalContent),
      optimizedContent: this.mapResumeContent(response?.optimizedContent),
      version: response?.version || '1.0',
      createdAt: response?.createdAt ? new Date(response.createdAt) : new Date(),
    }
  },

  mapResumeContent(content: any): ResumeSection {
    if (!content) {
      return {
        summary: '',
        experience: [],
        skills: [],
        projects: [],
      }
    }

    return {
      summary: content.summary || '',
      experience: Array.isArray(content.experience) 
        ? content.experience.map((exp: any) => ({
            id: exp?.id?.toString() || Date.now().toString() + Math.random(),
            company: exp?.company || '',
            role: exp?.role || '',
            duration: exp?.duration || '',
            bullets: Array.isArray(exp?.bullets) ? exp.bullets : [],
          }))
        : [],
      skills: Array.isArray(content.skills) ? content.skills : [],
      projects: Array.isArray(content.projects)
        ? content.projects.map((proj: any) => ({
            id: proj?.id?.toString() || Date.now().toString() + Math.random(),
            name: proj?.name || '',
            description: proj?.description || '',
            technologies: Array.isArray(proj?.technologies) ? proj.technologies : [],
          }))
        : [],
    }
  },
}


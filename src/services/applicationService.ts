import { api } from './api'
import type { JobApplication, ApplicationStatus } from '@/types'

export const applicationService = {
  async createApplication(jobDescriptionId: string, resumeId: string): Promise<JobApplication> {
    const response = await api.createApplication(jobDescriptionId, resumeId)
    return this.mapApplication(response)
  },

  async getApplications(search?: string, status?: string): Promise<JobApplication[]> {
    const response = await api.getApplications(search, status)
    return (response || []).map(this.mapApplication)
  },

  async getApplication(id: string): Promise<JobApplication> {
    const response = await api.getApplication(id)
    return this.mapApplication(response)
  },

  async updateStatus(id: string, status: ApplicationStatus): Promise<JobApplication> {
    const response = await api.updateApplicationStatus(id, status.toUpperCase())
    return this.mapApplication(response)
  },

  async addNote(id: string, note: string): Promise<JobApplication> {
    const response = await api.addNote(id, note)
    return this.mapApplication(response)
  },

  mapApplication(response: any): JobApplication {
    return {
      id: response.id.toString(),
      company: response.company,
      role: response.role,
      jobLink: response.jobLink || '',
      resumeId: response.resumeId?.toString() || '',
      coverLetterId: response.coverLetterId?.toString(),
      status: response.status.toLowerCase().replace('_', '_') as ApplicationStatus,
      applicationDate: response.applicationDate ? new Date(response.applicationDate) : undefined,
      notes: (response.notes || []).map((note: any) => ({
        id: note.id.toString(),
        content: note.content,
        createdAt: new Date(note.createdAt),
      })),
      timeline: (response.timeline || []).map((event: any) => ({
        id: event.id.toString(),
        type: event.type.toLowerCase() as 'optimized' | 'submitted' | 'status_change' | 'note',
        title: event.title,
        description: event.description,
        date: new Date(event.date),
      })),
      createdAt: new Date(response.createdAt),
    }
  },
}


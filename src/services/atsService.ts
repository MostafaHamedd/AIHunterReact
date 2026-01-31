import { api } from './api'
import type { ATSScore } from '@/types'

export const atsService = {
  async calculateScore(resumeId: string, jobDescriptionId: string): Promise<ATSScore> {
    const response = await api.calculateATSScore(resumeId, jobDescriptionId)
    
    return {
      score: response.score,
      matchedKeywords: (response.matchedKeywords || []).map((kw: any) => ({
        keyword: kw.keyword,
        matched: kw.matched,
        suggested: kw.suggested,
        category: kw.category as 'skill' | 'technology' | 'soft-skill' | 'keyword',
      })),
      missingKeywords: (response.missingKeywords || []).map((kw: any) => ({
        keyword: kw.keyword,
        matched: kw.matched,
        suggested: kw.suggested,
        category: kw.category as 'skill' | 'technology' | 'soft-skill' | 'keyword',
      })),
      suggestedKeywords: (response.suggestedKeywords || []).map((kw: any) => ({
        keyword: kw.keyword,
        matched: kw.matched,
        suggested: kw.suggested,
        category: kw.category as 'skill' | 'technology' | 'soft-skill' | 'keyword',
      })),
    }
  },
}


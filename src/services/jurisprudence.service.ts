import api from '../config/api'
import type { Precedent } from '../Tables/PrecedentsTable'

export interface SearchPrecedentsParams {
  query?: string
  caseType?: string
  court?: string
  dateFrom?: string
  dateTo?: string
  limit?: number
  offset?: number
}

export interface PrecedentDetail extends Precedent {
  fullText: string
  relatedCases: number[]
  citations: number
  tags: string[]
}

class JurisprudenceService {
  async getAllPrecedents(params?: SearchPrecedentsParams): Promise<Precedent[]> {
    const response = await api.get<Precedent[]>('/jurisprudence', { params })
    return response.data
  }

  async searchSimilarPrecedents(caseId: number, limit = 10): Promise<Precedent[]> {
    const response = await api.get<Precedent[]>(`/jurisprudence/similar/${caseId}`, {
      params: { limit }
    })
    return response.data
  }

  async getPrecedentById(id: number): Promise<PrecedentDetail> {
    const response = await api.get<PrecedentDetail>(`/jurisprudence/${id}`)
    return response.data
  }

  async searchByText(query: string): Promise<Precedent[]> {
    const response = await api.post<Precedent[]>('/jurisprudence/search', { query })
    return response.data
  }

  async getRecommendedPrecedents(caseType: string): Promise<Precedent[]> {
    const response = await api.get<Precedent[]>('/jurisprudence/recommended', {
      params: { caseType }
    })
    return response.data
  }
}

export default new JurisprudenceService()


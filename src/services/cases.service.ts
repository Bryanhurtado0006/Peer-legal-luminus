import api from '../config/api'
import type { Case } from '../Tables/CasesTable'

export interface CreateCaseData {
  title: string
  caseType: string
  plaintiff: string
  defendant: string
  description: string
  facts: string
  legalBasis: string
  evidence?: File[]
}

export interface CaseAnalysis {
  id: number
  case_id: number
  status: 'processing' | 'completed' | 'failed'
  precedents: any[]
  strategies: any[]
  created_at: string
  updated_at: string
}

class CasesService {
  async getAllCases(): Promise<Case[]> {
    const response = await api.get<Case[]>('/cases')
    return response.data
  }

  async getCaseById(id: number): Promise<Case> {
    const response = await api.get<Case>(`/cases/${id}`)
    return response.data
  }

  async createCase(data: CreateCaseData): Promise<Case> {
    const formData = new FormData()
    
    // Agregar campos de texto
    formData.append('title', data.title)
    formData.append('caseType', data.caseType)
    formData.append('plaintiff', data.plaintiff)
    formData.append('defendant', data.defendant)
    formData.append('description', data.description)
    formData.append('facts', data.facts)
    formData.append('legalBasis', data.legalBasis)
    
    // Agregar archivos de evidencia
    if (data.evidence && data.evidence.length > 0) {
      data.evidence.forEach((file, index) => {
        formData.append(`evidence[${index}]`, file)
      })
    }
    
    const response = await api.post<Case>('/cases', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response.data
  }

  async updateCase(id: number, data: Partial<CreateCaseData>): Promise<Case> {
    const response = await api.put<Case>(`/cases/${id}`, data)
    return response.data
  }

  async deleteCase(id: number): Promise<void> {
    await api.delete(`/cases/${id}`)
  }

  async analyzeCase(caseId: number): Promise<CaseAnalysis> {
    const response = await api.post<CaseAnalysis>(`/cases/${caseId}/analyze`)
    return response.data
  }

  async getCaseAnalysis(caseId: number): Promise<CaseAnalysis> {
    const response = await api.get<CaseAnalysis>(`/cases/${caseId}/analysis`)
    return response.data
  }

  async getCaseStats() {
    const response = await api.get('/cases/stats')
    return response.data
  }

  async getUserQuota() {
    const response = await api.get('/cases/quota')
    return response.data
  }
}

export default new CasesService()


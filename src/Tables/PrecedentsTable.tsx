import React from 'react'

export interface Precedent {
  id: number
  name: string
  court: string
  date: string
  caseType: string
  summary: string
  similarity?: number
}

interface PrecedentsTableProps {
  precedents: Precedent[]
  onViewPrecedent: (id: number) => void
}

const PrecedentsTable: React.FC<PrecedentsTableProps> = ({ precedents, onViewPrecedent }) => {
  const getCaseTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      civil: 'Civil',
      penal: 'Penal',
      laboral: 'Laboral',
      mercantil: 'Mercantil',
      familiar: 'Familiar',
      administrativo: 'Administrativo'
    }
    return types[type] || type
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (precedents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">No se encontraron precedentes</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Sentencia</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Corte</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Tipo</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Fecha</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Resumen</th>
            <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Acción</th>
          </tr>
        </thead>
        <tbody>
          {precedents.map((precedent) => (
            <tr 
              key={precedent.id} 
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="font-medium text-gray-900 dark:text-white">{precedent.name}</div>
                {precedent.similarity && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs font-semibold">
                    {precedent.similarity}% similar
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">{precedent.court}</span>
              </td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                  {getCaseTypeLabel(precedent.caseType)}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(precedent.date)}</span>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{precedent.summary}</p>
              </td>
              <td className="py-4 px-4">
                <button
                  onClick={() => onViewPrecedent(precedent.id)}
                  className="px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrecedentsTable


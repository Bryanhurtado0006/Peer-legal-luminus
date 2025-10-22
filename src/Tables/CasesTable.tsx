import React from 'react'

export interface Case {
  id: number
  title: string
  caseType: string
  status: 'draft' | 'analyzing' | 'completed'
  createdAt: string
  plaintiff?: string
  defendant?: string
}

interface CasesTableProps {
  cases: Case[]
  onViewCase: (caseId: number) => void
  onDeleteCase?: (caseId: number) => void
}

const CasesTable: React.FC<CasesTableProps> = ({ cases, onViewCase, onDeleteCase }) => {
  const getStatusBadge = (status: Case['status']) => {
    const styles = {
      draft: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      analyzing: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
      completed: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
    }

    const labels = {
      draft: 'Borrador',
      analyzing: 'Analizando',
      completed: 'Completado'
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

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

  if (cases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">No hay casos registrados</p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Comienza creando tu primer caso legal</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Título del Caso</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Tipo</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Partes</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Estado</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Fecha Creación</th>
            <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr 
              key={caseItem.id} 
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="font-medium text-gray-900 dark:text-white">{caseItem.title}</div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getCaseTypeLabel(caseItem.caseType)}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {caseItem.plaintiff && caseItem.defendant ? (
                    <div>
                      <div className="truncate max-w-xs">{caseItem.plaintiff} vs {caseItem.defendant}</div>
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">-</span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                {getStatusBadge(caseItem.status)}
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(caseItem.createdAt)}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onViewCase(caseItem.id)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {onDeleteCase && (
                    <button
                      onClick={() => onDeleteCase(caseItem.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Eliminar caso"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CasesTable


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import PrecedentsTable from '../Tables/PrecedentsTable'
import type { Precedent } from '../Tables/PrecedentsTable'

const JurisprudenceLibrary = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterCourt, setFilterCourt] = useState<string>('all')

  // TODO: Estos datos vendrán de la API
  const [allPrecedents] = useState<Precedent[]>([
    { id: 1, name: 'Sentencia T-123/2023', court: 'Corte Suprema de Justicia', date: '2023-03-15', caseType: 'civil', summary: 'Incumplimiento de contrato de servicios profesionales. Establece criterios para determinar la mora del deudor.' },
    { id: 2, name: 'Sentencia C-456/2022', court: 'Corte Constitucional', date: '2022-11-20', caseType: 'civil', summary: 'Interpretación de cláusulas contractuales y alcance de obligaciones.' },
    { id: 3, name: 'Sentencia 789/2021', court: 'Tribunal Superior', date: '2021-08-10', caseType: 'civil', summary: 'Cálculo de indemnizaciones por incumplimiento contractual.' },
    { id: 4, name: 'Sentencia P-234/2023', court: 'Corte Suprema de Justicia', date: '2023-01-12', caseType: 'penal', summary: 'Hurto calificado. Análisis de circunstancias agravantes y atenuantes.' },
    { id: 5, name: 'Sentencia P-567/2022', court: 'Tribunal Superior', date: '2022-09-05', caseType: 'penal', summary: 'Lesiones personales. Valoración de pruebas periciales médicas.' },
    { id: 6, name: 'Sentencia L-890/2023', court: 'Corte Suprema de Justicia', date: '2023-02-28', caseType: 'laboral', summary: 'Despido sin justa causa. Indemnización y reintegro laboral.' },
    { id: 7, name: 'Sentencia L-345/2022', court: 'Tribunal Superior', date: '2022-12-15', caseType: 'laboral', summary: 'Acoso laboral. Prueba testimonial y daño moral.' },
    { id: 8, name: 'Sentencia F-678/2023', court: 'Corte Constitucional', date: '2023-04-10', caseType: 'familiar', summary: 'Custodia de menores. Interés superior del niño.' },
    { id: 9, name: 'Sentencia F-901/2022', court: 'Tribunal Superior', date: '2022-10-22', caseType: 'familiar', summary: 'Divorcio contencioso. Liquidación de sociedad conyugal.' },
    { id: 10, name: 'Sentencia M-234/2023', court: 'Corte Suprema de Justicia', date: '2023-05-18', caseType: 'mercantil', summary: 'Competencia desleal. Daños y perjuicios comerciales.' },
    { id: 11, name: 'Sentencia M-567/2022', court: 'Tribunal Superior', date: '2022-07-30', caseType: 'mercantil', summary: 'Quiebra empresarial. Prelación de créditos.' },
    { id: 12, name: 'Sentencia A-890/2023', court: 'Corte Constitucional', date: '2023-06-05', caseType: 'administrativo', summary: 'Sanción administrativa. Debido proceso y proporcionalidad.' },
    { id: 13, name: 'Sentencia A-123/2022', court: 'Tribunal Superior', date: '2022-11-08', caseType: 'administrativo', summary: 'Revocatoria directa de acto administrativo.' },
    { id: 14, name: 'Sentencia C-789/2023', court: 'Corte Suprema de Justicia', date: '2023-03-22', caseType: 'civil', summary: 'Responsabilidad civil extracontractual por daño emergente.' },
    { id: 15, name: 'Sentencia C-456/2021', court: 'Corte Constitucional', date: '2021-12-14', caseType: 'civil', summary: 'Prescripción de acciones civiles. Cómputo de términos.' }
  ])

  // Filtrado
  const filteredPrecedents = allPrecedents.filter(precedent => {
    const matchesSearch = precedent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          precedent.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || precedent.caseType === filterType
    const matchesCourt = filterCourt === 'all' || precedent.court === filterCourt
    
    return matchesSearch && matchesType && matchesCourt
  })

  const handleViewPrecedent = (id: number) => {
    console.log('Ver precedente:', id)
    // TODO: Implementar modal o página de detalle
    alert(`Detalle del precedente ${id} (próximamente)`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setFilterType('all')
    setFilterCourt('all')
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    navigate('/login')
  }

  const userData = {
    username: 'bryandreshurtado18',
    email: 'bryandreshurtado18@gmail.com'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.14l-6 3.75-6-3.75V7.93l6-3.75z"/>
                  <path d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">PEER-LEGAL</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
              >
                {theme === 'light' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{userData.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Cerrar sesión"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Biblioteca de Jurisprudencia</h2>
          <p className="text-gray-600 dark:text-gray-400">Explora precedentes legales relevantes</p>
        </div>

        {/* Card principal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {filteredPrecedents.length} de {allPrecedents.length} precedentes
              </p>
            </div>

            {/* Búsqueda y Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por nombre o concepto legal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                  <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="w-full md:w-48">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos los tipos</option>
                  <option value="civil">Civil</option>
                  <option value="penal">Penal</option>
                  <option value="laboral">Laboral</option>
                  <option value="mercantil">Mercantil</option>
                  <option value="familiar">Familiar</option>
                  <option value="administrativo">Administrativo</option>
                </select>
              </div>

              <div className="w-full md:w-56">
                <select
                  value={filterCourt}
                  onChange={(e) => setFilterCourt(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">Todas las cortes</option>
                  <option value="Corte Suprema de Justicia">Corte Suprema</option>
                  <option value="Corte Constitucional">Corte Constitucional</option>
                  <option value="Tribunal Superior">Tribunal Superior</option>
                </select>
              </div>

              {(searchQuery || filterType !== 'all' || filterCourt !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          <PrecedentsTable 
            precedents={filteredPrecedents}
            onViewPrecedent={handleViewPrecedent}
          />
        </div>
      </main>
    </div>
  )
}

export default JurisprudenceLibrary


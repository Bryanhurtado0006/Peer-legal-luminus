import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import CasesTable from '../Tables/CasesTable'
import type { Case } from '../Tables/CasesTable'

const AllCases = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  // Estados para filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // TODO: Estos datos vendrán de la API cuando esté lista
  const [allCases] = useState<Case[]>([
    {
      id: 1,
      title: 'Demanda por incumplimiento contractual',
      caseType: 'civil',
      status: 'completed',
      createdAt: '2024-01-15',
      plaintiff: 'Juan Pérez',
      defendant: 'Empresa XYZ S.A.'
    },
    {
      id: 2,
      title: 'Proceso de divorcio contencioso',
      caseType: 'familiar',
      status: 'analyzing',
      createdAt: '2024-01-20',
      plaintiff: 'María González',
      defendant: 'Carlos Rodríguez'
    },
    {
      id: 3,
      title: 'Demanda laboral por despido injustificado',
      caseType: 'laboral',
      status: 'draft',
      createdAt: '2024-01-22',
      plaintiff: 'Ana Martínez',
      defendant: 'Corporación ABC'
    },
    {
      id: 4,
      title: 'Controversia mercantil por competencia desleal',
      caseType: 'mercantil',
      status: 'completed',
      createdAt: '2024-01-18',
      plaintiff: 'Tienda Digital SL',
      defendant: 'Comercio Online SA'
    },
    {
      id: 5,
      title: 'Recurso administrativo contra sanción',
      caseType: 'administrativo',
      status: 'analyzing',
      createdAt: '2024-01-25',
      plaintiff: 'Pedro Sánchez'
    }
  ])

  // Lógica de filtrado y búsqueda
  const filteredCases = allCases.filter(caseItem => {
    // Filtro por búsqueda (título)
    const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          caseItem.plaintiff?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          caseItem.defendant?.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filtro por tipo
    const matchesType = filterType === 'all' || caseItem.caseType === filterType
    
    // Filtro por estado
    const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchQuery('')
    setFilterType('all')
    setFilterStatus('all')
  }

  // Función para exportar casos a CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Título', 'Tipo', 'Estado', 'Demandante', 'Demandado', 'Fecha Creación']
    const csvData = filteredCases.map(c => [
      c.id,
      `"${c.title}"`,
      c.caseType,
      c.status,
      c.plaintiff || '-',
      c.defendant || '-',
      c.createdAt
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `casos_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // TODO: Implementar cuando la API esté lista
  const handleViewCase = (caseId: number) => {
    console.log('Ver caso:', caseId)
    // Dependiendo del estado del caso, redirigir a:
    const selectedCase = allCases.find(c => c.id === caseId)
    if (selectedCase?.status === 'completed') {
      navigate('/casos/analisis/resultado')
    } else if (selectedCase?.status === 'analyzing') {
      navigate('/casos/analisis/procesando')
    } else {
      // Si es borrador, ir a editar
      navigate('/casos/nuevo')
    }
  }

  // TODO: Implementar cuando la API esté lista
  const handleDeleteCase = (caseId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este caso?')
    if (confirmDelete) {
      console.log('Eliminar caso:', caseId)
      // Aquí se haría la llamada a la API para eliminar
      // api.delete(`/cases/${caseId}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    navigate('/login')
  }

  // TODO: Estos datos vendrán del contexto de autenticación o API
  const userData = {
    username: 'bryandreshurtado18',
    email: 'bryandreshurtado18@gmail.com'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.14l-6 3.75-6-3.75V7.93l6-3.75z"/>
                  <path d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">PEER-LEGAL</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Botón Volver al Dashboard */}
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </button>

              {/* Botón Nuevo Caso */}
              <button
                onClick={() => navigate('/casos/nuevo')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Caso
              </button>

              {/* Botón Tema */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
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

              {/* User Info */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{userData.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
                </div>

                {/* Botón Logout */}
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
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Todos los Casos</h2>
          <p className="text-gray-600 dark:text-gray-400">Gestiona y visualiza todos tus casos legales</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{allCases.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completados</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {allCases.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Analizando</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {allCases.filter(c => c.status === 'analyzing').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Borradores</p>
                <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                  {allCases.filter(c => c.status === 'draft').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Listado de Casos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Mostrando {filteredCases.length} de {allCases.length} {filteredCases.length === 1 ? 'caso' : 'casos'}
                </p>
              </div>
              
              {/* Botón Exportar */}
              <button
                onClick={exportToCSV}
                disabled={filteredCases.length === 0}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                title="Exportar casos filtrados a CSV"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar CSV
              </button>
            </div>

            {/* Indicador de filtros activos */}
            {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                      Filtros activos:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded text-xs font-medium">
                          Búsqueda: "{searchQuery}"
                        </span>
                      )}
                      {filterType !== 'all' && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded text-xs font-medium">
                          Tipo: {filterType}
                        </span>
                      )}
                      {filterStatus !== 'all' && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded text-xs font-medium">
                          Estado: {filterStatus}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium"
                  >
                    Limpiar todo
                  </button>
                </div>
              </div>
            )}

            {/* Filtros y Búsqueda */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Búsqueda */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por título, demandante o demandado..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                  <svg 
                    className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Filtro por Tipo */}
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

              {/* Filtro por Estado */}
              <div className="w-full md:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos los estados</option>
                  <option value="draft">Borrador</option>
                  <option value="analyzing">Analizando</option>
                  <option value="completed">Completado</option>
                </select>
              </div>

              {/* Botón Limpiar Filtros */}
              {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                  title="Limpiar filtros"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar
                </button>
              )}
            </div>
          </div>

          <CasesTable 
            cases={filteredCases} 
            onViewCase={handleViewCase}
            onDeleteCase={handleDeleteCase}
          />
        </div>
      </main>
    </div>
  )
}

export default AllCases


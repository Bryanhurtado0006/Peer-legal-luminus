import { useNavigate } from 'react-router-dom'

const AnalysisResult = () => {
  const navigate = useNavigate()

  // TODO: Estos datos vendrán del backend/API cuando esté listo
  const mockData = {
    caseTitle: "Demanda por incumplimiento contractual",
    caseType: "Civil",
    summary: {
      parties: "Demandante: Juan Pérez vs Demandado: Empresa XYZ S.A.",
      facts: [
        "Contrato de prestación de servicios firmado el 15/01/2024",
        "Incumplimiento del pago acordado por parte de Empresa XYZ",
        "Múltiples requerimientos previos sin respuesta"
      ],
      legalConcepts: ["Incumplimiento contractual", "Artículo 1602 Código Civil", "Mora del deudor"]
    },
    visualAnalysis: {
      filename: "contrato_firmado.pdf",
      observations: [
        "Documento contractual con firmas de ambas partes",
        "Cláusulas de pago claramente definidas en página 3",
        "Fecha de vencimiento: 30/03/2024"
      ],
      legalRelevance: "La evidencia visual confirma la existencia del vínculo contractual y las obligaciones pactadas"
    },
    precedents: [
      {
        id: 1,
        name: "Sentencia T-123/2023 - Corte Suprema de Justicia",
        similarity: 87,
        summary: "Incumplimiento de contrato de servicios profesionales",
        relevance: "Establece criterios para determinar la mora del deudor en contratos de servicios"
      },
      {
        id: 2,
        name: "Sentencia C-456/2022 - Corte Constitucional",
        similarity: 78,
        summary: "Interpretación de cláusulas contractuales",
        relevance: "Define alcance de las obligaciones contractuales y métodos de interpretación"
      },
      {
        id: 3,
        name: "Sentencia 789/2021 - Tribunal Superior",
        similarity: 72,
        relevance: "Precedente sobre cálculo de indemnizaciones por incumplimiento contractual"
      }
    ],
    strategies: [
      {
        id: 1,
        title: "Demanda de cumplimiento forzoso",
        strengths: [
          "Existe contrato válido con firmas de ambas partes",
          "Precedentes favorables en casos similares",
          "Evidencia documental clara del incumplimiento"
        ],
        weaknesses: [
          "Proceso puede extenderse en el tiempo",
          "Requiere prueba de los perjuicios ocasionados"
        ],
        recommendation: "Altamente recomendada"
      },
      {
        id: 2,
        title: "Negociación extrajudicial con indemnización",
        strengths: [
          "Resolución más rápida del conflicto",
          "Menores costos procesales",
          "Mantiene relación comercial"
        ],
        weaknesses: [
          "Podría resultar en compensación menor",
          "No sienta precedente formal"
        ],
        recommendation: "Opción viable"
      },
      {
        id: 3,
        title: "Resolución del contrato con daños y perjuicios",
        strengths: [
          "Jurisprudencia clara sobre indemnización por incumplimiento",
          "Permite recuperar inversión inicial más lucro cesante",
          "Evita prolongar relación contractual conflictiva"
        ],
        weaknesses: [
          "Requiere cuantificación precisa de daños",
          "Mayor carga probatoria sobre el demandante",
          "Posible apelación por parte del demandado"
        ],
        recommendation: "Opción viable"
      }
    ]
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

            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">Análisis completado</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{mockData.caseTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400">Tipo: {mockData.caseType} • Analizado con Gemini 1.5</p>
        </div>

        {/* 1. Resumen del Caso */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Resumen del Caso</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Partes Involucradas</h4>
              <p className="text-gray-700 dark:text-gray-300">{mockData.summary.parties}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hechos Relevantes</h4>
              <ul className="space-y-2">
                {mockData.summary.facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-700 dark:text-blue-400 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Conceptos Jurídicos Aplicables</h4>
              <div className="flex flex-wrap gap-2">
                {mockData.summary.legalConcepts.map((concept, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Análisis de Evidencia Visual */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🖼️ Análisis de Evidencia Visual</h3>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{mockData.visualAnalysis.filename}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analizado con Gemini 1.5 Vision</p>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Elementos Observados</h4>
            <ul className="space-y-2 mb-4">
              {mockData.visualAnalysis.observations.map((obs, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-700 dark:text-blue-400 mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{obs}</span>
                </li>
              ))}
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-900 dark:text-blue-200"><strong>Relevancia Legal:</strong> {mockData.visualAnalysis.legalRelevance}</p>
            </div>
          </div>
        </section>

        {/* 3. Precedentes Jurídicos */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⚖️ Precedentes Jurídicos Relevantes</h3>
          
          <div className="space-y-4">
            {mockData.precedents.map((precedent) => (
              <div key={precedent.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white flex-1">{precedent.name}</h4>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                    {precedent.similarity}% similar
                  </span>
                </div>
                {precedent.summary && (
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{precedent.summary}</p>
                )}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-3">
                  <p className="text-sm text-yellow-900 dark:text-yellow-200"><strong>Por qué es relevante:</strong> {precedent.relevance}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Estrategias Argumentales */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Estrategias Argumentales</h3>
          
          <div className="space-y-6">
            {mockData.strategies.map((strategy) => (
              <div key={strategy.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{strategy.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    strategy.recommendation === 'Altamente recomendada' 
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                      : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  }`}>
                    {strategy.recommendation}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Fortalezas
                    </h5>
                    <ul className="space-y-2">
                      {strategy.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400">+</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Debilidades
                    </h5>
                    <ul className="space-y-2">
                      {strategy.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400">-</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Volver al Dashboard
          </button>
          <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
            Exportar PDF
          </button>
        </div>
      </main>
    </div>
  )
}

export default AnalysisResult


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AnalysisProcessing = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { text: 'Analizando texto del caso...', duration: 2000 },
    { text: 'Procesando evidencia visual con Gemini 1.5...', duration: 3000 },
    { text: 'Buscando precedentes jurídicos...', duration: 2500 },
    { text: 'Generando estrategias argumentales...', duration: 2000 }
  ]

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, steps[currentStep].duration)
      return () => clearTimeout(timer)
    } else {
      // Análisis completado, redirigir al resultado
      setTimeout(() => {
        navigate('/casos/analisis/resultado')
      }, 1000)
    }
  }, [currentStep, navigate])

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-10 h-10 text-blue-700 dark:text-blue-300 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Analizando tu caso
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Gemini 1.5 está procesando la información
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-700 dark:bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">{Math.round(progress)}%</p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index < currentStep 
                    ? 'bg-green-50 text-green-700' 
                    : index === currentStep 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : index === currentStep ? (
                  <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisProcessing


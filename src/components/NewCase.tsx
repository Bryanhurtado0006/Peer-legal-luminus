import { useNavigate } from 'react-router-dom'
import { useNewCaseForm } from '../forms/NewCaseForm'

const NewCase = () => {
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    errors, 
    isSubmitting, 
    currentStep,
    nextStep,
    previousStep,
    onSubmit,
    onSaveDraft,
    uploadedFiles,
    handleFileUpload,
    removeFile,
    formatFileSize
  } = useNewCaseForm()

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
              title="Volver al dashboard"
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
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                currentStep === 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              } font-bold`}>
                1
              </div>
              <div className="ml-3">
                <p className={`font-semibold ${currentStep === 1 ? 'text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Información del Caso
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Detalles básicos</p>
              </div>
            </div>

            {/* Line */}
            <div className={`h-1 w-32 mx-4 ${currentStep === 2 ? 'bg-blue-700 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                currentStep === 2 ? 'bg-blue-700 text-white' : currentStep > 2 ? 'bg-blue-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              } font-bold`}>
                {currentStep > 2 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '2'
                )}
              </div>
              <div className="ml-3">
                <p className={`font-semibold ${currentStep === 2 ? 'text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Evidencia
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Documentos y archivos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          {currentStep === 1 && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Información del Caso</h2>
                <p className="text-gray-600 dark:text-gray-400">Proporciona los detalles completos de tu caso legal</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Título del Caso */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Título del Caso <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('title', {
                      required: 'El título del caso es requerido',
                      minLength: {
                        value: 10,
                        message: 'El título debe tener al menos 10 caracteres'
                      }
                    })}
                    type="text"
                    id="title"
                    placeholder="Ej: Demanda por incumplimiento contractual"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Tipo de Caso */}
                <div>
                  <label htmlFor="caseType" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Tipo de Caso <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('caseType', {
                      required: 'Debes seleccionar un tipo de caso'
                    })}
                    id="caseType"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.caseType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Selecciona el tipo de caso</option>
                    <option value="civil">Civil</option>
                    <option value="penal">Penal</option>
                    <option value="laboral">Laboral</option>
                    <option value="mercantil">Mercantil</option>
                    <option value="familiar">Familiar</option>
                    <option value="administrativo">Administrativo</option>
                  </select>
                  {errors.caseType && (
                    <p className="mt-1 text-sm text-red-600">{errors.caseType.message}</p>
                  )}
                </div>

                {/* Demandante y Demandado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="plaintiff" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Demandante
                    </label>
                    <input
                      {...register('plaintiff')}
                      type="text"
                      id="plaintiff"
                      placeholder="Nombre del demandante"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="defendant" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Demandado
                    </label>
                    <input
                      {...register('defendant')}
                      type="text"
                      id="defendant"
                      placeholder="Nombre del demandado"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Fecha del Incidente */}
                <div>
                  <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Fecha del Incidente
                  </label>
                  <input
                    {...register('incidentDate')}
                    type="date"
                    id="incidentDate"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Descripción del Caso */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Descripción del Caso <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('description', {
                      required: 'La descripción del caso es requerida',
                      minLength: {
                        value: 50,
                        message: 'La descripción debe tener al menos 50 caracteres'
                      }
                    })}
                    id="description"
                    rows={6}
                    placeholder="Describe los hechos relevantes, las partes involucradas, y los puntos legales clave..."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                {/* Hechos Relevantes */}
                <div>
                  <label htmlFor="relevantFacts" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Hechos Relevantes
                  </label>
                  <textarea
                    {...register('relevantFacts')}
                    id="relevantFacts"
                    rows={6}
                    placeholder="Lista los hechos más importantes del caso en orden cronológico..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit(onSaveDraft)}
                    disabled={isSubmitting}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Guardar como Borrador
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit((data) => {
                      console.log('Paso 1 completado:', data)
                      nextStep()
                    })}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    Continuar
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Evidencia</h2>
                <p className="text-gray-600 dark:text-gray-400">Sube imágenes, videos, PDFs y documentos relevantes (opcional)</p>
              </div>

              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700/50"
                onClick={() => document.getElementById('file-upload')?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleFileUpload(e.dataTransfer.files)
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Soporta imágenes, videos, PDFs y documentos</p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      document.getElementById('file-upload')?.click()
                    }}
                  >
                    Seleccionar Archivos
                  </button>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Archivos Subidos ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center pt-8">
                <button
                  type="button"
                  onClick={previousStep}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Atrás
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit(onSaveDraft)}
                    disabled={isSubmitting}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    Guardar como Borrador
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar y Analizar'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default NewCase


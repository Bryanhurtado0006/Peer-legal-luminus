import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'

export interface NewCaseFormData {
  title: string
  caseType: string
  plaintiff: string
  defendant: string
  incidentDate: string
  description: string
  relevantFacts: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  file: File
}

export const useNewCaseForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewCaseFormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: NewCaseFormData) => {
    try {
      console.log('📋 Datos del caso:', data)
      console.log('📎 Archivos subidos:', uploadedFiles.length)
      uploadedFiles.forEach(file => {
        console.log(`  - ${file.name} (${file.size} bytes)`)
      })
      
      // TODO: Cuando el backend esté listo, usar FormData para enviar archivos:
      /*
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('caseType', data.caseType)
      formData.append('plaintiff', data.plaintiff)
      formData.append('defendant', data.defendant)
      formData.append('incidentDate', data.incidentDate)
      formData.append('description', data.description)
      formData.append('relevantFacts', data.relevantFacts)
      
      // Agregar archivos
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append(`files[${index}]`, uploadedFile.file)
      })
      
      const response = await api.post('/cases', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      */
      
      // Por ahora, redirigir directamente a la vista de procesamiento
      navigate('/casos/analisis/procesando')
    } catch (error: any) {
      console.error('Error al crear el caso:', error)
    }
  }

  const onSaveDraft = async (data: NewCaseFormData) => {
    try {
      console.log('💾 Guardando borrador:', data)
      console.log('📎 Archivos adjuntos:', uploadedFiles.length)
      
      // TODO: Cuando el backend esté listo:
      /*
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('caseType', data.caseType)
      formData.append('plaintiff', data.plaintiff)
      formData.append('defendant', data.defendant)
      formData.append('incidentDate', data.incidentDate)
      formData.append('description', data.description)
      formData.append('relevantFacts', data.relevantFacts)
      formData.append('status', 'draft')
      
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append(`files[${index}]`, uploadedFile.file)
      })
      
      const response = await api.post('/cases/draft', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      */
      
      // Mostrar mensaje de éxito y redirigir
      alert('Borrador guardado exitosamente')
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Error al guardar borrador:', error)
    }
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      file
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return {
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
  }
}


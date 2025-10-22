import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'

export interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export const useRegisterForm = () => {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    mode: 'onBlur'
  })

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Reemplazar '/register' con el endpoint real cuando esté disponible
      const response = await api.post('/register', {
        name: data.fullName,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword
      })

      // Guardar el token en localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }

      // Redirigir al dashboard
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Error al registrar:', error)
      
      // Manejar errores de validación del backend
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors
        Object.keys(backendErrors).forEach((key) => {
          setError(key as keyof RegisterFormData, {
            type: 'server',
            message: backendErrors[key][0]
          })
        })
      } else {
        setError('email', {
          type: 'server',
          message: error.response?.data?.message || 'Error al crear la cuenta'
        })
      }
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    password
  }
}


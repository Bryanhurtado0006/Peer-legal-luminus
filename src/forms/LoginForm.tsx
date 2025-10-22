import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'

export interface LoginFormData {
  email: string
  password: string
}

export const useLoginForm = () => {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Reemplazar '/login' con el endpoint real cuando esté disponible
      const response = await api.post('/login', {
        email: data.email,
        password: data.password
      })

      // Guardar el token en localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }

      // Redirigir al dashboard
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error)
      
      // Mostrar mensaje de error
      setError('email', {
        type: 'server',
        message: error.response?.data?.message || 'Credenciales incorrectas'
      })
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting
  }
}


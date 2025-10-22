import { useNavigate } from 'react-router-dom'
import { useRegisterForm } from '../forms/RegisterForm'

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, errors, isSubmitting, password } = useRegisterForm()
  const isAuthenticated = localStorage.getItem('auth_token')

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left Side - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-12 items-center justify-center">
        <div className="max-w-lg">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 mb-8 hover:opacity-80 transition-opacity"
            title="Volver al inicio"
          >
            <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.14l-6 3.75-6-3.75V7.93l6-3.75z"/>
                <path d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 dark:text-white">PEER-LEGAL</h1>
          </button>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Transforma tu práctica legal con IA
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Únete a cientos de estudiantes y abogados que ya están mejorando su análisis legal.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Análisis de casos en minutos, no horas</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-200 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Precedentes relevantes automáticamente</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-200 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Estrategias argumentativas personalizadas</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-200 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Análisis de evidencia visual con IA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Logo móvil + enlace al inicio */}
          <div className="lg:hidden text-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center space-x-2 mb-2 hover:opacity-80 transition-opacity"
              title="Volver al inicio"
            >
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.14l-6 3.75-6-3.75V7.93l6-3.75z"/>
                  <path d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PEER-LEGAL</h1>
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <button
                onClick={() => navigate('/')}
                className="text-blue-700 dark:text-blue-400 hover:underline"
              >
                ← Volver al inicio
              </button>
            </p>
          </div>

          {/* Atajo al Dashboard si está autenticado */}
          {isAuthenticated && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">Ya tienes una sesión activa</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Ir al Dashboard
              </button>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Crear Cuenta</h2>
            <p className="text-gray-600 dark:text-gray-400">Regístrate gratis y comienza a analizar casos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre Completo */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Nombre Completo
              </label>
              <input
                {...register('fullName', {
                  required: 'El nombre completo es requerido',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  }
                })}
                type="text"
                id="fullName"
                placeholder="Juan Pérez"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            {/* Tipo de Usuario */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Tipo de Usuario
              </label>
              <select
                {...register('role', {
                  required: 'Debes seleccionar un tipo de usuario'
                })}
                id="role"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Selecciona tu rol</option>
                <option value="student">Estudiante (10 casos/día)</option>
                <option value="professional">Profesional (50 casos/día)</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>
              )}
            </div>

            {/* Correo Electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Correo Electrónico
              </label>
              <input
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                type="email"
                id="email"
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Contraseña
              </label>
              <input
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                  }
                })}
                type="password"
                id="password"
                placeholder="Mínimo 8 caracteres"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Confirmar Contraseña
              </label>
              <input
                {...register('confirmPassword', {
                  required: 'Debes confirmar tu contraseña',
                  validate: value => value === password || 'Las contraseñas no coinciden'
                })}
                type="password"
                id="confirmPassword"
                placeholder="Repite tu contraseña"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
            </button>
          </form>

          {/* Botón de atajo al Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Ir al Dashboard
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

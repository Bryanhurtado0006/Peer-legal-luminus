import { useNavigate } from 'react-router-dom'
import { useLoginForm } from '../forms/LoginForm'

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, errors, isSubmitting } = useLoginForm()
  const isAuthenticated = localStorage.getItem('auth_token')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center space-x-3 mb-4 hover:opacity-80 transition-opacity"
            title="Volver al inicio"
          >
            <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l6 3.75v7.14l-6 3.75-6-3.75V7.93l6-3.75z"/>
                <path d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PEER-LEGAL</h1>
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

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bienvenido de nuevo</h2>
            <p className="text-gray-600 dark:text-gray-400">Ingresa a tu cuenta para continuar</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Iniciar Sesión</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Accede a tu panel de análisis legal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Correo Electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
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
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input
                {...register('password', {
                  required: 'La contraseña es requerida'
                })}
                type="password"
                id="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              Regístrate gratis
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login


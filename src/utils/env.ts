export const ENV = {
  API_URL: import.meta.env.VITE_API_URL,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
}

export function validateEnv() {
  if (!ENV.API_URL) {
    console.warn('⚠️ VITE_API_URL no configurada. Revisa .env')
  }
  return true
}

export function logEnvironmentInfo() {
  if (import.meta.env.DEV) {
    console.log('🚀 PEER-LEGAL | API:', ENV.API_URL || 'No configurada')
  }
}

export default ENV


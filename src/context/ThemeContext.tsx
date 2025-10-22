import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar localStorage al iniciar
    const savedTheme = localStorage.getItem('theme') as Theme
    console.log('🔍 Tema guardado en localStorage:', savedTheme)
    return savedTheme || 'light'
  })

  // Efecto para aplicar el tema inicial inmediatamente
  useEffect(() => {
    const root = document.documentElement
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  // Efecto para cambios de tema
  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      console.log('✅ Modo oscuro activado')
    } else {
      root.classList.remove('dark')
      console.log('☀️ Modo claro activado')
    }
    
    console.log('📋 Clases actuales en <html>:', root.className || '(vacío)')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log(`🔄 Cambiando tema de "${prev}" a "${newTheme}"`)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}


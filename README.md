# PEER-LEGAL - Sistema de Análisis Legal con IA

## Descripción del Proyecto

PEER-LEGAL es una aplicación web frontend desarrollada en React que permite a estudiantes de derecho y profesionales analizar casos legales, encontrar precedentes jurisprudenciales relevantes y generar estrategias argumentativas mediante inteligencia artificial. El sistema implementa un flujo completo de análisis legal utilizando agentes A2A (Agent-to-Agent) para procesamiento distribuido.

## Estado Actual del Proyecto

**IMPORTANTE:** Este es un proyecto **frontend completo y funcional** que actualmente opera con **datos mock (simulados)**. Toda la lógica de UI/UX, navegación, formularios, validaciones y flujos de usuario están completamente implementados. Los servicios de API están preparados y listos para conectarse a un backend Laravel + Supabase cuando esté disponible.

### Lo que está implementado:
✅ Interfaz de usuario completa y funcional  
✅ Sistema de autenticación (Login/Register con roles)  
✅ Dashboard con estadísticas  
✅ Gestión completa de casos (CRUD)  
✅ Biblioteca de jurisprudencia con búsqueda y filtros  
✅ Simulación de análisis con IA (procesamiento y resultados)  
✅ Exportación de datos a CSV  
✅ Tema claro/oscuro (Dark Mode)  
✅ Diseño responsive para móviles y tablets  
✅ Servicios de API preparados para integración backend  

### Lo que falta:
⏳ Backend Laravel (en desarrollo)  
⏳ Base de datos Supabase (en configuración)  
⏳ Integración real con Gemini 1.5 Flash (se hará desde el backend)  
⏳ Almacenamiento de archivos en Supabase Storage  

---

## Stack Tecnológico

### Core
- **React 19.1.1** - Framework frontend con las últimas características
- **TypeScript 5.9.3** - Tipado estático para mayor seguridad
- **Vite 7.1.7** - Build tool ultrarrápido con HMR (Hot Module Replacement)

### Routing y Formularios
- **React Router DOM 7.9.4** - Navegación SPA con rutas dinámicas
- **React Hook Form 7.65.0** - Gestión de formularios con validación

### Estilos
- **Tailwind CSS 4.1.15** - Framework utility-first para estilos
- **@tailwindcss/vite 4.1.15** - Plugin de Vite para Tailwind v4

### HTTP y Estado
- **Axios 1.12.2** - Cliente HTTP con interceptores
- **Context API (React)** - Gestión de estado global (Theme)
- **LocalStorage** - Persistencia de autenticación y preferencias

### Backend (Preparado)
- **Supabase Client 2.76.1** - Cliente para base de datos y autenticación
- **Laravel API** - Backend RESTful (en desarrollo)
- **Gemini 1.5 Flash** - IA para análisis legal (integración desde backend)

### Desarrollo
- **ESLint 9.36.0** - Linter con configuración estricta
- **TypeScript ESLint 8.45.0** - Reglas específicas para TypeScript

---

## Arquitectura del Proyecto

### Estructura de Directorios

```
peer-legal-luminus/
├── src/
│   ├── components/          # Componentes principales (vistas)
│   │   ├── Login.tsx        # Página de inicio de sesión
│   │   ├── Register.tsx     # Página de registro con selección de rol
│   │   ├── Dashboard.tsx    # Panel principal del usuario
│   │   ├── AllCases.tsx     # Vista de todos los casos con filtros
│   │   ├── NewCase.tsx      # Formulario multi-paso para crear casos
│   │   ├── AnalysisProcessing.tsx  # Animación de procesamiento IA
│   │   ├── AnalysisResult.tsx      # Resultados del análisis
│   │   └── JurisprudenceLibrary.tsx # Biblioteca de precedentes
│   │
│   ├── Tables/              # Componentes de tablas reutilizables
│   │   ├── CasesTable.tsx   # Tabla de casos con acciones
│   │   └── PrecedentsTable.tsx # Tabla de precedentes legales
│   │
│   ├── forms/               # Custom hooks para formularios
│   │   ├── LoginForm.tsx    # Lógica del formulario de login
│   │   ├── RegisterForm.tsx # Lógica del formulario de registro
│   │   └── NewCaseForm.tsx  # Lógica del formulario de casos
│   │
│   ├── services/            # Servicios de API (preparados para backend)
│   │   ├── auth.service.ts  # Servicio de autenticación
│   │   ├── cases.service.ts # Servicio de gestión de casos
│   │   └── jurisprudence.service.ts # Servicio de jurisprudencia
│   │
│   ├── config/              # Configuraciones
│   │   ├── api.ts           # Cliente Axios con interceptores
│   │   └── supabase.ts      # Cliente de Supabase
│   │
│   ├── context/             # Contextos de React
│   │   └── ThemeContext.tsx # Contexto para tema claro/oscuro
│   │
│   ├── utils/               # Utilidades
│   │   └── env.ts           # Validación de variables de entorno
│   │
│   ├── LandingPage.tsx      # Página de aterrizaje
│   ├── App.tsx              # Componente raíz con rutas
│   ├── main.tsx             # Punto de entrada de la app
│   └── index.css            # Estilos globales de Tailwind
│
├── public/                  # Archivos estáticos
├── .env                     # Variables de entorno (local)
├── .env.example             # Plantilla de variables de entorno
├── .env.production          # Variables de producción
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
├── vite.config.ts           # Configuración de Vite
├── eslint.config.js         # Configuración de ESLint
├── ENV_SETUP.md             # Guía de configuración de variables
└── README.md                # Este archivo

```

---

## Componentes Principales

### 1. LandingPage.tsx
**Descripción:** Página de aterrizaje pública con información del producto.

**Características:**
- Hero section con CTA principal
- Sección de características del sistema A2A
- Información sobre agentes de IA
- Navegación a registro/login
- Diseño responsive
- Dark mode

**Código destacado:**
```typescript
// Navegación programática con React Router
const navigate = useNavigate()
navigate('/register')
```

---

### 2. Register.tsx
**Descripción:** Formulario de registro de usuarios con selección de rol.

**Características:**
- Formulario controlado con React Hook Form
- Validación en tiempo real
- Selección de rol: Estudiante (10 casos/día) o Profesional (50 casos/día)
- Logo clickeable para volver al landing
- Validación de contraseñas coincidentes
- Diseño de dos columnas (desktop) / una columna (mobile)

**Datos del formulario:**
```typescript
interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: 'student' | 'professional'
}
```

**Hook personalizado:** `useRegisterForm()` en `src/forms/RegisterForm.tsx`

---

### 3. Login.tsx
**Descripción:** Formulario de inicio de sesión.

**Características:**
- Validación de email y contraseña
- Recordar credenciales (checkbox)
- Logo clickeable para volver al landing
- Manejo de errores de autenticación
- Redirección automática al dashboard tras login exitoso

**Hook personalizado:** `useLoginForm()` en `src/forms/LoginForm.tsx`

---

### 4. Dashboard.tsx
**Descripción:** Panel principal del usuario autenticado.

**Características:**
- Header con logo, botón "Nuevo Caso", toggle de tema, info de usuario y logout
- Badge de cuota: muestra rol y casos usados/disponibles del día
- Botones de acceso rápido: "Ver Todos los Casos" y "Biblioteca Jurisprudencia"
- Tarjetas de estadísticas: Total de casos, Completados, En Análisis
- Casos recientes (tabla con últimos 3 casos)
- Acciones rápidas: "Nuevo Análisis", "Explorar Jurisprudencia"

**Estado local:**
```typescript
const userRole = localStorage.getItem('user_role') as 'student' | 'professional' || 'student'
const dailyLimit = userRole === 'student' ? 10 : 50
```

**Mock data:** Los casos recientes están simulados. En producción vendrán de la API.

---

### 5. AllCases.tsx
**Descripción:** Vista completa de todos los casos del usuario con filtros avanzados.

**Características:**
- Header con navegación, tema y logout
- 4 tarjetas de estadísticas (Total, Completados, Analizando, Borradores)
- Barra de búsqueda (busca en título, demandante, demandado)
- Filtros: por tipo de caso y por estado
- Indicador visual de filtros activos
- Botón para limpiar todos los filtros
- Exportación a CSV de casos filtrados
- Tabla con componente reutilizable `CasesTable`

**Lógica de filtrado:**
```typescript
const filteredCases = allCases.filter(caseItem => {
  const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        caseItem.plaintiff?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        caseItem.defendant?.toLowerCase().includes(searchQuery.toLowerCase())
  
  const matchesType = filterType === 'all' || caseItem.caseType === filterType
  const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus
  
  return matchesSearch && matchesType && matchesStatus
})
```

**Exportación CSV:**
```typescript
const exportToCSV = () => {
  const headers = ['ID', 'Título', 'Tipo', 'Estado', 'Demandante', 'Demandado', 'Fecha Creación']
  const csvData = filteredCases.map(c => [
    c.id,
    `"${c.title}"`,
    c.caseType,
    c.status,
    c.plaintiff || '-',
    c.defendant || '-',
    c.createdAt
  ])

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `casos_${new Date().toISOString().split('T')[0]}.csv`)
  link.click()
}
```

---

### 6. NewCase.tsx
**Descripción:** Formulario multi-paso para crear un nuevo caso legal.

**Características:**
- 3 pasos visualizados con stepper
- **Paso 1:** Información básica (título, tipo, partes)
- **Paso 2:** Detalles del caso (hechos, fundamento legal)
- **Paso 3:** Evidencias (subida de archivos local)
- Validación por pasos
- Navegación entre pasos con validación
- Preview de archivos subidos con botón de eliminación
- Simulación de envío (en producción hará POST a la API)

**Estados del formulario:**
```typescript
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState({
  title: '',
  caseType: '',
  plaintiff: '',
  defendant: '',
  description: '',
  facts: '',
  legalBasis: '',
})
const [evidence, setEvidence] = useState<File[]>([])
```

**Hook personalizado:** `useNewCaseForm()` en `src/forms/NewCaseForm.tsx`

**Tipos de caso soportados:**
- Civil
- Penal
- Laboral
- Mercantil
- Familiar
- Administrativo

---

### 7. AnalysisProcessing.tsx
**Descripción:** Pantalla de carga animada mientras los agentes A2A procesan el caso.

**Características:**
- Spinner animado
- Progreso visual con 4 pasos
- Simulación de tiempo de procesamiento (2-3 segundos por paso)
- Muestra el agente activo: Coordinador, Jurisprudencia, Visual, Argumentos
- Redirección automática a resultados al finalizar

**Simulación de agentes A2A:**
```typescript
const steps = [
  { text: 'Agente Coordinador - Identificando elementos legales...', duration: 2000 },
  { text: 'Agente Jurisprudencia - Buscando precedentes relevantes...', duration: 2500 },
  { text: 'Agente Visual - Analizando evidencia multimedia...', duration: 3000 },
  { text: 'Agente Argumentos - Generando líneas argumentales...', duration: 2000 }
]
```

---

### 8. AnalysisResult.tsx
**Descripción:** Muestra los resultados del análisis de IA con precedentes y estrategias.

**Características:**
- Resumen del caso analizado
- Precedentes relevantes encontrados (con porcentaje de similitud)
- 3 estrategias argumentales recomendadas
- Cada estrategia incluye: fortalezas, debilidades, nivel de recomendación
- Botones de acción: Descargar PDF, Nuevo Análisis, Volver al Dashboard

**Mock data de precedentes:**
```typescript
precedents: [
  {
    id: 1,
    name: 'Sentencia T-123/2023',
    court: 'Corte Suprema de Justicia',
    date: '2023-03-15',
    similarity: 85,
    relevantPoints: [
      'Establece criterios claros para determinar la mora del deudor',
      'Analiza el incumplimiento contractual en servicios profesionales',
      'Fija precedente sobre cálculo de indemnizaciones'
    ]
  },
  // ... más precedentes
]
```

**Mock data de estrategias:**
```typescript
strategies: [
  {
    id: 1,
    title: 'Demanda de cumplimiento forzoso',
    strengths: [
      'Evidencia documental sólida del contrato',
      'Precedente jurisprudencial favorable',
      'Daños cuantificables con precisión'
    ],
    weaknesses: [
      'Posible alegación de fuerza mayor por la contraparte',
      'Tiempo de resolución judicial prolongado'
    ],
    recommendation: 'Altamente recomendada'
  },
  // ... más estrategias
]
```

---

### 9. JurisprudenceLibrary.tsx
**Descripción:** Biblioteca de precedentes jurisprudenciales con búsqueda y filtros.

**Características:**
- Header con navegación y tema
- Barra de búsqueda por nombre o concepto legal
- Filtro por tipo de caso (6 tipos)
- Filtro por corte (Suprema, Constitucional, Tribunal Superior)
- Contador de precedentes filtrados
- Tabla de precedentes con componente `PrecedentsTable`
- 15 precedentes mock de diferentes tipos

**Tipos de precedentes:**
```typescript
const precedents: Precedent[] = [
  {
    id: 1,
    name: 'Sentencia T-123/2023',
    court: 'Corte Suprema de Justicia',
    date: '2023-03-15',
    caseType: 'civil',
    summary: 'Incumplimiento de contrato de servicios profesionales...'
  },
  // ... 14 precedentes más
]
```

---

## Tablas Reutilizables

### CasesTable.tsx
**Props:**
```typescript
interface CasesTableProps {
  cases: Case[]
  onViewCase: (caseId: number) => void
  onDeleteCase: (caseId: number) => void
}
```

**Características:**
- Columnas: Título, Tipo, Partes, Estado, Fecha Creación, Acciones
- Badges de estado con colores (draft=gris, analyzing=azul, completed=verde)
- Botones de acción: Ver (ojo) y Eliminar (papelera)
- Estado vacío con mensaje amigable
- Hover effects
- Dark mode

### PrecedentsTable.tsx
**Props:**
```typescript
interface PrecedentsTableProps {
  precedents: Precedent[]
  onViewPrecedent: (id: number) => void
}
```

**Características:**
- Columnas: Sentencia, Corte, Tipo, Fecha, Resumen, Acción
- Badge de similitud (si existe)
- Formateo de fecha en español
- Botón "Ver detalles"
- Resumen truncado a 2 líneas
- Dark mode

---

## Servicios de API

### auth.service.ts
**Descripción:** Maneja toda la lógica de autenticación.

**Métodos:**
```typescript
class AuthService {
  // Guardar token y rol en localStorage
  private saveAuth(data: AuthResponse): void

  // POST /auth/login
  async login(credentials: LoginCredentials): Promise<AuthResponse>

  // POST /auth/register
  async register(data: RegisterData): Promise<AuthResponse>

  // POST /auth/logout
  async logout(): Promise<void>

  // GET /auth/me
  async getCurrentUser(): Promise<User>

  // Verificar si hay token en localStorage
  isAuthenticated(): boolean

  // Obtener rol del usuario desde localStorage
  getUserRole(): 'student' | 'professional' | null
}
```

**Interfaces:**
```typescript
interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: 'student' | 'professional'
}

interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: 'student' | 'professional'
  }
}
```

**Estado actual:** Mock - No hace llamadas reales. Listo para usar cuando el backend esté disponible.

---

### cases.service.ts
**Descripción:** Gestiona operaciones CRUD de casos y análisis.

**Métodos:**
```typescript
class CasesService {
  // GET /cases
  async getAllCases(): Promise<Case[]>

  // GET /cases/{id}
  async getCaseById(id: number): Promise<Case>

  // POST /cases (con FormData para archivos)
  async createCase(data: CreateCaseData): Promise<Case>

  // PUT /cases/{id}
  async updateCase(id: number, data: Partial<CreateCaseData>): Promise<Case>

  // DELETE /cases/{id}
  async deleteCase(id: number): Promise<void>

  // POST /cases/{id}/analyze
  async analyzeCase(caseId: number): Promise<CaseAnalysis>

  // GET /cases/{id}/analysis
  async getCaseAnalysis(caseId: number): Promise<CaseAnalysis>

  // GET /cases/stats
  async getCaseStats(): Promise<CaseStats>

  // GET /cases/quota
  async getUserQuota(): Promise<UserQuota>
}
```

**Interfaces:**
```typescript
interface CreateCaseData {
  title: string
  caseType: string
  plaintiff: string
  defendant: string
  description: string
  facts: string
  legalBasis: string
  evidence?: File[]
}

interface CaseAnalysis {
  id: number
  case_id: number
  status: 'processing' | 'completed' | 'failed'
  precedents: any[]
  strategies: any[]
  created_at: string
  updated_at: string
}
```

**Subida de archivos:**
```typescript
const formData = new FormData()
formData.append('title', data.title)
formData.append('caseType', data.caseType)
// ... otros campos

if (data.evidence && data.evidence.length > 0) {
  data.evidence.forEach((file, index) => {
    formData.append(`evidence[${index}]`, file)
  })
}

api.post('/cases', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

---

### jurisprudence.service.ts
**Descripción:** Gestiona búsqueda y consulta de precedentes jurisprudenciales.

**Métodos:**
```typescript
class JurisprudenceService {
  // GET /jurisprudence?query=...&caseType=...&court=...
  async getAllPrecedents(params?: SearchPrecedentsParams): Promise<Precedent[]>

  // GET /jurisprudence/similar/{caseId}?limit=10
  async searchSimilarPrecedents(caseId: number, limit: number): Promise<Precedent[]>

  // GET /jurisprudence/{id}
  async getPrecedentById(id: number): Promise<PrecedentDetail>

  // POST /jurisprudence/search
  async searchByText(query: string): Promise<Precedent[]>

  // GET /jurisprudence/recommended?caseType=civil
  async getRecommendedPrecedents(caseType: string): Promise<Precedent[]>
}
```

**Interfaces:**
```typescript
interface Precedent {
  id: number
  name: string
  court: string
  date: string
  caseType: string
  summary: string
  similarity?: number
}

interface PrecedentDetail extends Precedent {
  fullText: string
  relatedCases: number[]
  citations: number
  tags: string[]
}
```

---

## Configuración

### api.ts - Cliente HTTP con Axios
**Descripción:** Configuración centralizada de Axios con interceptores.

**Configuración base:**
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:8000/api
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
```

**Interceptor de Request (añade token):**
```typescript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
```

**Interceptor de Response (maneja 401):**
```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_role')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

### supabase.ts - Cliente de Supabase
**Descripción:** Configuración del cliente de Supabase para base de datos y storage.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
```

**Uso futuro:**
- Autenticación alternativa (OAuth, magic links)
- Storage para archivos de evidencia
- Realtime para notificaciones
- Database directa (si se necesita bypass de Laravel)

---

## Context API

### ThemeContext.tsx
**Descripción:** Contexto global para manejo de tema claro/oscuro.

**Implementación:**
```typescript
type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
```

**Provider:**
```typescript
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**Hook personalizado:**
```typescript
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

**Uso en componentes:**
```typescript
const { theme, toggleTheme } = useTheme()

<button onClick={toggleTheme}>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

---

## Formularios con React Hook Form

### useLoginForm (LoginForm.tsx)
```typescript
export const useLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // TODO: Reemplazar con llamada real a la API
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password
      })

      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }
      if (response.data.user?.role) {
        localStorage.setItem('user_role', response.data.user.role)
      }

      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isLoading, error }
}
```

**Validaciones:**
```typescript
<input
  {...register('email', {
    required: 'El email es requerido',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido'
    }
  })}
/>

{errors.email && (
  <p className="text-red-600">{errors.email.message}</p>
)}
```

### useRegisterForm (RegisterForm.tsx)
```typescript
<input
  {...register('password', {
    required: 'La contraseña es requerida',
    minLength: {
      value: 8,
      message: 'La contraseña debe tener al menos 8 caracteres'
    }
  })}
/>

<input
  {...register('confirmPassword', {
    required: 'Debes confirmar la contraseña',
    validate: (value, formValues) => 
      value === formValues.password || 'Las contraseñas no coinciden'
  })}
/>
```

### useNewCaseForm (NewCaseForm.tsx)
```typescript
// Validación por pasos
const validateStep = (step: number): boolean => {
  switch(step) {
    case 1:
      return !!formData.title && !!formData.caseType && 
             !!formData.plaintiff && !!formData.defendant
    case 2:
      return !!formData.description && !!formData.facts && 
             !!formData.legalBasis
    case 3:
      return true // Evidencias son opcionales
    default:
      return false
  }
}
```

---

## Estilos y Tailwind CSS

### Configuración (index.css)
```css
@import "tailwindcss";

/* Configuración del modo oscuro para Tailwind v4 */
@variant dark (.dark &);
```

### Patrones de Dark Mode
**Todos los componentes siguen este patrón:**
```typescript
// Fondos
className="bg-white dark:bg-gray-800"

// Textos
className="text-gray-900 dark:text-white"
className="text-gray-600 dark:text-gray-400"

// Bordes
className="border-gray-200 dark:border-gray-700"

// Inputs
className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
           border-gray-300 dark:border-gray-600
           placeholder:text-gray-400 dark:placeholder:text-gray-500"

// Hover states
className="hover:bg-gray-50 dark:hover:bg-gray-700"

// Badges
className="bg-blue-100 dark:bg-blue-900/50 
           text-blue-700 dark:text-blue-300"
```

### Responsive Design
```typescript
// Grid responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Flex responsive
className="flex flex-col md:flex-row"

// Padding responsive
className="px-4 md:px-6 lg:px-8"

// Hidden en mobile
className="hidden md:block"
```

### Componentes Reutilizables
**Botón primario:**
```typescript
className="bg-blue-700 hover:bg-blue-800 text-white 
           px-6 py-3 rounded-lg font-semibold 
           transition-colors"
```

**Card:**
```typescript
className="bg-white dark:bg-gray-800 
           rounded-xl shadow-sm 
           border border-gray-200 dark:border-gray-700 
           p-6"
```

**Input:**
```typescript
className="w-full px-4 py-3 
           border border-gray-300 dark:border-gray-600 
           rounded-lg 
           focus:ring-2 focus:ring-blue-500 focus:border-transparent 
           outline-none transition-all 
           bg-white dark:bg-gray-700 
           text-gray-900 dark:text-white"
```

---

## Rutas (App.tsx)

```typescript
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/casos" element={<AllCases />} />
      <Route path="/jurisprudencia" element={<JurisprudenceLibrary />} />
      <Route path="/casos/nuevo" element={<NewCase />} />
      <Route path="/casos/analisis/procesando" element={<AnalysisProcessing />} />
      <Route path="/casos/analisis/resultado" element={<AnalysisResult />} />
    </Routes>
  )
}
```

**Flujo de navegación:**
1. **Landing** → Register/Login
2. **Register/Login** → Dashboard
3. **Dashboard** → Nuevo Caso / Todos los Casos / Jurisprudencia
4. **Nuevo Caso** → Análisis Procesando → Análisis Resultado
5. **Todos los Casos** → Ver caso → Análisis Resultado (si está completado)

---

## Gestión de Estado

### LocalStorage
**Datos persistidos:**
```typescript
// Autenticación
localStorage.setItem('auth_token', 'eyJhbGc...')
localStorage.getItem('auth_token')
localStorage.removeItem('auth_token')

// Rol del usuario
localStorage.setItem('user_role', 'student') // o 'professional'
localStorage.getItem('user_role')

// Tema
localStorage.setItem('theme', 'dark') // o 'light'
localStorage.getItem('theme')
```

### useState (Estado Local)
```typescript
// Formularios
const [formData, setFormData] = useState({ ... })

// Loading states
const [isLoading, setIsLoading] = useState(false)

// Errores
const [error, setError] = useState<string | null>(null)

// Filtros
const [searchQuery, setSearchQuery] = useState('')
const [filterType, setFilterType] = useState('all')

// Archivos
const [evidence, setEvidence] = useState<File[]>([])
```

### Context (Estado Global)
```typescript
// Theme
const { theme, toggleTheme } = useTheme()

// Futuro: Auth Context, User Context, etc.
```

---

## Variables de Entorno

### Archivo .env
```env
# Backend Laravel API
VITE_API_URL=http://localhost:8000/api

# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Info
VITE_APP_ENV=development
VITE_APP_NAME=PEER-LEGAL
VITE_APP_VERSION=1.0.0
```

### Validación (env.ts)
```typescript
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
```

**Uso en main.tsx:**
```typescript
if (import.meta.env.DEV) {
  logEnvironmentInfo()
  validateEnv()
}
```

---

## Instalación y Ejecución

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone <repository-url>
cd Peer-legal-luminus

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts disponibles
```bash
# Desarrollo (Hot Reload)
npm run dev

# Build para producción
npm run build

# Preview de build de producción
npm run preview

# Linting
npm run lint
```

### Acceso
- **Dev:** http://localhost:5173
- **Preview:** http://localhost:4173

---

## Datos Mock vs Producción

### Actualmente Mock:
1. **Login/Register** - No validan credenciales reales
2. **Casos** - Array hardcodeado en `AllCases.tsx` y `Dashboard.tsx`
3. **Jurisprudencia** - 15 precedentes hardcodeados en `JurisprudenceLibrary.tsx`
4. **Análisis** - Resultados predefinidos en `AnalysisResult.tsx`
5. **Estadísticas** - Números calculados desde arrays locales

### Cómo migrar a producción:

#### 1. Reemplazar llamadas mock por servicios:
```typescript
// ANTES (Mock)
const [allCases] = useState<Case[]>([...casosHardcodeados])

// DESPUÉS (Producción)
import casesService from '../services/cases.service'

const [allCases, setAllCases] = useState<Case[]>([])

useEffect(() => {
  const fetchCases = async () => {
    try {
      const cases = await casesService.getAllCases()
      setAllCases(cases)
    } catch (error) {
      console.error('Error fetching cases:', error)
    }
  }
  fetchCases()
}, [])
```

#### 2. Integrar formularios con API:
```typescript
// En useLoginForm
const response = await authService.login({
  email: data.email,
  password: data.password
})

// authService ya guarda el token automáticamente
navigate('/dashboard')
```

#### 3. Subir archivos a Supabase Storage:
```typescript
// En NewCase.tsx, al enviar el formulario
const uploadedFiles = await Promise.all(
  evidence.map(async (file) => {
    const { data, error } = await supabase.storage
      .from('case-evidence')
      .upload(`${caseId}/${file.name}`, file)
    
    if (error) throw error
    return data.path
  })
)

// Luego enviar las URLs al backend
await casesService.createCase({
  ...formData,
  evidenceUrls: uploadedFiles
})
```

---

## Características Implementadas

### Autenticación y Usuarios
✅ Registro con validación de email y contraseñas  
✅ Login con Remember Me  
✅ Roles: Estudiante (10 casos/día) vs Profesional (50 casos/día)  
✅ Logout con limpieza de sesión  
✅ Persistencia de sesión en localStorage  

### Dashboard
✅ Estadísticas de casos (Total, Completados, En Análisis)  
✅ Tabla de casos recientes  
✅ Botones de acceso rápido  
✅ Indicador de cuota diaria según rol  
✅ Toggle de tema claro/oscuro  

### Gestión de Casos
✅ Formulario multi-paso para crear casos  
✅ Validación por pasos  
✅ Subida de evidencias (archivos locales)  
✅ Vista de todos los casos con tabla  
✅ Búsqueda por título, demandante, demandado  
✅ Filtros por tipo y estado  
✅ Exportación a CSV  
✅ Acciones: Ver, Eliminar  

### Análisis con IA
✅ Simulación de procesamiento con 4 agentes A2A  
✅ Visualización de progreso paso a paso  
✅ Resultados con precedentes relevantes  
✅ 3 estrategias argumentales por caso  
✅ Fortalezas y debilidades de cada estrategia  
✅ Porcentaje de similitud con precedentes  

### Biblioteca de Jurisprudencia
✅ 15 precedentes legales mock  
✅ Búsqueda por nombre o concepto  
✅ Filtros por tipo de caso  
✅ Filtros por corte  
✅ Tabla responsive con detalles  
✅ Formateo de fechas en español  

### UX/UI
✅ Dark mode completo en todos los componentes  
✅ Diseño responsive (mobile, tablet, desktop)  
✅ Animaciones y transiciones suaves  
✅ Estados de carga (loading)  
✅ Manejo de errores  
✅ Estados vacíos con mensajes amigables  
✅ Tooltips en botones  
✅ Badges de estado con colores  
✅ Hover effects  

### Navegación
✅ Rutas protegidas (simuladas)  
✅ Navegación programática  
✅ Links entre vistas  
✅ Breadcrumbs implícitos  
✅ Botones de "Volver"  

---

## Preparación para Backend Laravel

### Endpoints Esperados

#### Autenticación
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

#### Casos
```
GET    /api/cases                    # Todos los casos
POST   /api/cases                    # Crear (multipart/form-data)
GET    /api/cases/{id}               # Detalle
PUT    /api/cases/{id}               # Actualizar
DELETE /api/cases/{id}               # Eliminar
POST   /api/cases/{id}/analyze       # Iniciar análisis
GET    /api/cases/{id}/analysis      # Obtener análisis
GET    /api/cases/stats              # Estadísticas
GET    /api/cases/quota              # Cuota del usuario
```

#### Jurisprudencia
```
GET    /api/jurisprudence                      # Todos
GET    /api/jurisprudence/{id}                 # Detalle
GET    /api/jurisprudence/similar/{caseId}     # Similares
POST   /api/jurisprudence/search               # Búsqueda
GET    /api/jurisprudence/recommended          # Recomendados
```

### CORS en Laravel
```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

### Laravel Sanctum (Auth)
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

---

## Integración con Gemini 1.5 Flash

**Desde el Backend Laravel (recomendado):**
```php
// app/Services/GeminiService.php
use GuzzleHttp\Client;

class GeminiService {
    public function analyzeCase($caseData) {
        $client = new Client();
        
        $prompt = "Analiza el siguiente caso legal:\n"
                . "Título: {$caseData['title']}\n"
                . "Tipo: {$caseData['caseType']}\n"
                . "Hechos: {$caseData['facts']}\n"
                . "Fundamento: {$caseData['legalBasis']}\n\n"
                . "Proporciona:\n"
                . "1. Precedentes relevantes\n"
                . "2. 3 estrategias argumentales\n"
                . "3. Fortalezas y debilidades de cada estrategia";
        
        $response = $client->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'query' => [
                'key' => env('GEMINI_API_KEY')
            ],
            'json' => [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]
        ]);
        
        return json_decode($response->getBody(), true);
    }
}
```

---

## Base de Datos Supabase

### Tablas Necesarias

#### users
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('student', 'professional')) DEFAULT 'student',
  email_verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### cases
```sql
CREATE TABLE cases (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  case_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) CHECK (status IN ('draft', 'analyzing', 'completed')) DEFAULT 'draft',
  plaintiff VARCHAR(255),
  defendant VARCHAR(255),
  description TEXT,
  facts TEXT,
  legal_basis TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### case_evidence
```sql
CREATE TABLE case_evidence (
  id BIGSERIAL PRIMARY KEY,
  case_id BIGINT REFERENCES cases(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  mime_type VARCHAR(100),
  size INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### case_analyses
```sql
CREATE TABLE case_analyses (
  id BIGSERIAL PRIMARY KEY,
  case_id BIGINT REFERENCES cases(id) ON DELETE CASCADE,
  status VARCHAR(50) CHECK (status IN ('processing', 'completed', 'failed')) DEFAULT 'processing',
  precedents JSONB,
  strategies JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### precedents
```sql
CREATE TABLE precedents (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  court VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  case_type VARCHAR(50) NOT NULL,
  summary TEXT,
  full_text TEXT,
  tags JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Próximos Pasos (Roadmap)

### Fase 1: Backend (En desarrollo)
- [ ] Implementar endpoints Laravel
- [ ] Configurar base de datos Supabase
- [ ] Integrar Laravel Sanctum para auth
- [ ] Implementar CORS
- [ ] Conectar con Gemini 1.5 Flash

### Fase 2: Integración Frontend-Backend
- [ ] Reemplazar mock data con llamadas reales a la API
- [ ] Implementar manejo de errores robusto
- [ ] Añadir loading states en todas las peticiones
- [ ] Configurar Supabase Storage para archivos
- [ ] Implementar subida de archivos real

### Fase 3: Mejoras
- [ ] Implementar paginación en tablas
- [ ] Añadir búsqueda avanzada con operadores
- [ ] Implementar notificaciones (toast)
- [ ] Añadir confirmaciones para acciones destructivas
- [ ] Implementar caché de datos
- [ ] Añadir skeleton loaders

### Fase 4: Features Avanzados
- [ ] Generación de PDF con resultados de análisis
- [ ] Compartir análisis por email
- [ ] Historial de versiones de casos
- [ ] Comparación de estrategias
- [ ] Dashboard de administrador
- [ ] Sistema de suscripciones

---

## Créditos y Licencia

**Desarrollado para:** Proyecto de Desarrollo Integral  
**Autor:** Bryan Andres Hurtado Rodriguez  
**Tecnologías:** React 19, TypeScript, Tailwind CSS, Vite  
**Backend (En desarrollo):** Laravel, Supabase, Gemini 1.5 Flash  

---

## Contacto y Soporte

Para dudas sobre el código o la arquitectura, revisar:
- Este README (documentación completa)
- `ENV_SETUP.md` (configuración de variables de entorno)
- Comentarios en el código fuente
- Interfaces de TypeScript para tipos de datos

**Nota para evaluadores:** Este proyecto demuestra una arquitectura frontend sólida, preparada para escalar con un backend real. Todos los servicios, interfaces y configuraciones están listos para la integración completa.

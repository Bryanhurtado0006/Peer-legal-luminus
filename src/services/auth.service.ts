import api from '../config/api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: 'student' | 'professional'
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: 'student' | 'professional'
  }
}

class AuthService {
  private saveAuth(data: AuthResponse) {
    if (data.token) localStorage.setItem('auth_token', data.token)
    if (data.user?.role) localStorage.setItem('user_role', data.user.role)
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    this.saveAuth(response.data)
    return response.data
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data)
    this.saveAuth(response.data)
    return response.data
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_role')
    }
  }

  async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  }

  getUserRole(): 'student' | 'professional' | null {
    return localStorage.getItem('user_role') as 'student' | 'professional' | null
  }
}

export default new AuthService()


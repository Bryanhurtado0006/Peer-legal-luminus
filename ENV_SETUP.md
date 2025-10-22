# Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# API Backend (Laravel)
VITE_API_URL=http://localhost:8000/api

# Supabase
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## Instrucciones:

1. **VITE_API_URL**: URL base de tu API de Laravel (por defecto: `http://localhost:8000/api`)
2. **VITE_SUPABASE_URL**: URL de tu proyecto en Supabase
3. **VITE_SUPABASE_ANON_KEY**: Clave anónima de tu proyecto en Supabase

## Endpoints Pendientes:

### Autenticación

- **POST** `/register` - Registro de usuarios
  - Body: `{ name, email, password, password_confirmation }`
  - Response: `{ token, user }`

- **POST** `/login` - Inicio de sesión
  - Body: `{ email, password }`
  - Response: `{ token, user }`

Cuando los endpoints estén disponibles, simplemente asegúrate de que coincidan con estos formatos o actualiza los archivos en `src/forms/`.


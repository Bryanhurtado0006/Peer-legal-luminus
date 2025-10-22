# Configuración de Variables de Entorno

## Instalación Rápida

```bash
# 1. Copiar archivo de ejemplo
cp .env.example .env

# 2. Editar .env con tus credenciales
# 3. Iniciar servidor
npm run dev
```

## Variables Requeridas

### Backend Laravel
```env
VITE_API_URL=http://localhost:8000/api
```

### Supabase

1. Ve a [supabase.com](https://supabase.com) → Tu Proyecto → Settings → API
2. Copia las credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Usa solo la `ANON_KEY`, nunca la `SERVICE_ROLE_KEY` en el frontend.

## Solución de Problemas

**Error: "Network Error"**
- Verifica que Laravel esté corriendo en `http://localhost:8000`
- Configura CORS en Laravel para aceptar `http://localhost:5173`

**Variables no se actualizan**
- Reinicia el servidor (`Ctrl+C` → `npm run dev`)

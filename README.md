# PEER-LEGAL

Sistema de análisis legal con IA para estudiantes de derecho y profesionales.

## Instalación

```bash
npm install
cp .env.example .env
# Edita .env con tus credenciales
npm run dev
```

Ver [ENV_SETUP.md](./ENV_SETUP.md) para configuración de variables de entorno.

## Stack Tecnológico

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router DOM
- Laravel (Backend)
- Supabase
- Gemini 1.5 (IA)

## Características

- Autenticación con roles (Estudiante/Profesional)
- Dashboard con estadísticas
- Gestión de casos (CRUD + análisis con IA)
- Biblioteca de jurisprudencia
- Filtros avanzados y exportación CSV
- Dark mode
- Responsive design

## Estructura

```
src/
├── components/     # Vistas principales
├── Tables/         # Tablas reutilizables
├── forms/          # Hooks de formularios
├── services/       # Servicios de API
├── config/         # Configuración (API, Supabase)
└── context/        # Contextos (Theme)
```

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run lint     # Linting
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

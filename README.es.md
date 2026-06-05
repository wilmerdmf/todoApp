# ToDoApp

Aplicación web fullstack para gestión de tareas con autenticación de usuarios. Permite organizar tareas por proyectos, prioridades y fechas, con soporte para drag & drop, búsqueda en tiempo real y una API REST documentada.

> 🚀 **[Demo en vivo](https://wilmerdmf.github.io/todoApp)** — Backend alojado en Render (plan gratuito). Los tiempos de respuesta pueden variar debido a la infraestructura compartida.

---

## Características

- **Autenticación segura** — Registro e inicio de sesión con access tokens JWT (15min) + refresh tokens (7 días), ambos en cookies HttpOnly
- **Gestión de tareas** — Crear, editar, eliminar y reordenar tareas con drag & drop
- **Organización por proyectos** — Agrupa tareas en proyectos personalizados con contador de tarjetas
- **Filtros y búsqueda** — Filtra por fecha (hoy, esta semana), proyecto, prioridad y búsqueda por título en tiempo real
- **Niveles de prioridad** — Tres niveles por tarea: Chill, Medium e Important, con indicadores de color
- **Manejo de sesión** — Renovación silenciosa del token al expirar; el usuario solo es redirigido cuando el refresh token también vence
- **API documentada** — Swagger UI interactivo disponible en `/api/docs` en desarrollo
- **Seguridad** — Rate limiting, headers de seguridad con Helmet, validación y sanitización de entradas

---

## Tecnologías

**Frontend**

- React 18.3.1 + TypeScript 5.9.3
- TanStack React Query 5.96.2
- dnd kit 6.3.1 + 10.0.0
- Axios 1.13.2
- date-fns 4.1.0
- Lucide React 0.562.0
- Vite 6.0.5

**Backend**

- Node.js + Express 5.2.1
- MongoDB + Mongoose 9.1.5
- JSON Web Tokens 9.0.3
- bcryptjs 2.4.3
- Helmet 8.1.0 + express-rate-limit 7.5.1
- Swagger UI Express 5.0.1

**Testing y CI**

- Vitest + React Testing Library (frontend)
- Jest + Supertest + mongodb-memory-server (backend)
- GitHub Actions — corre tests en cada push y despliega el frontend a GitHub Pages

---

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/wilmerdmf/todoApp.git
cd todoApp

# Frontend
npm install
cp .env.example .env
npm run dev

# Backend
cd backend
npm install
cp .env.example .env   # Completar con tus variables
npm run dev
```

Variables de entorno necesarias en `backend/.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

## Endpoints de la API

| Método | Endpoint             | Descripción                 | Auth |
| ------ | -------------------- | --------------------------- | ---- |
| POST   | `/api/auth/register` | Registrar usuario           | ❌   |
| POST   | `/api/auth/login`    | Iniciar sesión              | ❌   |
| POST   | `/api/auth/refresh`  | Renovar access token        | ❌   |
| POST   | `/api/auth/logout`   | Cerrar sesión               | ✅   |
| GET    | `/api/auth/me`       | Obtener usuario actual      | ✅   |
| GET    | `/api/cards`         | Obtener todas las tareas    | ✅   |
| POST   | `/api/cards`         | Crear tarea                 | ✅   |
| PUT    | `/api/cards/:id`     | Actualizar tarea            | ✅   |
| DELETE | `/api/cards/:id`     | Eliminar tarea              | ✅   |
| PUT    | `/api/cards/reorder` | Reordenar tareas (bulk)     | ✅   |
| GET    | `/api/projects`      | Obtener todos los proyectos | ✅   |
| POST   | `/api/projects`      | Crear proyecto              | ✅   |
| DELETE | `/api/projects/:id`  | Eliminar proyecto           | ✅   |

Documentación interactiva completa disponible en `http://localhost:5000/api/docs` al correr localmente.

---

## Estructura del proyecto

```
todoApp/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes de UI
│   ├── context/            # React Context (auth, UI, notificaciones)
│   ├── hooks/              # Custom hooks
│   ├── services/           # Llamadas a la API (Axios)
│   ├── types/              # Tipos TypeScript
│   └── constants/          # Constantes globales
├── backend/
│   └── src/
│       ├── controllers/    # Manejadores de rutas
│       ├── middlewares/    # Auth, manejo de errores
│       ├── models/         # Esquemas Mongoose
│       ├── routes/         # Rutas Express
│       └── utils/          # Helpers y validadores
└── .github/workflows/      # Pipeline CI/CD
```

---

_README también disponible en [English](README.md)_

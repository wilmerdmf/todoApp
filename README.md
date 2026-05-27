# ToDoApp

Full-stack web application for task management with user authentication. Organize tasks by projects, priorities and dates, with drag & drop support, real-time search and a documented REST API.

> 🚀 **[Live Demo](https://wilmerdmf.github.io/todoApp)** — Backend hosted on Render (may take ~30s to wake up on first request)

---

## Features

- **Secure authentication** — Register and login with JWT access tokens (15min) + refresh tokens (7 days), both stored in HttpOnly cookies
- **Task management** — Create, edit, delete and reorder tasks with drag & drop
- **Project organization** — Group tasks into custom projects with card count indicators
- **Filters & search** — Filter by date (today, this week), project, priority and real-time title search
- **Priority levels** — Three levels per task: Chill, Medium and Important, with color-coded indicators
- **Session handling** — Silent token refresh on expiry; users are only redirected when the refresh token also expires
- **Documented API** — Interactive Swagger UI available at `/api/docs` in development
- **Security** — Rate limiting, security headers via Helmet, input validation and sanitization

---

## Tech Stack

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

**Testing & CI**

- Vitest + React Testing Library (frontend)
- Jest + Supertest + mongodb-memory-server (backend)
- GitHub Actions — runs tests on every push and deploys frontend to GitHub Pages

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/wilmerdmf/todoApp.git
cd todoApp

# Frontend
npm install
cp .env.example .env
npm run dev

# Backend
cd backend
npm install
cp .env.example .env   # Fill in your variables
npm run dev
```

Required environment variables in `backend/.env`:

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

## API Endpoints

| Method | Endpoint             | Description           | Auth |
| ------ | -------------------- | --------------------- | ---- |
| POST   | `/api/auth/register` | Register new user     | ❌   |
| POST   | `/api/auth/login`    | Login                 | ❌   |
| POST   | `/api/auth/refresh`  | Refresh access token  | ❌   |
| POST   | `/api/auth/logout`   | Logout                | ✅   |
| GET    | `/api/auth/me`       | Get current user      | ✅   |
| GET    | `/api/cards`         | Get all user cards    | ✅   |
| POST   | `/api/cards`         | Create card           | ✅   |
| PUT    | `/api/cards/:id`     | Update card           | ✅   |
| DELETE | `/api/cards/:id`     | Delete card           | ✅   |
| PUT    | `/api/cards/reorder` | Reorder cards (bulk)  | ✅   |
| GET    | `/api/projects`      | Get all user projects | ✅   |
| POST   | `/api/projects`      | Create project        | ✅   |
| DELETE | `/api/projects/:id`  | Delete project        | ✅   |

Full interactive documentation available at `http://localhost:5000/api/docs` when running locally.

---

## Project Structure

```
todoApp/
├── src/                    # Frontend source
│   ├── components/         # UI components
│   ├── context/            # React Context (auth, UI, notifications)
│   ├── hooks/              # Custom hooks
│   ├── services/           # API calls (Axios)
│   ├── types/              # TypeScript types
│   └── constants/          # App-wide constants
├── backend/
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── middlewares/    # Auth, error handling
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routes
│       └── utils/          # Helpers and validators
└── .github/workflows/      # CI/CD pipeline
```

---

_README also available in [Español](README.es.md)_

# AI Expense Tracker

A modern, production-ready finance dashboard built with React, Vite, Tailwind CSS, Supabase Auth, Express, and PostgreSQL.

## Project Highlights

- Premium dashboard UI with responsive layouts and motion effects
- Supabase authentication and PostgreSQL-ready backend architecture
- Expense, income, budget, analytics, AI advisor, reports, and notifications
- Mobile-friendly, dark/light theme support, and performance-aware routing

## Folder Structure

- `frontend/` — React Vite application, Tailwind CSS styling, Supabase Auth integration
- `backend/` — Express API server, request validation, Supabase client middleware
- `schema.sql` — PostgreSQL schema for users, profiles, expenses, budgets, AI conversations, and reports

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Database

Use `schema.sql` to initialize your PostgreSQL / Supabase database.

## Environment

Copy `.env.example` into `frontend/.env` and `backend/.env`, then provide your Supabase credentials.

## Deployment

- Frontend: Vercel
- Backend: Render

## API Documentation

The backend exposes REST endpoints for auth, transactions, budgets, analytics, reports, notifications, and AI.

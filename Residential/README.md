# Residential Rehab - Real Estate Platform

A modern real estate platform built with Next.js frontend and Express.js backend, designed for property sales and investment opportunities.

## Project Structure

```
project-root/
├── backend/              ← Express.js API server
│   ├── package.json      ← Backend dependencies
│   ├── server.js         ← Main server file
│   ├── api/              ← API routes
│   ├── models/           ← Database models
│   ├── lib/              ← Utilities (email, database)
│   └── README.md         ← Backend documentation
├── src/
│   └── app/              ← Next.js App Router (frontend)
│       └── api/          ← Next.js API routes (proxy to backend)
├── package.json          ← Frontend dependencies
└── README.md             ← This file
```

## Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Environment Setup

**Frontend (.env):**
```bash
cp .env.example .env
# Configure BACKEND_URL and other frontend variables
```

**Backend (backend/.env):**
```bash
cd backend
cp .env.example .env
# Configure MONGODB_URI, SMTP settings, JWT_SECRET, etc.
```

### 3. Development

**Run both frontend and backend:**
```bash
npm run dev:full
```

**Or run separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Features

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js API with MongoDB, JWT authentication
- **Email**: Automated notifications via Brevo/Sendinblue
- **Admin Panel**: Consultation management system
- **Responsive Design**: Mobile-first approach

## Deployment

### Frontend (Vercel)
The frontend can be deployed to Vercel. Make sure to:
1. Set `BACKEND_URL` environment variable to your backend URL
2. Deploy from the root directory (where package.json is located)

### Backend (Railway/Heroku/etc.)
Deploy the `backend/` directory as a separate service.

## Documentation

- [Backend API Documentation](./backend/README.md)
- [Email Setup Guide](./EMAIL_SETUP.md)
- [MongoDB Setup Guide](./SETUP_MONGODB.md)

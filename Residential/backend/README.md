# Residential Rehab Backend API

This is the backend API server for the Residential Rehab application, built with Express.js and MongoDB.

## Features

- RESTful API for consultation management
- Admin authentication with JWT
- Email notifications via Brevo/Sendinblue
- MongoDB integration with Mongoose
- CORS enabled for frontend communication

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

3. **Required Environment Variables:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `SMTP_USER`: Your Brevo SMTP username
   - `SMTP_PASS`: Your Brevo SMTP password
   - `JWT_SECRET`: Secret key for JWT token generation
   - `PORT`: Server port (default: 5000)
   - `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

## Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

## Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Consultation
- `POST /api/consultation` - Create new consultation request
- `GET /api/consultation` - Get consultation requests (with pagination)
- `PATCH /api/consultation` - Update consultation status

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/setup` - Create admin account
- `GET /api/admin/me` - Get admin profile (requires authentication)

### Health Check
- `GET /health` - Server health check

## Database Models

### Consultation
- name, email, phone (required)
- propertyAddress, message (optional)
- inquiryType: 'sell' | 'invest' | 'other'
- status: 'new' | 'contacted' | 'in-progress' | 'completed'

### Admin
- name, email, password (required)
- JWT-based authentication

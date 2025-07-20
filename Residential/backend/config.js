// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGODB_URI: process.env.MONGODB_URI,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};

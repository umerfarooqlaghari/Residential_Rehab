import express from 'express';
import cors from 'cors';
import config from './config.js';
import connectDB from './lib/mongodb.js';
import consultationRoutes from './api/consultation.js';
import adminRoutes from './api/admin.js';

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/consultation', consultationRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Residential Rehab Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

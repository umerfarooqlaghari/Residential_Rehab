import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  propertyAddress: {
    type: String,
    trim: true,
    maxlength: [200, 'Property address cannot be more than 200 characters']
  },
  inquiryType: {
    type: String,
    required: [true, 'Inquiry type is required'],
    enum: ['sell', 'invest', 'other'],
    default: 'sell'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ConsultationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
ConsultationSchema.index({ email: 1 });
ConsultationSchema.index({ createdAt: -1 });
ConsultationSchema.index({ status: 1 });

export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);

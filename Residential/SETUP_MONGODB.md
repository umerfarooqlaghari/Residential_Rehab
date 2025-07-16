# MongoDB Setup Instructions

## Prerequisites
- MongoDB Atlas account (recommended) or local MongoDB installation
- Node.js and npm installed

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier is sufficient)

### Step 2: Configure Database Access
1. In your Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a username and password
4. Set privileges to "Read and write to any database"

### Step 3: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Add your current IP address or use "0.0.0.0/0" for access from anywhere (less secure)

### Step 4: Get Connection String
1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `residential_rehab`

### Step 5: Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the MONGODB_URI with your connection string:
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/residential_rehab?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### Step 1: Install MongoDB
1. Download and install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Follow the installation instructions for your operating system

### Step 2: Start MongoDB Service
- **Windows**: MongoDB should start automatically as a service
- **macOS**: Run `brew services start mongodb/brew/mongodb-community`
- **Linux**: Run `sudo systemctl start mongod`

### Step 3: Update Environment Variables
1. Open `.env.local` file in your project root
2. Use the local connection string:
```
MONGODB_URI=mongodb://localhost:27017/residential_rehab
```

## Testing the Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Test the Form
1. Open http://localhost:3000 in your browser
2. Navigate to the Contact section
3. Fill out and submit the consultation form
4. Check for success message

### Step 4: View Submissions (Admin)
1. Go to http://localhost:3000/admin/consultations
2. You should see the submitted consultation requests

## Database Schema

The consultation form creates documents with the following structure:

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  phone: String (required),
  propertyAddress: String (optional),
  inquiryType: String (enum: ['sell', 'invest', 'other']),
  message: String (optional),
  status: String (enum: ['new', 'contacted', 'in-progress', 'completed']),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### POST /api/consultation
Submit a new consultation request
- **Body**: JSON with form data
- **Response**: Success/error message with created record

### GET /api/consultation
Retrieve consultation requests (admin use)
- **Query Parameters**: 
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status
  - `inquiryType`: Filter by inquiry type

## Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Database Access**: Use strong passwords and limit IP access in production
3. **API Security**: Consider adding authentication for admin endpoints in production
4. **Data Validation**: All form inputs are validated both client-side and server-side

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your MongoDB URI and network access settings
2. **Validation Errors**: Ensure all required fields are provided
3. **CORS Issues**: Make sure your API routes are in the correct `/app/api/` directory

### Debug Steps

1. Check browser console for JavaScript errors
2. Check server logs in the terminal
3. Verify environment variables are loaded correctly
4. Test database connection separately

## Production Deployment

When deploying to production:

1. Use MongoDB Atlas for better reliability
2. Set up proper environment variables on your hosting platform
3. Consider adding authentication for admin routes
4. Set up monitoring and logging
5. Configure proper CORS settings
6. Use HTTPS for secure data transmission

## Support

If you encounter issues:
1. Check the MongoDB Atlas documentation
2. Review Next.js API routes documentation
3. Verify all dependencies are installed correctly
4. Check network connectivity and firewall settings

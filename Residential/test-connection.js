const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://ak1096561:Anaskhan12345@cluster0.2ryuhco.mongodb.net/residential_rehab?retryWrites=true&w=majority';

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connection successful!');
    
    // Test the consultation model
    const testSchema = new mongoose.Schema({
      name: String,
      email: String,
      test: { type: Boolean, default: true },
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const testDoc = new TestModel({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up!');
    
    console.log('\n🎉 All tests passed! Your backend is ready.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Please check:');
    console.log('1. Your internet connection');
    console.log('2. MongoDB Atlas cluster is running');
    console.log('3. IP address is whitelisted in MongoDB Atlas');
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testConnection();

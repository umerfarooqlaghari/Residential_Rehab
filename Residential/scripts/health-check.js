// Health check script for deployed API
// Run with: node scripts/health-check.js

const BASE_URL = process.env.DEPLOYED_URL || 'https://your-app-name.vercel.app';

async function healthCheck() {
  console.log('🔍 Starting API health check...\n');
  
  const endpoints = [
    { name: 'Test API', url: `${BASE_URL}/api/test`, method: 'GET' },
    { name: 'Admin Check', url: `${BASE_URL}/api/admin/auth`, method: 'GET' },
    { name: 'Consultation List', url: `${BASE_URL}/api/consultation`, method: 'GET' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const response = await fetch(endpoint.url, { method: endpoint.method });
      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log(`✅ ${endpoint.name}: OK`);
      } else {
        console.log(`❌ ${endpoint.name}: Failed - ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
    }
  }
  
  console.log('\n🏁 Health check completed!');
}

healthCheck();

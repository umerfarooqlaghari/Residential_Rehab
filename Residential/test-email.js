// Test script to verify email functionality
// Run with: node test-email.js

import { sendConsultationAutoReply } from './src/lib/email.js';

async function testEmail() {
  console.log('🧪 Testing email functionality...');
  
  try {
    const testData = {
      to: 'test@example.com', // Replace with your test email
      name: 'John Doe',
      inquiryType: 'sell',
      message: 'I am interested in selling my property quickly. It needs some repairs but I want to get a fair offer.',
      propertyAddress: '123 Main Street, Miami, FL 33101'
    };

    console.log('📧 Sending test email...');
    const result = await sendConsultationAutoReply(testData);
    
    console.log('✅ Email sent successfully!');
    console.log('📋 Message ID:', result.messageId);
    console.log('📨 Response:', result.response);
    
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error:', error.message);
    
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }
    
    // Common troubleshooting tips
    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Check that SMTP_USER and SMTP_PASS are set in your environment');
    console.log('2. Verify your Brevo SMTP credentials are correct');
    console.log('3. Ensure your Brevo account has SMTP access enabled');
    console.log('4. Check if your IP is whitelisted in Brevo (if required)');
  }
}

// Run the test
testEmail();

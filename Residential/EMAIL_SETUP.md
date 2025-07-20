# Email Configuration Guide - Residential Rehab

## Overview
This document explains the automated email system for the Residential Rehab contact form. The system uses Brevo (formerly Sendinblue) SMTP with username/password authentication instead of API keys.

## Features

### ✨ Professional Email Template
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Brand Alignment**: Matches your website's blue color scheme (#1e3a8a, #2563eb)
- **Professional Layout**: Clean, modern design with proper typography
- **Company Branding**: Features "Residential Rehab" and "Presidential Real Estate Holdings"

### 📧 Email Content
- **Personalized Greeting**: Uses the customer's name
- **24-Hour Response Promise**: Clear commitment to respond within 24 hours
- **Inquiry Summary**: Shows all submitted form details
- **Contact Information**: Phone and email for urgent matters
- **Company History**: Mentions 30 years of experience since 1996
- **Professional Tone**: Warm but professional messaging

### 🎨 Visual Elements
- **Gradient Headers**: Blue gradient matching website theme
- **Icons**: Professional emoji icons for visual appeal
- **Structured Layout**: Clear sections with proper spacing
- **Contact Cards**: Easy-to-read contact information boxes
- **Mobile Responsive**: Optimized for all screen sizes

## Environment Variables Required

Create a `.env.local` file in your project root with these variables:

```env
# Brevo SMTP Configuration
SMTP_USER=your-brevo-username@example.com
SMTP_PASS=your-brevo-smtp-password

# MongoDB (if not already set)
MONGODB_URI=your-mongodb-connection-string
```

## Brevo Configuration Steps

### 1. Login to Brevo Dashboard
- Go to [Brevo](https://www.brevo.com) and login to your account

### 2. Get SMTP Credentials
- Navigate to **Settings** → **SMTP & API**
- Find your SMTP settings:
  - **SMTP Server**: `smtp-relay.brevo.com`
  - **Port**: `587`
  - **Username**: Your Brevo login email
  - **Password**: Your Brevo account password (or app password)

### 3. Verify Domain (Recommended)
- Go to **Settings** → **Senders & IP**
- Add and verify your domain `residentialrehabgroup.com`
- This improves email deliverability

## Testing the Email System

### 1. Test Email Function
```bash
# Update test-email.js with your test email address
node test-email.js
```

### 2. Test via Contact Form
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Fill out the contact form
4. Check your email for the automated response

### 3. Check Email Logs
- Monitor the console for any email sending errors
- Check Brevo dashboard for email statistics

## Email Template Customization

The email template is in `src/lib/email.js` in the `createEmailTemplate` function. You can customize:

- **Colors**: Update the CSS color values
- **Content**: Modify the text and messaging
- **Layout**: Adjust the HTML structure
- **Branding**: Update company information

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify SMTP_USER and SMTP_PASS are correct
   - Check if 2FA is enabled (may need app password)

2. **Connection Timeout**
   - Check firewall settings
   - Verify port 587 is open

3. **Email Not Received**
   - Check spam/junk folder
   - Verify sender domain is configured
   - Check Brevo sending limits

4. **Template Not Displaying**
   - Some email clients block HTML emails
   - Plain text version is automatically included

### Debug Steps

1. **Check Environment Variables**
   ```javascript
   console.log('SMTP_USER:', process.env.SMTP_USER);
   console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'Not set');
   ```

2. **Test SMTP Connection**
   ```bash
   node test-email.js
   ```

3. **Check Brevo Dashboard**
   - Login to Brevo
   - Check **Statistics** → **Email** for delivery status

## Email Content Details

### Subject Line
`Thank You for Your [Inquiry Type] - We'll Respond Within 24 Hours`

### Key Messages
- Immediate acknowledgment of inquiry
- 24-hour response commitment
- Professional company introduction
- Clear next steps
- Emergency contact information

### Inquiry Types
- **Property Sale Inquiry** (sell)
- **Investment Opportunity** (invest)
- **General Inquiry** (other)

## Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **SMTP Credentials**: Keep credentials secure and rotate regularly
3. **Rate Limiting**: Brevo has sending limits - monitor usage
4. **Spam Prevention**: Proper domain verification reduces spam issues

## Production Deployment

### Vercel Environment Variables
Add these in your Vercel dashboard under **Settings** → **Environment Variables**:
- `SMTP_USER`
- `SMTP_PASS`
- `MONGODB_URI`

### Domain Configuration
- Ensure your domain is verified in Brevo
- Set up SPF and DKIM records for better deliverability

## Support

For issues with:
- **Brevo Configuration**: Contact Brevo support
- **Email Template**: Check this documentation or modify `src/lib/email.js`
- **Form Integration**: Check `src/app/api/consultation/route.js`

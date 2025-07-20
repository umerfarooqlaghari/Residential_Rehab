import nodemailer from 'nodemailer';
import config from '../config.js';

const smtpUser = config.SMTP_USER;
const smtpPass = config.SMTP_PASS;
const brevoApiKey = config.BREVO_API_KEY;

// Try multiple SMTP configurations
const createTransporter = () => {
  // Configuration 1: Brevo SMTP with TLS
  const config1 = {
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      ciphers: 'TLSv1.2',
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransport(config1);
};

const transporter = createTransporter();

// Helper function to format inquiry type for display
function formatInquiryType(inquiryType) {
  const types = {
    'sell': 'Property Sale Inquiry',
    'invest': 'Investment Opportunity',
    'other': 'General Inquiry'
  };
  return types[inquiryType] || 'General Inquiry';
}

// Helper function to create professional HTML email template
function createEmailTemplate({ name, inquiryType, message, propertyAddress }) {
  const formattedInquiryType = formatInquiryType(inquiryType);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Inquiry - Residential Rehab</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #374151;
          background-color: #f8fafc;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: -0.5px;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #1e3a8a;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .message-box {
          background-color: #f0f9ff;
          border-left: 4px solid #2563eb;
          padding: 20px;
          margin: 25px 0;
          border-radius: 0 8px 8px 0;
        }
        .message-box h3 {
          margin: 0 0 15px 0;
          color: #1e3a8a;
          font-size: 16px;
          font-weight: 600;
        }
        .inquiry-details {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .inquiry-details h3 {
          margin: 0 0 15px 0;
          color: #1e3a8a;
          font-size: 16px;
          font-weight: 600;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .detail-label {
          font-weight: 600;
          color: #374151;
          min-width: 120px;
        }
        .detail-value {
          color: #6b7280;
          flex: 1;
        }
        .cta-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          color: white;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
          border-radius: 8px;
        }
        .cta-section h3 {
          margin: 0 0 15px 0;
          font-size: 20px;
        }
        .cta-section p {
          margin: 0 0 20px 0;
          opacity: 0.9;
        }
        .contact-info {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 25px;
          margin: 25px 0;
        }
        .contact-info h3 {
          margin: 0 0 20px 0;
          color: #1e3a8a;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .contact-item {
          text-align: center;
          padding: 15px;
          background-color: white;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .contact-item .icon {
          font-size: 24px;
          margin-bottom: 8px;
          color: #2563eb;
        }
        .contact-item .label {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .contact-item .value {
          color: #2563eb;
          font-weight: 600;
        }
        .footer {
          background-color: #1e3a8a;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .footer p {
          margin: 5px 0;
          opacity: 0.8;
        }
        .footer .company-name {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
          opacity: 1;
        }
        @media (max-width: 600px) {
          .container {
            margin: 0;
            box-shadow: none;
          }
          .header, .content, .cta-section, .contact-info, .footer {
            padding: 20px;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>Residential Rehab</h1>
          <p>Your Trusted Real Estate Partner Since 1996</p>
        </div>

        <!-- Main Content -->
        <div class="content">
          <div class="greeting">
            Hello ${name},
          </div>

          <p>Thank you for reaching out to Residential Rehab! We've successfully received your inquiry and truly appreciate you considering us for your real estate needs.</p>

          <div class="message-box">
            <h3>✅ What Happens Next?</h3>
            <p><strong>We'll get back to you within 24 hours</strong> with a personalized response tailored to your specific situation. Our experienced team will review your inquiry and provide you with the guidance and solutions you're looking for.</p>
            <p>Your home is more than just a property – it's where life happens. We understand this, and we're committed to providing you with care-driven solutions that respect what home truly means to you.</p>
          </div>

          <!-- Inquiry Details -->
          <div class="inquiry-details">
            <h3>📋 Your Inquiry Summary</h3>
            <div class="detail-row">
              <div class="detail-label">Inquiry Type:</div>
              <div class="detail-value">${formattedInquiryType}</div>
            </div>
            ${propertyAddress ? `
            <div class="detail-row">
              <div class="detail-label">Property Address:</div>
              <div class="detail-value">${propertyAddress}</div>
            </div>
            ` : ''}
            ${message ? `
            <div class="detail-row">
              <div class="detail-label">Your Message:</div>
              <div class="detail-value">${message}</div>
            </div>
            ` : ''}
            <div class="detail-row">
              <div class="detail-label">Submitted:</div>
              <div class="detail-value">${new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="cta-section">
            <h3>🚀 Ready to Move Forward?</h3>
            <p>For urgent matters or if you have additional questions, don't hesitate to reach out to us directly. We're here to help!</p>
          </div>

          <!-- Contact Information -->
          <div class="contact-info">
            <h3>📞 Get In Touch Immediately</h3>
            <div class="contact-grid">
              <div class="contact-item">
                <div class="icon">📞</div>
                <div class="label">Call Us Now</div>
                <div class="value">561-889-6041</div>
              </div>
              <div class="contact-item">
                <div class="icon">✉️</div>
                <div class="label">Email Us</div>
                <div class="value">sales@residentialrehabgroup.com</div>
              </div>
            </div>
          </div>

          <p style="margin-top: 30px; color: #6b7280; font-style: italic;">
            With nearly three decades of experience serving South Florida homeowners, we've helped hundreds of families transition through life's changes with solutions that are fast, fair, and respectful. Your success is our priority.
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="company-name">Residential Rehab</div>
          <p>Presidential Real Estate Holdings</p>
          <p>Serving South Florida's East Coast Since 1996</p>
          <p>Trusted Expertise • Proven Results • Your Success is Our Priority</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Fallback function using Brevo API
async function sendEmailViaBrevoAPI({ to, name, inquiryType, message, propertyAddress }) {
  const formattedInquiryType = formatInquiryType(inquiryType);

  const emailData = {
    sender: {
      name: "Residential Rehab",
      email: "sales@residentialrehabgroup.com"
    },
    to: [
      {
        email: to,
        name: name
      }
    ],
    subject: `Thank You for Your ${formattedInquiryType} - We'll Respond Within 24 Hours`,
    htmlContent: createEmailTemplate({ name, inquiryType, message, propertyAddress }),
    textContent: `
Hello ${name},

Thank you for reaching out to Residential Rehab! We've successfully received your inquiry and truly appreciate you considering us for your real estate needs.

WHAT HAPPENS NEXT?
We'll get back to you within 24 hours with a personalized response tailored to your specific situation.

YOUR INQUIRY SUMMARY:
- Inquiry Type: ${formattedInquiryType}
${propertyAddress ? `- Property Address: ${propertyAddress}` : ''}
${message ? `- Your Message: ${message}` : ''}

FOR URGENT MATTERS:
📞 Call us now: 561-889-6041
✉️ Email us: sales@residentialrehabgroup.com

Best regards,
Residential Rehab Team
    `
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': brevoApiKey
    },
    body: JSON.stringify(emailData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Brevo API Error: ${errorData.message || response.statusText}`);
  }

  return await response.json();
}

export async function sendConsultationAutoReply({ to, name, inquiryType, message, propertyAddress }) {
  // Use Brevo API directly since SMTP credentials are not working
  console.log('Sending email via Brevo API to:', to);

  try {
    const result = await sendEmailViaBrevoAPI({ to, name, inquiryType, message, propertyAddress });
    console.log('Email sent successfully via Brevo API');
    return result;
  } catch (apiError) {
    console.error('Brevo API failed:', apiError.message);
    throw new Error(`Email sending failed: ${apiError.message}`);
  }
}

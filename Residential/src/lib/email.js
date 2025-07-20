import nodemailer from 'nodemailer';

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
// If you need the API key elsewhere, use: process.env.BREVO_API_KEY

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function sendConsultationAutoReply({ to, name, inquiryType, message }) {
  const mailOptions = {
    from: 'sales@residentialrehabgroup.com',
    to,
    subject: 'Thank you for your inquiry',
    text: `We'll get back to you in 24 hours.\n\nInquiry Type: ${inquiryType}\nDescription: ${message}\n\nFor urgent queries, call us at 561-889-6041.`,
    html: `<p>We'll get back to you in 24 hours.</p><p><b>Inquiry Type:</b> ${inquiryType}</p><p><b>Description:</b> ${message}</p><p>For urgent queries, call us at <b>561-889-6041</b>.</p>`
  };
  return transporter.sendMail(mailOptions);
}

import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// General email sending function
export async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'parkflow113@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Verification email helper
export async function sendVerificationEmail(to, firstName) {
  const subject = 'Verify Your Weatherwise Account';

  // Generate a token with the email, verification code, and expiry
  const token = jwt.sign(
    { email: to },  // Data to encode in the token
    process.env.JWT_SECRET,          // Secret key to sign the token
    { expiresIn: '10m' }        // Expiry time of 10 minutes
  );

  const verificationLink = `http://localhost:5000/api/verify?token=${token}`;

  const text = `
  Hi ${firstName},

  Thank you for creating an account with Weatherwise!

  To verify your email address and activate your account, please use the following link below to verify your email:

  ➡️ [Verify your account]( ${verificationLink} )

  This code will expire in 10 minutes. Please do not share this code with anyone.

  If you did not sign up for Weatherwise, please ignore this message.

  Best regards,  
  - The Weatherwise Team
  `;
  await sendEmail(to, subject, text);
}

// Export the functions
export default { sendEmail, sendVerificationEmail };
import nodemailer from 'nodemailer';
import logger from '../config/logger.js'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL_ADDRESS,
      pass: process.env.APP_EMAIL_PASS,
    },
  });

const sendOTPMail = async (email, otp) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS, 
    to: email, 
    subject: 'Your Authentication code for SmartFOX system registration', 
    html: `Please use the fpllowing code to help verify your identity : <b>${otp}</b> . It is valid for 10 minutes.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`OTP mail sent successfully to ${email}`);
  } catch (error) {
    logger.error(`Error sending OTP mail: ${error.message}`, { stack: error.stack });
    throw error; 
  }
};


const sendResetPasswordLinkMail = async (email, resetLink) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: 'Password Reset',
    html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><br>
    Please click on the following link, or paste this into your browser to complete the process:<br><br>
    <a href="${resetLink}">${resetLink}</a><br><br>
    If you did not request this, please ignore this email and your password will remain unchanged.<br>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Reset link sent to ${email}`);
    return 'Reset link sent to your email if it exists in our system.';
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to send reset link.'); 
  }
};

export {sendOTPMail,sendResetPasswordLinkMail};


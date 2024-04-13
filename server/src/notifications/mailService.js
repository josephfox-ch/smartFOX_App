import nodemailer from 'nodemailer';

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
    console.log('OTP mail sent successfully');
  } catch (error) {
    console.error('Error sending OTP mail:', error);
    throw error; 
  }
};


const sendResetPaswordLinkMail = async(email,resetLink) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: 'Password Reset Link',
    html: `Please click on the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Reset link sent to your email if it exists in our system.');
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send('Failed to send reset link.');
  }
};

export default {sendOTPMail,sendResetPaswordLinkMail};

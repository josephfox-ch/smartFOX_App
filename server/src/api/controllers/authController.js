import AuthService from '../services/authService.js';

const authController = {
  async register(req, res){
    try {
      const { user, home, preferences } = await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Registration started. OTP sent.',
        user: user, home: home, preferences: preferences
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });
    }
  },

  async verifyRegistration(req, res) {
    try {
      const { userId, otp } = req.body;
      const { token, user } = await AuthService.verifyOTP(userId, otp);
      res.status(200).json({ success: true, message: 'Registration Successful. User verified.',token: token, user:user });
    } catch (error) {
      res.status(400).json({ success: false, message: "OTP Verification failed", error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password); 
      res.status(200).json({ success: true, message: 'Login Successful.',user: user, token : token });
      
    } catch (error) {
      res.status(400).json({ success: false, message: "Login failed", error: error.message });
    }
  },
  

  async verifyLogin(req, res) {
    try {
      const { userId, otp } = req.body;
      const { token, user } = await AuthService.verifyOTP(userId, otp);
      res.status(200).json({ success: true, message: 'Login Successful. User verified.', token: token, user: user });
    } catch (error) {
      res.status(400).json({ success: false, message: "OTP Verification failed", error: error.message });
    }
  }
};

export default authController;


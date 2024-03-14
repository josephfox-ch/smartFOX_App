import AuthService from '../services/authService.js';

const authController = {
    async register(req, res) {
      try {
        const user = await AuthService.register(req.body);
        res.status(201).json({message: 'Registration started. OTP sent.', user});
      } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
      }
    },
    async verifyRegistration(req, res) {
      try {
        const { userId, otp } = req.body;
        const { token, user } = await AuthService.verifyOTP(userId, otp);
        res.status(200).json({message: 'Registration Successful. User verified.', token, user});
      } catch (error) {
        res.status(500).json({ message: "OTP Verification failed", error: error.message });
      }
    },
    async login(req, res) {
      try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        res.status(200).json({message: 'Login Successful. OTP sent.', user});
      } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
      }
    },
    async verifyLogin(req, res) {
      try {
        const { userId, otp } = req.body;
        const { token, user } = await AuthService.verifyOTP(userId, otp);
        res.status(200).json({message: 'Login Successful. User verified.', token, user});
      } catch (error) {
        res.status(500).json({ message: "OTP Verification failed", error: error.message });
      }
    }
};

export default authController;

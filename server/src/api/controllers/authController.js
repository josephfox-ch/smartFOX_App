import AuthService from '../services/authService.js'

const authController = {
    async register(req, res) {
      try {
        const user = await AuthService.register(req.body);
        res.status(201).json({message: 'Registration Successful', user: user});
      } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
      }
    },
    async login(req,res){
      try {
        const {email, password} = req.body
        const {token,user} = await AuthService.login(email,password);
        req.session.token = token;
        res.status(200).json({message: 'Login Successful', user: user,token: token});
      } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
      }
    }
}

export default authController;
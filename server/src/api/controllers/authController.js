

const authController = {
    async register(req, res) {
      try {
        const user = await authService.register(req.body);
        res.status(201).json({message: 'Registration Successful', user: user});
      } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
      }
    }
}

export default authController;
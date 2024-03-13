import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { User } from "../models/index.js";

const authService = {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await User.create({ ...userData, password: hashedPassword });
    return { id: user.id, email: user.email };
  },
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
    return { token, user: { id: user.id, email: user.email } };
  },
};

export default authService;

import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

const authService = {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await User.create({ ...userData, password: hashedPassword });
    return { id: user.id, email: user.email };
  },
};

export default authService;

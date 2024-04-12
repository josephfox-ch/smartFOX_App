import { RefreshToken } from "../models/index.js";
import { verifyRefreshToken } from "../../utils/jwtHelpers.js";

const refreshTokenService = {
  async saveRefreshToken(userId, refreshToken, rememberMe) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (rememberMe ? 30 : 7));

    await RefreshToken.create({
      token: refreshToken,
      userId: userId,
      expiryDate,
    });
  },

  async removeRefreshToken(token) {
    await RefreshToken.destroy({
      where: { token },
    });
  },

  async validateRefreshToken(token) {
    const { isValid, payload, error } = verifyRefreshToken(token);
    if (!isValid) throw new Error("Invalid refresh token");

    const refreshToken = await RefreshToken.findOne({
      where: {
        token,
        userId: payload.userId,
        expiryDate: { [Op.gt]: new Date() },
      },
    });

    if (!refreshToken) throw new Error("Refresh token not found or expired");

    return payload.userId;
  },
};

export default refreshTokenService;

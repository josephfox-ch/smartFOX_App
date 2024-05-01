import jwt from "jsonwebtoken";
import { RefreshToken } from "../api/models/index.js";
import { Op } from "sequelize";

const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '30d';

function generateTokens(user) {
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
    try {
        return { isValid: true, payload: jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) };
    } catch (error) {
        return { isValid: false, error };
    }
}

function verifyRefreshToken(token) {
    try {
        return { isValid: true, payload: jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) };
    } catch (error) {
        return { isValid: false, error };
    }
}

async function cleanExpiredTokens() {
    await RefreshToken.destroy({
        where: {
            expiryDate: { [Op.lt]: new Date() }
        }
    });
}

export { generateTokens, verifyAccessToken, verifyRefreshToken,cleanExpiredTokens};






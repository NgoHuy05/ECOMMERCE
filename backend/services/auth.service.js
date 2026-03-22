import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Session from "../models/session.model.js";
import crypto from "crypto";
export const registerService = async (data) => {
    const { fullname, email, password, repassword } = data;
    if (!fullname || !email || !password || !repassword) {
        throw new Error("Vui long dien day du thong tin bat buoc");
    }
    if (password !== repassword) {
        throw new Error("Mat khau khong trung nhau");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Tai khoan da duoc dang ki");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        fullname, email,
        password: hashedPassword,
        displayName: fullname
    });
    return newUser;
}

export const loginService = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("Vui long dien day du thong tin bat buoc");
    }
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new Error("Email hoac mat khau chua chinh xac");
        
    }
    const isMatchPassword = await bcrypt.compare(password, existingUser.password);
    if (!isMatchPassword) {
        throw new Error("Email hoac mat khau chua chinh xac");
        
    }
    const accessToken = jwt.sign({userId: existingUser._id, role: existingUser.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    const refreshToken = crypto.randomBytes(64).toString("hex");
    await Session.create({
        userId: existingUser._id,
        refreshToken,
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) })
    return { user: existingUser, accessToken, refreshToken };
}

export const refreshTokenService = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("RefreshToken khong hop le");
    }

    const session = await Session.findOne({ refreshToken });

    if (!session) {
        throw new Error("RefreshToken khong ton tai");
    }

    if (session.expiresAt < new Date()) {
        throw new Error("RefreshToken het han");
    }

    const user = await User.findById(session.userId);

    if (!user) {
        throw new Error("User khong ton tai");
    }

    const newAccessToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    return newAccessToken;
};
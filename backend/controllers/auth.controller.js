import Session from "../models/session.model.js";
import User from "../models/user.model.js";
import { loginService, refreshTokenService, registerService } from "../services/auth.service.js";

export const Register = async (req, res) => {
    try {
        const { fullname, email, password, repassword } = req.body;
        const user = await registerService({ fullname, email, password, repassword });
        return res.status(200).json({
            message: "Dang ki thanh cong",
            user: {
                fullname: user.fullname,
                email: user.email,
            }
        });
    } catch (err) {
        console.error("Loi dang ki", err);
        return res.status(500).json({ message: "Loi he thong" });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await loginService({ email, password });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 14 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Dang nhap thanh cong",
            user: {
                email: user.email,
                fullname: user.fullname
            },
            accessToken
        });
    } catch (err) {
        console.error("Loi dang nhap", err);
        return res.status(500).json({ message: "Loi he thong" });
    }
}

export const RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const accessToken = await refreshTokenService(refreshToken);
        return res.status(200).json({ message: "refreshToken thanh cong", accessToken });
    } catch (err) {
        console.error("Loi refreshToken", err);
        return res.status(500).json({ message: "Loi he thong" });
    }
}

export const Logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            await Session.deleteOne({ refreshToken });
        } res.clearCookie("refreshToken");
        return res.status(200).json({ message: "Dang xuat thanh cong" });
    } catch (err) {
        console.error("Loi dang xuat", err);
        return res.status(500).json({ message: "Loi he thong" });
    }
}

export const getProfileMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Nguoi dung ko ton tai hoac da bi xoa" });
        }
        return res.status(200).json({ message: "lay thong tin nguoi dung thanh cong", user });
    } catch (err) {
        console.error("loi lay thong tin nguoi dung", err);
        return res.status(500).json({ message: "Loi he thong" })
    }
}
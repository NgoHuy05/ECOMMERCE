export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Ban chua dang nhap"
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token khong hop le"
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decoded;
        next();

    } catch (err) {
        console.error("JWT error:", err);
        return res.status(403).json({
            message: "Token het han hoac khong hop le"
        });
    }
};
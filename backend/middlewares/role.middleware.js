export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Vui long dang nhap"
            });
        }

        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Ban khong du quyen truy cap"
            });
        }

        next();
    };
};
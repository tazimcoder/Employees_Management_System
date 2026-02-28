import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

/* ===============================
   ✅ Verify Token Middleware
================================= */
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);

    // Expected decoded format:
    // { id, email, role }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

/* ===============================
   ✅ HR Only Middleware
================================= */
export const hrOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "hr") {
    return res.status(403).json({
      message: "Access denied. HR only.",
    });
  }

  next();
};

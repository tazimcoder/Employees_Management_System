import express from "express";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "your_secret_key";

// -------- LOGIN ROUTE --------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role FROM employees WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- GET LOGGED-IN USER (NEW ROUTE) --------
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);

    const [rows] = await db.query(
      "SELECT id, name, email, position, phone, address, salary FROM employees WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]); // 👈 Sirf logged-in user ka data
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// ✅ FIRST TIME PASSWORD SET ROUTE
router.post("/set-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id FROM employees WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not registered" });
    }

    await db.query(
      "UPDATE employees SET password = ? WHERE email = ?",
      [newPassword, email]
    );

    res.json({ message: "Password set successfully. You can now login." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;

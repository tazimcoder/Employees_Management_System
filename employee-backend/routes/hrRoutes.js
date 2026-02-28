import express from "express";
import db from "../config/db.js";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔹 GET Employees with Search + Filter + Pagination
router.get(
  "/employees",
  authMiddleware,
  roleMiddleware("hr"), // 👈 HR role check
  async (req, res) => {
    try {
      const {
        search = "",
        role = "",
        page = 1,
        limit = 5,
      } = req.query;

      let query = "SELECT * FROM employees WHERE 1=1";
      let countQuery = "SELECT COUNT(*) as total FROM employees WHERE 1=1";
      let params = [];
      let countParams = [];

      // 🔍 Search filter
      if (search) {
        query += " AND (name LIKE ? OR email LIKE ?)";
        countQuery += " AND (name LIKE ? OR email LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
        countParams.push(`%${search}%`, `%${search}%`);
      }

      // 👤 Role filter
      if (role) {
        query += " AND role = ?";
        countQuery += " AND role = ?";
        params.push(role);
        countParams.push(role);
      }

      const offset = (Number(page) - 1) * Number(limit);
      query += " LIMIT ? OFFSET ?";
      params.push(Number(limit), Number(offset));

      const [rows] = await db.query(query, params);
      const [countResult] = await db.query(countQuery, countParams);

      const total = countResult[0].total;

      res.status(200).json({
        data: rows,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error("HR Employees Error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;

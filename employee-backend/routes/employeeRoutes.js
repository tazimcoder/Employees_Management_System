import express from "express";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", roleMiddleware("hr"), getEmployees);
router.get("/:id", getEmployee);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;

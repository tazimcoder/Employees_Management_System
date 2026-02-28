import * as Employee from "../models/employeeModel.js";

/* ADD */
export const addEmployee = async (req, res) => {
  try {
    const result = await Employee.createEmployee(req.body);
    res.status(201).json({
      success: true,
      message: "Employee Added",
      result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ONE */
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.getEmployeeById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* UPDATE */
export const updateEmployee = async (req, res) => {
  try {
    const result = await Employee.updateEmployee(
      req.params.id,
      req.body
    );
    res.json({ message: "Employee Updated", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* DELETE */
export const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.deleteEmployee(req.params.id);
    res.json({ message: "Employee Deleted", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

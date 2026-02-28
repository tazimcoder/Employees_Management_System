import db from "../config/db.js";

/* GET ALL */
export const getAllEmployees = async () => {
  const [rows] = await db.query("SELECT * FROM employees");
  return rows;
};

/* GET BY ID */
export const getEmployeeById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM employees WHERE id = ?",
    [id]
  );
  return rows[0];
};

/* CREATE */
export const createEmployee = async (data) => {
  const [result] = await db.query(
    "INSERT INTO employees SET ?",
    [data]
  );
  return result;
};

/* UPDATE */
export const updateEmployee = async (id, data) => {
  const [result] = await db.query(
    "UPDATE employees SET ? WHERE id = ?",
    [data, id]
  );
  return result;
};

/* DELETE */
export const deleteEmployee = async (id) => {
  const [result] = await db.query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );
  return result;
};

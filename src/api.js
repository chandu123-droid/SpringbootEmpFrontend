import axios from "axios";

// Automatically use Render backend if available, else use local backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ✅ Get all employees
export const getEmployees = () => axios.get(`${API_URL}/api/employees/showAllEmpdata`);

// ✅ Get employee by ID
export const getEmployeeById = (id) =>
  axios.get(`${API_URL}/api/employees/showEmpdataByid/${id}`);

// ✅ Add new employee
export const addEmployee = (employee) =>
  axios.post(`${API_URL}/api/employees/insertEmpdata`, employee);

// ✅ Update existing employee by ID
export const updateEmployee = (id, employee) =>
  axios.put(`${API_URL}/api/employees/updateEmpdataById/${id}`, employee);

// ✅ Delete employee by ID
export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/api/employees/deleteEmpByid/${id}`);

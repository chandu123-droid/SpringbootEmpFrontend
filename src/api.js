import axios from "axios";

const API_URL = "https://springbootempbackend-1.onrender.com";

// ✅ Get all employees
export const getEmployees = () => axios.get(`${API_URL}/showAllEmpdata`);

// ✅ Get employee by ID
export const getEmployeeById = (id) =>
  axios.get(`${API_URL}/showEmpdataByid/${id}`);

// ✅ Add new employee
export const addEmployee = (employee) =>
  axios.post(`${API_URL}/insertEmpdata`, employee);

// ✅ Update existing employee by ID
export const updateEmployee = (id, employee) =>
  axios.put(`${API_URL}/updateEmpdataById/${id}`, employee);

// ✅ Delete employee by ID
export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/deleteEmpByid/${id}`);

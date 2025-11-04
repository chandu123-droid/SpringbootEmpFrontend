import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../api";
import Header from "./Header";
import "./AddEmployee.css"; // Reuse same CSS as AddEmployee form

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    emailid: "",
    firstname: "",
    lastname: "",
  });

  // ✅ Fetch existing employee data on mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.error("❌ Error fetching employee data:", error);
        alert("Error fetching employee details.");
      }
    };
    fetchEmployee();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, employee); // ✅ Correct way
      alert("✅ Employee updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error updating employee:", error);
      alert("❌ Error updating employee. Check console for details.");
    }
  };

  return (
    <>
      <Header />
      <div className="add-employee-container">
        <div className="add-employee-card">
          <h2>Edit Employee</h2>
          <form className="add-employee-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="emailid"
              placeholder="Enter Email ID"
              value={employee.emailid}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              value={employee.firstname}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
              value={employee.lastname}
              onChange={handleChange}
              required
            />

            <button type="submit" className="add-employee-btn">
              Update Employee
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;

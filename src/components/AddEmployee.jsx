import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../api";
import "./AddEmployee.css";
import Header from "./Header";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    emailid: "",
    firstname: "",
    lastname: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(employee);
      alert("✅ Employee added successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error adding employee:", error);
      alert("❌ Error adding employee.");
    }
  };

  return (
    <>
      {/* ✅ Header at top */}
      <Header />

      {/* ✅ Centered Add Employee Card */}
      <div className="add-employee-container">
        <div className="add-employee-card">
          <h2>Add New Employee</h2>
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
              Add Employee
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

export default AddEmployee;

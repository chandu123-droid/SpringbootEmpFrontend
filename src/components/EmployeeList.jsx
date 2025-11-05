import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data || []);
    } catch (error) {
      console.error("❌ Error loading employees:", error);
      alert("Failed to load employees. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete Employee ID: ${id}?`)) {
      try {
        await deleteEmployee(id);
        alert(`✅ Employee ID ${id} deleted successfully!`);
        loadEmployees();
      } catch (error) {
        console.error("❌ Error deleting employee:", error);
        alert("❌ Failed to delete employee.");
      }
    }
  };

  const handleSort = () => {
    const sorted = [...employees].sort((a, b) => {
      const nameA = (a.firstname || "").toLowerCase();
      const nameB = (b.firstname || "").toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setEmployees(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredEmployees = employees.filter((emp) =>
    [emp.firstname, emp.lastname, emp.emailid].some((field) =>
      (field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      <div className="employee-list-container">
	  <br/><br/>
        <h2>Employee Details</h2>
		
		<div style={{display:"flex"}}>
		<div style={{paddingRight:"400px"}}>
          <input className="search-sort-container" 
            type="text"
            placeholder="🔍 Search by Name or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="40"
           />
		 </div>
		  <div>
          <button className="sort-btn" onClick={handleSort}>
            Sort {sortOrder === "asc" ? "A → Z" : "Z → A"}
          </button>
		  </div>
		</div>
		
         <br/>
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.emailid}</td>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit/${emp.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;

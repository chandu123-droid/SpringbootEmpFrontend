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
      setEmployees(res.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete Employee ID: ${id}?`)) {
      try {
        await deleteEmployee(id);
        alert(`✅ Employee ID ${id} deleted successfully!`);
        loadEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("❌ Failed to delete employee.");
      }
    }
  };

  const handleSort = () => {
    const sorted = [...employees].sort((a, b) => {
      const nameA = a.firstname.toLowerCase();
      const nameB = b.firstname.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setEmployees(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.emailid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="employee-list-container">
	  
        <h2>Employee Details</h2>
		<table>
		<tr>
		<td style={{paddingRight:"10px"}}>
          <input className="search-sort-container"
            type="text"
            placeholder="🔍 Search by Name or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} size={"40"}/>
         </td>
		 
		  <td>
          <button className="sort-btn" onClick={handleSort}>
            Sort {sortOrder === "asc" ? "A → Z" : "Z → A"}
          </button>
		</td>
		<td style={{paddingLeft:"100px"}}></td>
        </tr>
		</table>
          
		<table className="employee-table">
		<thead>
		
            <tr>
              <th>ID</th>
              <th>Email ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Modify</th>
			  <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;

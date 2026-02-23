import React, { useState } from "react";
import axios from "axios";

const DeleteSubCategory = () => {
  const [search, setSearch] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/Category/sub/search?name=${search}`);
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching subcategories");
    }
  };

  const handleDelete = async (id) => {
    
    try {
      await axios.delete(`http://localhost:8000/Category/sub/delete/${id}`);
      setSubcategories(subcategories.filter(sub => sub.id !== id));
      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting subcategory");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delete Subcategory</h2>
      <input
        type="text"
        placeholder="Enter subcategory name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {subcategories.map(sub => (
          <div key={sub.id} style={{
            border: "1px solid #ccc", borderRadius: "8px", padding: "10px",
            margin: "10px", width: "200px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <h4>{sub.CategoryName}</h4>
            {sub.base && (
              <p><strong>Base:</strong> {sub.base.CategoryName}</p>
            )}
            <button 
              onClick={() => handleDelete(sub.id)}
              style={{ background: "red", color: "white", border: "none", padding: "5px", borderRadius: "4px", cursor: "pointer" }}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteSubCategory;

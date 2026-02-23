import React, { useState } from "react";
import axios from "axios";

const DeleteBaseCategory = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/Category/base/search?name=${search}`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching categories");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deleting this [Base] Category will delete all the sub Categories?");
    if (!confirm) return;
    const confirm2 = window.confirm("Are you sure you want to delete this [Base]Category?");
    if (!confirm2) return;
    const confirm3 = window.confirm("Are you sure?");
    if (!confirm3) return;
    try {
      await axios.delete(`http://localhost:8000/Category/base/delete/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delete Base Category</h2>
      <input
        type="text"
        placeholder="Enter category name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {categories.map(cat => (
          
          <div key={cat.id} style={{
            border: "1px solid #ccc", borderRadius: "8px", padding: "10px",
            margin: "10px", width: "200px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <h4>{cat.CategoryName}</h4>
            {cat.subcategories.length > 0 && (
              <div>
                <strong>Subcategories:</strong>
                <ul>
                  {cat.subcategories.map(sub => (
                    <li key={sub.id}>{sub.CategoryName}</li>
                  ))}
                </ul>
              </div>
            )}
            <button 
              onClick={() => handleDelete(cat.id)}
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

export default DeleteBaseCategory;

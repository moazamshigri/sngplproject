import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/Category";

export default function AddSubCategory({ onCreated }) {
  const [name, setName] = useState("");
  const [baseId, setBaseId] = useState("");
  const [baseCategories, setBaseCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  // fetch base categories for dropdown
  useEffect(() => {
    fetch(`${API_URL}/Base/fetch`)
      .then((res) => res.json())
      .then((data) => setBaseCategories(data))
      .catch(() => {
        setMessage("Error fetching base categories");
        setMsgColor("red");
      });
  }, []);

  const handleCreate = async () => {
    if (!name || !baseId) {
      setMessage("Enter subcategory and select base");
      setMsgColor("red");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/sub/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CategoryName: name, base_id: parseInt(baseId) }),
      });

      if (res.ok) {
        setName("");
        setBaseId("");
        setMessage("Subcategory created successfully!");
        setMsgColor("green");
        if (onCreated) onCreated();
      } else {
        const data = await res.json();
        setMessage(data.detail || "Error creating subcategory");
        setMsgColor("red");
      }
    } catch {
      setMessage("Network error, try again");
      setMsgColor("red");
    }
  };

  return (
    <div className="CatCont" style={{ marginBottom: "2rem" }}>
      <h3>Add Subcategory</h3>
      <input
        type="text"
        placeholder="Subcategory Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={baseId} onChange={(e) => setBaseId(e.target.value)}>
        <option value="">Select Base Category</option>
        {baseCategories.map((base) => (
          <option key={base.id} value={base.id}>
            {base.CategoryName}
          </option>
        ))}
      </select>
      <button onClick={handleCreate}>Add</button>
      {message && (
        <p style={{ marginTop: "0.5rem", color: msgColor }}>{message}</p>
      )}
    </div>
  );
}

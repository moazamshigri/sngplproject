import React, { useState } from "react";

const API_URL = "http://localhost:8000/Category";

export default function AddBaseCategory({ onCreated }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const handleCreate = async () => {
    if (!name) {
      setMessage("Enter category name");
      setMsgColor("red");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/base/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CategoryName: name }),
      });

      if (res.ok) {
        setName("");
        setMessage("Category created successfully!");
        setMsgColor("green");
        if (onCreated) onCreated();
      } else {
        const data = await res.json();
        setMessage(data.detail || "Error creating category");
        setMsgColor("red");
      }
    } catch {
      setMessage("Network error, try again");
      setMsgColor("red");
    }
  };

  return (
    <div className="CatCont">
      <h3>Add Base Category</h3>
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Add</button>
      {message && (
        <p style={{ marginTop: "0.5rem", color: msgColor }}>{message}</p>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";

function Add() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    button_text: "",
    logo: "",
    category: "",
    link: "",
    order: null,
  });

  const [subCategories, setSubCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [messageColor, setColorMessage] = useState("");

  const fontAwesomeIcons = [
    "fa-solid fa-right-to-bracket",
    "fa-solid fa-ticket",
    "fa-solid fa-bell",
    "fa-solid fa-comment-dots",
    "fa-solid fa-calendar-days",
    "fa-solid fa-file-arrow-up",
    "fa-solid fa-envelope",
    "fa-solid fa-diagram-project",
    "fa-solid fa-list-check",
    "fa-solid fa-chart-line",
    "fa-solid fa-file-export",
    "fa-solid fa-comments",
    "fa-solid fa-credit-card",
    "fa-solid fa-poll",
    "fa-solid fa-calendar-plus",
    "fa-solid fa-book",
    "fa-solid fa-photo-video",
    "fa-solid fa-door-open",
    "fa-solid fa-sliders",
    "fa-solid fa-address-book",
  ];

  // Fetch sub-categories from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/Category/sub/fetch")
      .then((res) => res.json())
      .then((data) => setSubCategories(data))
      .catch((err) => console.error("Failed to fetch sub categories", err));
  }, []);

  const handleSubmit = async () => {
    if (!form.category) {
      setMessage("Please select a sub-category!");
      setColorMessage("red");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/cards/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      setMessage("Card added successfully!");
      setColorMessage("green");
      setForm({
        title: "",
        description: "",
        button_text: "",
        logo: "",
        category: "",
        link: "",
        order: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to add card.");
      setColorMessage("red");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 flex flex-col gap-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Card</h2>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Button Text"
          className="border p-2 rounded"
          value={form.button_text}
          onChange={(e) => setForm({ ...form, button_text: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Button Link"
          className="border p-2 rounded"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          required
        />

        {/* Logo Dropdown */}
        <select
          className="thirtyeight border p-2 rounded"
          value={form.logo}
          onChange={(e) => setForm({ ...form, logo: e.target.value })}
        >
          <option value="">Select Logo (optional)</option>
          {fontAwesomeIcons.map((icon) => (
            <option key={icon} value={icon}>
              {icon.replace("fa-solid fa-", "").replace("-", " ").toUpperCase()}
            </option>
          ))}
        </select>

        {/* Sub-Category Dropdown */}
        <select
          className="thirtyeight border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.CategoryName}>
              {sub.CategoryName}
            </option>
          ))}
        </select>

        {/* Order / Position */}
        <div className="flex gap-2">
          <select
            className="thirtyeight border p-2 rounded flex-1"
            value={form.order === 1 ? "top" : ""}
            onChange={(e) =>
              setForm({ ...form, order: e.target.value === "top" ? 1 : null })
            }
          >
            <option value="">Insert at bottom (default)</option>
            <option value="top">Insert at top</option>
          </select>

          <input
            type="number"
            min="1"
            placeholder="Custom Order"
            className="thirtyeight border p-2 rounded flex-1"
            value={form.order && form.order !== 1 ? form.order : ""}
            onChange={(e) =>
              setForm({
                ...form,
                order: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-[#1b95d2] text-white p-3 rounded mt-2 hover:bg-[#1483b0]"
        >
          Add Card
        </button>

        {message && (
          <p style={{ color: messageColor }} className="font-medium mt-2">
            {message}
          </p>
        )}
      </main>
    </div>
  );
}

export default Add;

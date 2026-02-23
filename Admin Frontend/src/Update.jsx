import React, { useState, useEffect } from "react";
import "./Update.css";


const Update = () => {
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
  const [searchTitle, setSearchTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
   useEffect(() => {
      fetch("http://127.0.0.1:8000/Category/sub/fetch")
        .then((res) => res.json())
        .then((data) => setSubCategories(data))
        .catch((err) => console.error("Failed to fetch sub categories", err));
    }, []);

  const handleSearch = async () => {
    if (!searchTitle) return;
    const res = await fetch(`http://127.0.0.1:8000/cards/Find?title=${searchTitle}`);
    const data = await res.json();
    setCards(data.cards || []);
    console.log(data)
  };

  const handleChange = (id, field, value) => {
    setCards(cards.map(card => card.id === id ? { ...card, [field]: value } : card));
  };

  const handleUpdate = async (id) => {
    const card = cards.find(c => c.id === id);
    const res = await fetch(`http://127.0.0.1:8000/cards/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (


    <div className="update-container">
      <h2>Find & Update Card</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter title to search"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

   <table className="cards-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Button Text</th>
      <th>Category</th>
      <th>Logo</th>
      <th>Link</th>
      <th>Order</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {cards.map((card) => (
      <tr key={card.id}>
        <td>
          <input
            value={card.title}
            onChange={(e) => handleChange(card.id, "title", e.target.value)}
          />
        </td>

        <td>
          <input
            value={card.description}
            onChange={(e) =>
              handleChange(card.id, "description", e.target.value)
            }
          />
        </td>

        <td>
          <input
            value={card.button_text}
            onChange={(e) =>
              handleChange(card.id, "button_text", e.target.value)
            }
          />
        </td>

        <td>
          {/* <select
            value={card.category}
            onChange={(e) =>
              handleChange(card.id, "category", e.target.value)
            }
          >
            <option value="technical">Technical</option>
            <option value="applications">Applications</option>
            <option value="other">Other</option>
          </select> */}
          <select
          className="thirtyeight border p-2 rounded"
          value={card.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.CategoryName}>
              {sub.CategoryName}
            </option>
          ))}
        </select>
        </td>

        <td>
          <select
            value={card.logo}
            onChange={(e) =>
              handleChange(card.id, "logo", e.target.value)
            }
          >
            {fontAwesomeIcons.map((icon) => (
              <option key={icon} value={icon}>
                {icon.split("fa-").pop()}
              </option>
            ))}
          </select>
        </td>

        <td>
          <input
            value={card.link}
            onChange={(e) => handleChange(card.id, "link", e.target.value)}
          />
        </td>

        <td>
          <input
            type="number"
            value={card.order}
            onChange={(e) =>
              handleChange(card.id, "order", Number(e.target.value))
            }
          />
        </td>

        <td>
          <button onClick={() => handleUpdate(card.id)}>Update</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default Update;

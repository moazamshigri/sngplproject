import React, { useState } from "react";
import "./Delete.css";

const Delete = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [cards, setCards] = useState([]);

  const handleSearch = async () => {
    if (!searchTitle) return;
    const res = await fetch(`http://127.0.0.1:8000/cards/Find?title=${searchTitle}`);
    const data = await res.json();
    setCards(data.cards || []);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this card?");
    if (!confirm) return;

    await fetch(`http://127.0.0.1:8000/cards/delete/${id}`, {
      method: "DELETE",
    });

    // Remove card from UI
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="delete-container">
      <h2>Delete Cards</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter title to search"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="cards-list">
        {cards.map((card) => (
          <div key={card.id} className="card-item">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button className="delete-btn" onClick={() => handleDelete(card.id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delete;

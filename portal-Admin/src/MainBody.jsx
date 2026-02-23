import React from "react";
import { NavLink } from "react-router-dom";
import "./MainBody.css";

const cards = [
  {
    title: "Add Card",
    description: "Create a new card in the portal.",
    iconClass: "fa-solid fa-plus",
    link: "/add/card",
  },
  {
    title: "Update Card",
    description: "Modify an existing card easily.",
    iconClass: "fa-solid fa-pen",
    link: "/update/card",
  },
  {
    title: "Delete Card",
    description: "Remove a card from the portal.",
    iconClass: "fa-solid fa-trash",
    link: "/delete/card",
  },
  {
    title: "Add New Category",
    description: "Add New Category into your Portal",
    iconClass: "fa-solid fa-plus",
    link: "/add/Category",
  },
  {
    title: "Delete Category",
    description: "Delete Categories from your Portal",
    iconClass: "fa-solid fa-trash",
    link: "/delete/Category",
  },
];

const MainBody = () => {
  return (
    <div className="mainbody-container">
      {cards.map((card, idx) => (
        <div className="card-section" key={idx}>
          <div className="card-icon">
            <i className={card.iconClass}></i>
          </div>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <NavLink to={card.link} className="card-button">
            Go
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default MainBody;

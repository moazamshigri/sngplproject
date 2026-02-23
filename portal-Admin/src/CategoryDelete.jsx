import React from "react";
import { NavLink } from "react-router-dom";
import "./MainBody.css";

const cards = [
  {
    title: "Delete SubCategory",
    description: "Create a new SubCategory.",
    iconClass: "fa-solid fa-trash",
    link: "/delete/Category/sub",
  },
  
  {
    title: "Delete BaseCategory",
    description: "Add New BaseCategory.",
    iconClass: "fa-solid fa-trash",
    link: "/delete/Category/Base",
  },
];

const CategoryDelete = () => {
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

export default CategoryDelete;

import React from "react";
import { NavLink } from "react-router-dom";
import "./MainBody.css";
import "./Category.css";

const cards = [
  {
    title: "Add SubCategory",
    description: "Create a new SubCategory.",
    iconClass: "fa-solid fa-plus",
    link: "/add/Category/sub",
  },
  
  {
    title: "Add BaseCategory",
    description: "Add New BaseCategory.",
    iconClass: "fa-solid fa-plus",
    link: "/add/Category/Base",
  },
];

const CategoryAdd = () => {
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

export default CategoryAdd;

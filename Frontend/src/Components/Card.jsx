import React from "react";
import "./Card.css";
import { useParams, useNavigate } from "react-router-dom";


const Card = ({ title, description, buttonText, logo, link }) => {
  const { categoryName } = useParams();

  const fixedLink = link.startsWith("http")
    ? link
    : `https://${link}`;

  const handleClickButton = () => {
    window.open(fixedLink, "_blank"); // new tab
  };

  return (
    <div
    // className="card"
    className={
          
          categoryName?.toLowerCase().includes("technical")
            ? "technical-cards card"
            : categoryName?.toLowerCase().includes("forms")?"others-cards card":"applications-cards card"
          
        }
    >
      {logo && (
        <div className="card-logo">
          {typeof logo === "string" ? (
            <i className={logo}></i>
          ) : (
            <img src={logo} alt={title} />
          )}
        </div>
      )}

      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <button className="card-button" onClick={handleClickButton}>
        {buttonText}
      </button>
    </div>
  );
};

export default Card;


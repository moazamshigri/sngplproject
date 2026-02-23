import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card.jsx";
import "./MainBody.css";

const MainBody = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [baseCategories, setBaseCategories] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------- FETCH BASE CATEGORIES ----------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/Category/Base/fetch")
      .then((res) => res.json())
      .then((data) => {
        setBaseCategories(data);
      })
      .catch((err) => console.error("Base category fetch error:", err));
  }, []);

  // ---------- FETCH CARDS ----------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/cards/")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(Array.isArray(data) ? data : Object.values(data).flat());
        setLoading(false);
      })
      .catch((err) => {
        console.error("Cards fetch error:", err);
        setLoading(false);
      });
  }, []);

  const activeBase = baseCategories.find(
    (base) => base.CategoryName === categoryName
  );

  const renderCards = (cards) => (
    <div 
    className="cards-grid"
    


    >
      {cards.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          logo={card.logo}
          link={card.link}
        />
      ))}
    </div>
  );

  if (loading) return <p>Loading cards...</p>;
return (
  <main
    className={
      
      categoryName?.toLowerCase().includes("technical")
        ? "technical-theme"
        : categoryName?.toLowerCase().includes("forms")?"others-theme":"applications-theme"
      
    }

  >
    {/* ---------- TABS ---------- */}
    <div className="tabs">
      {baseCategories.map((base) => (
        <button
          key={base.id}
          className={categoryName === base.CategoryName ? "active" : ""}
          onClick={() => navigate(`/Category/${base.CategoryName}`)}
        >
          {base.CategoryName}
        </button>
      ))}
    </div>

    {/* ---------- CONTENT ---------- */}
    {activeBase ? (
      <div>
        {activeBase.subcategories.length === 0 ? (
          <p>No subcategories</p>
        ) : (
          [...activeBase.subcategories]
            .sort((a, b) => {
              if (a.CategoryName === "Others") return 1;
              if (b.CategoryName === "Others") return -1;
              return 0;
            })
            .map((sub) => {
              const filteredCards = cardsData.filter(
                (card) => card.category === sub.CategoryName
              );

              return (
                <div key={sub.id}>
                  <h2 
                  // className="section-title aiHtwo"
                  className={
      
      categoryName?.toLowerCase().includes("technical")
        ? "technical-title  section-title aiHtwo"
        : categoryName?.toLowerCase().includes("forms")?"others-title  section-title aiHtwo ":"applications-title section-title aiHtwo "
      
    }
                  
                  >
                    {sub.CategoryName}
                  </h2>

                  {filteredCards.length === 0 ? (
                    <p>No cards found</p>
                  ) : (
                    renderCards(filteredCards)
                  )}
                </div>
              );
            })
        )}
      </div>
    ) : (
      <p>Category not found</p>
    )}
  </main>
);

};

export default MainBody;

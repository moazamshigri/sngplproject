import React from 'react'
import "./FirstMainBody.css"
import CatCard from './CatCard'
import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const FirstMainBody = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [baseCategories, setBaseCategories] = useState([]);
  const [activeBase, setActiveBase] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/Category/Base/fetch")
      .then((res) => res.json())
      .then((data) => {
        setBaseCategories(data);
        if (data.length > 0) {
          setActiveBase(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
    
    className="TabsofFirst"
    
    >
      {baseCategories.map((base) => (
        <button
          key={base.id}
          // className="TabButtons"
           className={
      
      base.CategoryName?.toLowerCase().includes("technical")
        ? "technical-theme-two TabButtons"
        : base.CategoryName?.toLowerCase().includes("forms")?"others-theme-two TabButtons":"applications-theme-two TabButtons"
      
    }
          onClick={() => {
            setActiveBase(base);
            navigate(`/Category/${base.CategoryName}`);
          }}
        >
          {base.CategoryName}
        </button>
      ))}
    </div>
  );
};
export default FirstMainBody
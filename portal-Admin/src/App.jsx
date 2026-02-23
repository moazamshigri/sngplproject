import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainBody from "./MainBody";
import Add from "./Add";
import Login from "./Login";
import Delete from "./Delete";
import Update from "./Update";
import "./App.css";
import CategoryAdd from "./CategoryAdd";
import CategoryDelete  from "./CategoryDelete";
import AddBaseCategory from "./AddBaseCategory";
import AddSubCategory from "./AddSubCategory";
import  DeleteSubCategory from "./DeleteSubCategory";
import DeleteBaseCategory  from "./DeleteBaseCategory";

function App() {
  // Always start logged out
  const [Auth, setIsAuth] = useState(false);

  // Auto logout after 10 minutes
  useEffect(() => {
    let timer;
    if (Auth) {
      timer = setTimeout(() => {
        localStorage.removeItem("auth"); // optional
        setIsAuth(false);
      }, 600000); // 10 minutes
    }
    return () => clearTimeout(timer);
  }, [Auth]);

  if (!Auth) {
    return <Login setIsAuth={setIsAuth} />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/add/card" element={<Add />} />
        <Route path="/delete/card" element={<Delete />} />
        <Route path="/update/card" element={<Update />} />
        <Route path="/add/Category" element={<CategoryAdd/>} />
        <Route path="/add/Category/sub" element={<AddSubCategory/>} />
        <Route path="/add/Category/base" element={<AddBaseCategory/>} />
        <Route path="/delete/Category" element={<CategoryDelete/>} />
        <Route path="/delete/Category/sub" element={<DeleteSubCategory/>} />
        <Route path="/delete/Category/base" element={<DeleteBaseCategory/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

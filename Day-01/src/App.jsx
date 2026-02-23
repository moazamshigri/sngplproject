import React from 'react'
import Header from "./Components/Header.jsx"
import Footer from './Components/Footer.jsx'
import "./App.css"
import { Routes, Route } from "react-router-dom"
import MainBody from './Components/MainBody.jsx'
import UnderConstruction from './Components/UnderConstruction.jsx'
import FirstMainBody from './Components/FirstMainBody.jsx'

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section>
                <div className="banner"></div>
              </section>
              <FirstMainBody />
            </>
          }
        />

        {/* 🔥 Dynamic category route */}
        <Route
          path="/Category/:categoryName"
          element={
            <>
              <section>
                <div className="banner"></div>
              </section>
              <MainBody />
            </>
          }
        />

        <Route path="*" element={<UnderConstruction />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App;
